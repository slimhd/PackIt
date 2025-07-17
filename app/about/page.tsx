'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">🧳</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                PackWise
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your intelligent travel companion for smarter packing decisions.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                PackWise helps travelers pack smarter using the power of artificial intelligence. 
                By analyzing real weather forecasts, your planned activities, and optional trip descriptions, 
                we generate personalized packing lists that ensure you never forget essential items again. 
                Our goal is to make travel preparation effortless, so you can focus on what matters most—
                creating unforgettable experiences.
              </p>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">How PackWise Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌤️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Weather Intelligence</h3>
                <p className="text-gray-600">
                  We fetch real-time 5-day weather forecasts for your destination to recommend 
                  weather-appropriate clothing and gear.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Activity-Based Suggestions</h3>
                <p className="text-gray-600">
                  Tell us your planned activities—from beach days to business meetings—and receive 
                  tailored recommendations for each scenario.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Powered Personalization</h3>
                <p className="text-gray-600">
                  Our AI analyzes your trip details and optional descriptions to suggest personalized 
                  items you might not have thought of.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Why Choose PackWise?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-600">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Privacy-First Approach</h3>
                    <p className="text-gray-600 text-sm">
                      Your travel plans aren't stored permanently. We process your information to generate suggestions and then forget it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-secondary-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary-600">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
                    <p className="text-gray-600 text-sm">
                      Get comprehensive packing lists in seconds, with the ability to customize and download for offline use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600">🆓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Completely Free</h3>
                    <p className="text-gray-600 text-sm">
                      No subscriptions, no hidden fees. PackWise is free to use and always will be.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-orange-600">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Mobile-Friendly</h3>
                    <p className="text-gray-600 text-sm">
                      Optimized for all devices, so you can access your packing lists whether you're at home or on the go.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
              <div className="text-center">
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Have questions, suggestions, or feedback? We'd love to hear from you! 
                  Our team is always working to improve PackWise and make your travel planning even better.
                </p>
                
                                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <a 
                     href="mailto:packwiseteam@gmail.com" 
                     className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                   >
                     <span className="mr-2">📧</span>
                     packwiseteam@gmail.com
                   </a>
                   
                   <button 
                     onClick={() => window.open('mailto:packwiseteam@gmail.com?subject=PackWise Feedback', '_blank')}
                     className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200"
                   >
                     <span className="mr-2">💬</span>
                     Share Feedback
                   </button>
                 </div>
                
                <p className="text-gray-500 text-sm mt-4">
                  We typically respond within 24 hours and love hearing your travel stories!
                </p>
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <blockquote className="text-xl md:text-2xl font-medium mb-4">
                "The world is a book and those who do not travel read only one page."
              </blockquote>
              <cite className="text-primary-100">— Saint Augustine</cite>
              <p className="mt-6 text-primary-100">
                Let PackWise help you write your next chapter with confidence.
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="mr-2">🧳</span>
              Start Packing Smart
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 