import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GDPRBanner from '@/components/GDPRBanner'
import AdSlot from '@/components/AdSlot'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'PackIt - Smart Travel Packing Assistant',
  description: 'Generate personalized packing lists based on weather forecasts and travel activities. Never forget essential items again with PackIt\'s intelligent packing suggestions.',
  keywords: 'travel, packing, vacation, trip planning, weather forecast, packing list, travel assistant',
  authors: [{ name: 'PackIt Team' }],
  creator: 'PackIt',
  publisher: 'PackIt',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'PackIt - Smart Travel Packing Assistant',
    description: 'Generate personalized packing lists based on weather forecasts and travel activities.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'PackIt',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PackIt - Smart Travel Packing Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PackIt - Smart Travel Packing Assistant',
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
    <html lang="en-US">
      <head>
        <meta httpEquiv="Content-Language" content="en-US" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50`}>
        <div className="min-h-screen flex flex-col">
          {/* Top Banner Ad */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <AdSlot 
                slotId="header-banner" 
                type="banner" 
                className="mb-2"
              />
            </div>
          </div>

          <header className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🧳</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">PackIt</h1>
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
              
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">
                  "The world is a book and those who do not travel read only one page." - Saint Augustine
                </p>
                <p>
                  Made with ❤️ by PackIt Team • Powered by OpenWeatherMap API
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
      </body>
    </html>
  )
} 