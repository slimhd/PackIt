import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - PackWise',
  description: 'Terms of Service for PackWise - Your Smart AI-Powered Packing Assistant. Read our comprehensive terms and conditions.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none">
            {/* Introduction */}
            <section className="mb-10">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📋</span>
                  </span>
                  Welcome to PackWise
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to PackWise ("the App", "we", "us", or "our"). By accessing or using our website and services, 
                  you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these 
                  terms, please do not use the App.
                </p>
              </div>
            </section>

            {/* 1. Service Description */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600">🎯</span>
                </span>
                1. Description of Service
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                PackWise is an AI-powered travel packing assistant that provides personalized packing recommendations. Our services include:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Core Features</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Weather-based packing suggestions</li>
                    <li>• Activity-specific item recommendations</li>
                    <li>• AI-powered personalization</li>
                    <li>• Downloadable packing lists</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Data Sources</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Real-time weather forecasts</li>
                    <li>• Travel destination information</li>
                    <li>• Activity-based recommendations</li>
                    <li>• User preferences and settings</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. User Responsibilities */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-green-600">👤</span>
                </span>
                2. User Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">By using PackWise, you agree to:</p>
              <div className="space-y-3">
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Lawful Use</h3>
                  <p className="text-gray-600 text-sm">Provide accurate and lawful information when using the service. Do not use the App for any illegal, harmful, or abusive activities.</p>
                </div>
                <div className="border-l-4 border-secondary-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Security</h3>
                  <p className="text-gray-600 text-sm">Refrain from tampering with or attempting to access non-public areas of the App. Do not attempt to reverse engineer our systems.</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Respect</h3>
                  <p className="text-gray-600 text-sm">Respect other users and our service. Do not spam, harass, or abuse our platform or other users.</p>
                </div>
              </div>
            </section>

            {/* 3. AI and Third-Party Services */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600">🤖</span>
                </span>
                3. AI and Third-Party Services
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Disclaimer</h3>
                <p className="text-yellow-700 text-sm">
                  PackWise integrates AI-powered features and third-party services. We do not guarantee the accuracy, 
                  completeness, or timeliness of AI-generated suggestions. Use them at your own discretion.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">OpenRouter AI</h3>
                  <p className="text-gray-600 text-sm">Powers our intelligent packing suggestions and personalization features.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">OpenWeatherMap</h3>
                  <p className="text-gray-600 text-sm">Provides accurate weather forecasts for your destination.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Analytics</h3>
                  <p className="text-gray-600 text-sm">Helps us understand usage patterns to improve our service.</p>
                </div>
              </div>
            </section>

            {/* 4. Privacy */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-indigo-600">🔒</span>
                </span>
                4. Privacy and Data Protection
              </h2>
              <div className="bg-indigo-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your privacy is important to us. We are committed to protecting your personal information and being transparent about our data practices.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Please review our comprehensive{' '}
                  <Link href="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline font-medium">
                    Privacy Policy
                  </Link>{' '}
                  to understand how we collect, use, and protect your data.
                </p>
              </div>
            </section>

            {/* 5. Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-pink-600">©</span>
                </span>
                5. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Our Content</h3>
                  <p className="text-gray-600 text-sm">
                    All content, branding, design, functionality, and code within PackWise are the intellectual property 
                    of PackWise Team and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Your Content</h3>
                  <p className="text-gray-600 text-sm">
                    You retain ownership of any content you create using our service. However, you grant us a limited 
                    license to use, store, and display that content as necessary to provide our services.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Restrictions</h3>
                  <p className="text-gray-600 text-sm">
                    You may not copy, modify, distribute, sell, or lease any part of our services or included software, 
                    nor may you reverse engineer or attempt to extract the source code of that software.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Disclaimers and Limitations */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-red-600">⚠️</span>
                </span>
                6. Disclaimers and Limitation of Liability
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-red-800 mb-3">Service "As Is"</h3>
                <p className="text-red-700 text-sm mb-4">
                  PackWise is provided "as is" without warranties of any kind, either express or implied. We do not guarantee:
                </p>
                <ul className="text-red-700 text-sm space-y-1 ml-4">
                  <li>• Uninterrupted or error-free service operation</li>
                  <li>• Accuracy of weather forecasts or packing recommendations</li>
                  <li>• Completeness of packing lists for all travel scenarios</li>
                  <li>• Compatibility with all devices, browsers, or operating systems</li>
                  <li>• That the service will meet your specific requirements</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">Limitation of Liability</h3>
                <p className="text-orange-700 text-sm">
                  To the fullest extent permitted by law, PackWise Team shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to damages for lost profits, lost data, 
                  personal injury, or property damage arising from your use of the service, even if we have been advised of 
                  the possibility of such damages.
                </p>
              </div>
            </section>

            {/* 7. User Generated Content */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-teal-600">📝</span>
                </span>
                7. User Generated Content
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you use PackWise, you may provide information such as travel destinations, activities, and preferences. 
                You are responsible for ensuring this information is accurate and lawful.
              </p>
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-teal-700 text-sm">
                  You grant PackWise a non-exclusive, worldwide, royalty-free license to use, reproduce, and analyze 
                  your input solely for the purpose of providing our packing recommendation services.
                </p>
              </div>
            </section>

            {/* 8. Service Availability */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-cyan-600">🔄</span>
                </span>
                8. Service Availability and Modifications
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  We strive to provide continuous service availability, but we reserve the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Modify, suspend, or discontinue any part of the service at any time</li>
                  <li>Perform scheduled maintenance that may temporarily affect service availability</li>
                  <li>Update, change, or remove features to improve the service</li>
                  <li>Implement new terms or policies with appropriate notice</li>
                </ul>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-700 text-sm">
                    We will make reasonable efforts to notify users of significant changes or planned maintenance 
                    that may affect service availability.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Termination */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-gray-600">🚪</span>
                </span>
                9. Termination
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">By You</h3>
                  <p className="text-gray-600 text-sm">
                    You may stop using PackWise at any time. Since we don't require account creation, 
                    simply stop accessing the service.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">By Us</h3>
                  <p className="text-gray-600 text-sm">
                    We may restrict access to our service if you violate these terms or engage in 
                    activities that harm our service or other users.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. Governing Law */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-amber-600">⚖️</span>
                </span>
                10. Governing Law and Dispute Resolution
              </h2>
              <div className="bg-amber-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with applicable international laws 
                  and regulations for web services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Any disputes arising from these Terms or your use of PackWise should first be addressed through 
                  direct communication with our team at the contact information provided below.
                </p>
              </div>
            </section>

            {/* 11. Changes to Terms */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-emerald-600">📄</span>
                </span>
                11. Changes to These Terms
              </h2>
              <div className="bg-emerald-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update these Terms from time to time to reflect changes in our service, legal requirements, 
                  or industry best practices.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When we make material changes, we will:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                  <li>Update the "Last updated" date at the top of this page</li>
                  <li>Provide notice of significant changes on our main website</li>
                  <li>Continue to make the updated terms available at this URL</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Your continued use of PackWise after any changes constitutes acceptance of the updated Terms.
                </p>
              </div>
            </section>

            {/* 12. Contact Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-600">📧</span>
                </span>
                12. Contact Information
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions About These Terms?</h3>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    If you have any questions about these Terms of Service, need clarification on any provisions, 
                    or want to report a concern, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                      href="mailto:packwiseteam@gmail.com?subject=Terms of Service Inquiry" 
                      className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span className="mr-3 text-lg">📧</span>
                      packwiseteam@gmail.com
                    </a>
                    <div className="text-sm text-gray-600">
                      <p>We typically respond within 24-48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-3">Thank You for Using PackWise</h3>
                <p className="text-gray-600 mb-4">
                  These terms help ensure a safe and positive experience for all users. 
                  We're committed to providing you with the best travel packing assistant possible.
                </p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="mr-3 text-lg">🧳</span>
              Back to PackWise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 