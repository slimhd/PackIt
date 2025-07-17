import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Last updated: July 2025</p>
          </div>
          <div className="prose prose-gray max-w-none">
            <p>
              Welcome to Packwise ("the App", "we", "us", or "our"). By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the App.
            </p>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Description of Service</h2>
              <p>
                Packwise is an AI-powered packing assistant designed to help users generate personalized travel packing lists based on destination, activities, dates, and weather data. Some features may use third-party APIs and AI models to improve recommendations.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate and lawful information when using the service.</li>
                <li>Not use the App for any illegal, harmful, or abusive activity.</li>
                <li>Refrain from tampering with or attempting to access non-public areas of the App.</li>
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. AI and Third-Party Services</h2>
              <p>
                Packwise integrates AI-powered features via OpenRouter and weather forecast data via OpenWeatherMap. We do not guarantee the accuracy, completeness, or timeliness of AI-generated suggestions. Use them at your own discretion.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our{' '}
                <Link href="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</Link>{' '}
                to understand how we collect and use your data.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
              <p>
                All content, branding, and functionality within the App are the intellectual property of Packwise unless otherwise stated. You may not reuse or redistribute any part of the App without prior written permission.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
              <p>
                The App is provided "as is" without warranties of any kind. We are not liable for any direct or indirect damages resulting from your use of the App, including packing errors, lost items, or incorrect suggestions.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Modifications</h2>
              <p>
                We may update these Terms from time to time. You are responsible for reviewing them periodically. Continued use of the App after changes constitutes acceptance of those changes.
              </p>
            </section>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact</h2>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">For questions or support, you can contact us at:</p>
                <div className="flex items-center justify-center">
                  <a
                    href="mailto:packwiseteam@gmail.com"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <span className="mr-2">📧</span>
                    packwiseteam@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <span className="mr-2">🧳</span>
              Back to PackWise
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 