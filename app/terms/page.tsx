import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using PackWise. By using our service, you agree to these terms.
            </p>
          </div>
          <div className="prose prose-gray max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using PackWise ("the Service"), you accept and agree to be bound by these terms. If you do not agree, please do not use this service.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p>PackWise is an AI-powered travel packing assistant that provides personalized packing recommendations based on weather data, travel activities, and user preferences.</p>
              <ul>
                <li>Weather-based packing suggestions</li>
                <li>Activity-specific item recommendations</li>
                <li>AI-powered personalization</li>
                <li>Downloadable packing lists</li>
                <li>Mobile-responsive interface</li>
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
              <ul>
                <li>Provide accurate and truthful information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Not attempt to reverse engineer or hack the service</li>
                <li>Respect the intellectual property rights of PackWise</li>
                <li>Not use the service to generate harmful or inappropriate content</li>
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Privacy and Data Protection</h2>
              <p>Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Third-Party Services</h2>
              <p>PackWise integrates with third-party services including:</p>
              <ul>
                <li>OpenWeatherMap API (weather forecast data)</li>
                <li>OpenRouter API (AI-powered suggestions)</li>
                <li>Google AdSense (advertising services)</li>
                <li>Analytics providers (service improvement)</li>
              </ul>
              <p>These services have their own terms and privacy policies. We are not responsible for their content or practices.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Intellectual Property</h2>
              <p>PackWise and its original content, features, and functionality are owned by the PackWise Team and protected by international copyright and other laws.</p>
              <p>You retain ownership of any content you create using our service, but you grant us a license to use, store, and display that content as necessary to provide the service.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Disclaimers</h2>
              <p>PackWise is provided "as is" without warranties of any kind. We do not guarantee:</p>
              <ul>
                <li>Uninterrupted or error-free service</li>
                <li>Accuracy of weather forecasts or packing recommendations</li>
                <li>Completeness of packing lists for all travel scenarios</li>
                <li>Compatibility with all devices or browsers</li>
              </ul>
              <p>Packing recommendations are suggestions only and should not replace your own judgment when preparing for travel.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
              <p>In no event shall PackWise Team be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Service Modifications</h2>
              <p>We reserve the right to modify or discontinue the service at any time, with or without notice.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
              <p>We may terminate or suspend your access to PackWise immediately, without prior notice or liability, for any reason, including if you breach the Terms.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Governing Law</h2>
              <p>These Terms shall be governed by the laws of the jurisdiction in which PackWise operates.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Material changes will be posted on this page. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="flex items-center justify-center">
                  <a href="mailto:packwiseteam@gmail.com" className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                    <span className="mr-2">📧</span>
                    packwiseteam@gmail.com
                  </a>
                </div>
              </div>
            </section>
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">Last Updated</h3>
                <p>These terms were last updated on <strong>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
              </div>
            </section>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg">
              <span className="mr-2">🧳</span>
              Back to PackWise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 