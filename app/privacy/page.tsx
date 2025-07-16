import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy & Ads Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PackIt is designed with privacy in mind. We collect minimal information to provide our travel packing service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Travel destination and dates (not stored, used only for weather forecast)</li>
              <li>Selected activities (not stored, used only for packing recommendations)</li>
              <li>Basic usage analytics to improve our service</li>
              <li>Cookie preferences for advertising and site functionality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your information is used solely to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Generate personalized packing lists based on weather and activities</li>
              <li>Fetch weather forecasts for your destination</li>
              <li>Improve our service through anonymous usage analytics</li>
              <li>Display relevant advertisements (if cookies are accepted)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Advertising cookies:</strong> Used to display relevant ads (optional)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can control cookie preferences through your browser settings. We respect the "Do Not Track" browser setting.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PackIt integrates with the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>OpenWeatherMap API:</strong> For weather forecasts (no personal data shared)</li>
              <li><strong>Google AdSense:</strong> For displaying advertisements (if cookies accepted)</li>
              <li><strong>Analytics providers:</strong> For understanding site usage (anonymized data only)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Advertising</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may display advertisements to support the free service. These ads:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Are provided by Google AdSense and other reputable ad networks</li>
              <li>May use cookies to show relevant content</li>
              <li>Respect your "Do Not Track" setting when enabled</li>
              <li>Can be blocked using ad blocking software without affecting core functionality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate security measures to protect your information. All API keys and sensitive data are stored securely on our servers and never exposed to your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Under GDPR and other privacy laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access any personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent for cookies and advertising</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this privacy policy or your data rights, please contact us at{' '}
              <a href="mailto:privacy@packit-travel.com" className="text-primary-600 hover:text-primary-700 underline">
                privacy@packit-travel.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updates</h2>
            <p className="text-gray-600 leading-relaxed">
              This policy was last updated on <strong>{new Date().toLocaleDateString()}</strong>. 
              We may update this policy from time to time. Changes will be posted on this page.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to PackIt
          </Link>
        </div>
      </div>
    </div>
  );
} 