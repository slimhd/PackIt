import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/redis';

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, '1 h'),
  analytics: true
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    // Log rate limit info for monitoring
    console.log(`Rate limit check for IP ${ip}: success=${success}, remaining=${remaining}`);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. You can only send 3 emails per hour.',
          limit,
          reset,
          remaining
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, subject, text } = body;

    // Validate required fields
    if (!email || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize and validate text content
    if (typeof text !== 'string' || text.length > 10000) {
      return NextResponse.json(
        { error: 'Invalid text content or too long' },
        { status: 400 }
      );
    }

    // Sanitize subject
    const sanitizedSubject = typeof subject === 'string' && subject.length <= 200 ? 
      subject : 'Your Packing List ✔️';

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send plain text email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: sanitizedSubject,
      text
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 