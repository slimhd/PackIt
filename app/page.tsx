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
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              PackWise
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Never forget essential items again! Get personalized packing lists based on real weather forecasts 
            and your planned activities. Pack smart, travel worry-free.
          </p>
        </motion.div>

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

        {/* Form Section - Always Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Form />
        </motion.div>

        {/* Results Section - Centered with Side Ads */}
        {showResults ? (
          <div className="relative">
            {/* Inline Ad between Form and Results - Centered */}
            <div className="mb-8">
              <AdSlot 
                slotId="content-inline" 
                type="inline" 
                className="mx-auto"
              />
            </div>

            {/* Main Results Content - Always Centered */}
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
          </div>
        ) : null}

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌤️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Weather Data</h3>
            <p className="text-gray-600">
              Get accurate 5-day forecasts from OpenWeatherMap to pack for the actual conditions you'll face.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity-Based Lists</h3>
            <p className="text-gray-600">
              Tailor your packing list based on your planned activities - from beach days to business meetings.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Organization</h3>
            <p className="text-gray-600">
              Check off items as you pack, toggle between light and full pack modes, and export your list.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        {!showResults && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Pack Smart?
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form above to generate your personalized packing list in seconds.
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
        )}
      </div>
    </div>
  );
} 