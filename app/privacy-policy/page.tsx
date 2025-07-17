'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We respect your privacy and are committed to protecting your personal data. 
              This policy explains how PackWise handles your information.
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-600">📋</span>
                </span>
                What Data We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                PackWise is designed with privacy-first principles. We collect minimal information necessary to provide our AI-powered packing service:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Travel preferences:</strong> Destination, dates, and selected activities (used only for generating your packing list, not stored permanently)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Optional trip descriptions:</strong> Any additional context you provide to improve AI suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>User preferences:</strong> Settings like light vs. full pack mode, saved for your convenience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Usage analytics:</strong> Anonymous data about how features are used to improve our service</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-secondary-600">🔗</span>
                </span>
                Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To provide our intelligent packing recommendations, we integrate with trusted services:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">OpenRouter API</h3>
                  <p className="text-gray-600 text-sm">
                    Powers our AI suggestions. Your travel data is processed to generate personalized recommendations but is not stored by the service.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">OpenWeatherMap</h3>
                  <p className="text-gray-600 text-sm">
                    Provides weather forecasts for your destination. Only location and dates are shared, no personal information.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Analytics Services</h3>
                  <p className="text-gray-600 text-sm">
                    Help us understand usage patterns to improve PackWise. All data is anonymized and aggregated.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Google AdSense</h3>
                  <p className="text-gray-600 text-sm">
                    Displays relevant advertisements to support our free service. Follows Google's privacy standards and respects your ad preferences.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600">🛡️</span>
                </span>
                What We Don't Collect
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-800 font-medium mb-3">We prioritize your privacy by NOT collecting:</p>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Sensitive personal information (passport details, payment info, etc.)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Permanent storage of your travel plans or destinations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Email addresses or contact information (unless you provide it voluntarily)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Location data beyond what you specify for weather forecasts
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-orange-600">🍪</span>
                </span>
                Cookie Usage
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies to enhance your experience and support our service:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                  <p className="text-gray-600 text-sm">Required for basic site functionality, remembering your preferences, and security.</p>
                </div>
                <div className="border-l-4 border-secondary-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                  <p className="text-gray-600 text-sm">Help us understand how visitors use PackWise to improve the experience (can be opted out).</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Advertising Cookies</h3>
                  <p className="text-gray-600 text-sm">Enable relevant ads to support our free service (fully optional and controllable).</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                You can manage cookie preferences through our GDPR banner or your browser settings. PackWise respects "Do Not Track" signals.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600">⚖️</span>
                </span>
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under GDPR and other privacy regulations, you have the following rights:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Access & Portability</h3>
                  <p className="text-gray-600 text-sm">Request access to any data we hold about you and receive it in a portable format.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Correction & Deletion</h3>
                  <p className="text-gray-600 text-sm">Request correction of inaccurate data or complete deletion of your information.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Processing Objection</h3>
                  <p className="text-gray-600 text-sm">Object to processing of your data for marketing or other non-essential purposes.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Consent Withdrawal</h3>
                  <p className="text-gray-600 text-sm">Withdraw consent for cookies, analytics, or advertising at any time.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600">📧</span>
                </span>
                Contact for Privacy Concerns
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this privacy policy, your data rights, or how we handle your information, please don't hesitate to reach out:
                </p>
                <div className="flex items-center justify-center">
                  <a 
                    href="mailto:packwiseteam@gmail.com" 
                    className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <span className="mr-2">📧</span>
                    packwiseteam@gmail.com
                  </a>
                </div>
                <p className="text-gray-600 text-sm mt-4 text-center">
                  We typically respond to privacy inquiries within 72 hours.
                </p>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Last Updated</h3>
                <p className="text-gray-600">
                  This privacy policy was last updated on <strong>{new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</strong>
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  We may update this policy periodically. Material changes will be announced on our main page.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="mr-2">🧳</span>
              Back to PackWise
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 