import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import GDPRBanner from '@/components/GDPRBanner'
import AdSlot from '@/components/AdSlot'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'PackWise - Smart Travel Packing Assistant',
  description: 'Generate personalized packing lists based on weather forecasts and travel activities. Never forget essential items again with PackWise\'s intelligent packing suggestions.',
  keywords: 'travel, packing, vacation, trip planning, weather forecast, packing list, travel assistant',
  authors: [{ name: 'PackWise Team' }],
  creator: 'PackWise',
  publisher: 'PackWise',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'PackWise - Smart Travel Packing Assistant',
    description: 'Generate personalized packing lists based on weather forecasts and travel activities.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'PackWise',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PackWise - Smart Travel Packing Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PackWise - Smart Travel Packing Assistant',
    description: 'Generate personalized packing lists based on weather forecasts and travel activities.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Google AdSense - Only loads when NEXT_PUBLIC_ADSENSE_CLIENT_ID is configured */}
        {/* This pattern ensures AdSense is never loaded in development without proper setup */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🧳</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">PackWise</h1>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-600">Smart Travel Packing Assistant</p>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Footer Ad */}
              <div className="mb-6">
                <AdSlot 
                  slotId="footer-ad" 
                  type="inline" 
                  className="mx-auto"
                />
              </div>
              
              {/* Footer Navigation */}
              <div className="flex flex-col items-center space-y-4 mb-6">
                <nav className="flex flex-wrap justify-center gap-6 text-sm">
                  <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    About & Contact
                  </Link>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    Privacy Policy
                  </Link>
                  <Link href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    Privacy & Ads
                  </Link>
                </nav>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">
                  "The world is a book and those who do not travel read only one page." - Saint Augustine
                </p>
                <p>
                  Made with ❤️ by PackWise Team • Powered by OpenWeatherMap API
                </p>
              </div>
            </div>
          </footer>

          {/* Sticky Mobile Ad */}
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <AdSlot 
              slotId="mobile-sticky" 
              type="sticky" 
              mobileOnly
              className="bg-white border-t border-gray-200 shadow-lg"
            />
          </div>

          {/* GDPR Banner */}
          <GDPRBanner />
        </div>
        <Analytics />
      </body>
    </html>
  )
} 