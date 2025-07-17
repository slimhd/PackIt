'use client';

import { usePackStore } from '@/store/usePackStore';
import Form from '@/components/Form';
import PackingList from '@/components/PackingList';
import AdSlot from '@/components/AdSlot';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const { error, setError, weatherData, packingList } = usePackStore();

  const showResults = weatherData && packingList.length > 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Enhanced SEO Content */}
        <section className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y:30 }}
            animate={{ opacity: 1, y:0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              PackWise – Your Smart AI-Powered Packing Assistant ✈️
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              PackWise helps you pack smarter for your next trip by using weather data, activity types, and even AI to give you a perfect packing checklist. Whether you're going hiking or attending a business summit, PackWise tailors your list intelligently.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Never forget essential items again! Get personalized packing lists based on real weather forecasts 
              and your planned activities. Pack smart, travel worry-free with our intelligent travel companion.
            </p>
          </motion.div>
        </section>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Form />
          </motion.div>
        </section>

        {/* Results Section - Only show ads when there's meaningful content */}
        {showResults ? (
          <section className="relative">
            {/* Inline Ad between Form and Results - Only when content is present */}
            <div className="mb-8">
              <AdSlot 
                slotId="content-inline" 
                type="inline" 
                className="mx-auto"
              />
            </div>

            {/* Main Results Content */}
            <div className="relative max-w-4xl mx-auto">
              {/* Sidebar Ads positioned absolutely on larger screens */}
              <div className="hidden xl:block">
                {/* Left Sidebar Ad */}
                <div className="absolute -left-80 top-0 w-64">
                  <div className="sticky top-8 space-y-6">
                    <AdSlot 
                      slotId="sidebar-left" 
                      type="sidebar" 
                      desktopOnly
                      className="mx-auto"
                    />
                  </div>
                </div>
                
                {/* Right Sidebar Ad */}
                <div className="absolute -right-80 top-0 w-64">
                  <div className="sticky top-8 space-y-6">
                    <AdSlot 
                      slotId="sidebar-right" 
                      type="sidebar" 
                      desktopOnly
                      className="mx-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Centered Packing List */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <PackingList />
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        ) : null}

        {/* Features Section with Enhanced Content */}
        <section className="mt-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Choose PackWise for Your Travel Planning?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌤️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Weather Data</h3>
                <p className="text-gray-600">
                  Get accurate 5-day forecasts from OpenWeatherMap to pack for the actual conditions you'll face. Our weather integration ensures you're prepared for rain, sun, or snow.
                </p>
              </article>

              <article className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity-Based Lists</h3>
                <p className="text-gray-600">
                  Tailor your packing list based on your planned activities - from beach days to business meetings. Our intelligent system adapts to your specific travel needs.
                </p>
              </article>

              <article className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Organization</h3>
                <p className="text-gray-600">
                  Check off items as you pack, toggle between light and full pack modes, and export your list. Stay organized throughout your entire packing process.
                </p>
              </article>
            </div>
          </motion.div>
        </section>

        {/* Additional Content Section for SEO */}
        <section className="mt-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Travel Smarter with AI-Powered Packing
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Perfect for Every Traveler</h3>
                <p className="text-gray-600 mb-4">
                  Whether you're a frequent business traveler, a family planning a vacation, or an adventure seeker heading into the wilderness, PackWise adapts to your unique needs. Our AI considers your destination's climate, your planned activities, and even your personal preferences to create the perfect packing list.
                </p>
                <p className="text-gray-600">
                  No more last-minute panic about forgotten essentials. PackWise ensures you have everything you need for a comfortable and enjoyable trip.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Enter your destination and travel dates</li>
                  <li>Select your planned activities and preferences</li>
                  <li>Get instant weather data and AI-powered suggestions</li>
                  <li>Review and customize your personalized packing list</li>
                  <li>Download or share your list for easy access</li>
                </ol>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section - Only show when no results are displayed */}
        {!showResults && (
          <section className="mt-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Pack Smart?
              </h2>
              <p className="text-gray-600 mb-6">
                Fill out the form above to generate your personalized packing list in seconds. Join thousands of travelers who trust PackWise for their trip planning needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Real weather data
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Activity-specific items
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Downloadable lists
                </span>
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
} 