import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from '@/lib/rate-limit';

interface TripContext {
  destination: string;
  tripDescription?: string;
  startDate: string;
  endDate: string;
  activities: string[];
  baseList: {
    clothing: string[];
    accessories: string[];
    optional: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";
    
    const { success, limit, remaining, reset } = await rateLimiter.limit(ip);
    
    if (!success) {
      return new Response(JSON.stringify({
        error: "Rate limit exceeded. Please try again shortly.",
      }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }

    const tripData: TripContext = await request.json();
    const { destination, tripDescription, startDate, endDate, activities, baseList } = tripData;

    // Validate required fields
    if (!destination || !startDate || !endDate || !activities || !baseList) {
      return NextResponse.json(
        { error: 'Missing required trip context data' },
        { status: 400 }
      );
    }

    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    const openrouterModel = process.env.OPENROUTER_MODEL || 'tngtech/deepseek-r1t2-chimera:free';

    if (!openrouterApiKey) {
      console.error('OpenRouter API key not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Calculate trip duration
    const tripDays = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    
    // Create comprehensive context for AI
    const tripContext = `
Trip Destination: ${destination}
Travel Dates: ${startDate} to ${endDate} (${tripDays} days)
Selected Activities: ${activities.join(', ')}
Trip Description: ${tripDescription || 'No additional description provided'}

Current Packing List:
Clothing: ${baseList.clothing.join(', ') || 'None yet'}
Accessories: ${baseList.accessories.join(', ') || 'None yet'}
Optional Items: ${baseList.optional.join(', ') || 'None yet'}
    `.trim();

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openrouterApiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
        'X-Title': 'PackWise - AI Travel Packing Assistant'
      },
      body: JSON.stringify({
        model: openrouterModel,
        messages: [
          {
            role: 'system',
            content: `You are a travel planning expert. Given the user's complete trip details and existing packing list, suggest additional items that may have been overlooked. 

IMPORTANT RULES:
- Analyze the destination, travel dates, trip duration, activities, and current packing list
- Do NOT duplicate any items already in the user's current packing list
- Focus on gaps and improvements based on the specific context
- Consider seasonal weather, cultural norms, activity requirements, and trip duration
- Suggest practical, specific items that enhance the travel experience
- Organize suggestions into clothing, accessories, and optional categories

Your response must be a valid JSON object with exactly this structure:
{
  "clothing": ["item1", "item2"],
  "accessories": ["item1", "item2"], 
  "optional": ["item1", "item2"]
}

Provide 2-6 items per category. Focus on quality suggestions that truly add value to the existing list. If a category doesn't need additional items, return an empty array. Respond ONLY with the JSON object, no additional text.`
          },
          {
            role: 'user',
            content: tripContext
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to get AI suggestions' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenRouter response structure:', data);
      return NextResponse.json(
        { error: 'Invalid AI response' },
        { status: 500 }
      );
    }

    const aiContent = data.choices[0].message.content;
    
    try {
      // Clean and parse the AI response
      let cleanContent = aiContent.trim();
      
      // Handle potential markdown code blocks
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\s*/, '').replace(/```\s*$/, '');
      }
      
      const suggestions = JSON.parse(cleanContent);
      
      // Validate the response structure
      if (typeof suggestions !== 'object' || suggestions === null) {
        throw new Error('Response is not an object');
      }

      // Ensure all categories exist and are arrays
      const result = {
        clothing: Array.isArray(suggestions.clothing) ? suggestions.clothing : [],
        accessories: Array.isArray(suggestions.accessories) ? suggestions.accessories : [],
        optional: Array.isArray(suggestions.optional) ? suggestions.optional : []
      };

      // Filter out any duplicates that might match existing items (case-insensitive)
      const existingItems = [
        ...baseList.clothing.map(item => item.toLowerCase()),
        ...baseList.accessories.map(item => item.toLowerCase()),
        ...baseList.optional.map(item => item.toLowerCase())
      ];

      result.clothing = result.clothing.filter((item: string) => 
        !existingItems.some(existing => existing.includes(item.toLowerCase()) || item.toLowerCase().includes(existing))
      );
      result.accessories = result.accessories.filter((item: string) => 
        !existingItems.some(existing => existing.includes(item.toLowerCase()) || item.toLowerCase().includes(existing))
      );
      result.optional = result.optional.filter((item: string) => 
        !existingItems.some(existing => existing.includes(item.toLowerCase()) || item.toLowerCase().includes(existing))
      );

      return NextResponse.json(result);
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent, parseError);
      return NextResponse.json(
        { error: 'Invalid AI response format' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('AI suggestions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 