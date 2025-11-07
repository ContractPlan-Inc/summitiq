import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SummitIQ
              </span>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: November 7, 2025</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using SummitIQ ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SummitIQ provides an AI-powered meeting assistant platform that includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Real-time meeting transcription and recording</li>
              <li>AI-powered expert panel recommendations</li>
              <li>Meeting analytics and insights</li>
              <li>CRM integrations and automated follow-ups</li>
              <li>Action item tracking and management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access</li>
              <li>Immediately notify us of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Distribute spam, malware, or other harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Record meetings without proper consent of all participants</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Privacy and Recording</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using SummitIQ's recording features:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>You must obtain consent from all meeting participants before recording</li>
              <li>You are responsible for complying with all applicable recording laws in your jurisdiction</li>
              <li>Meeting recordings and transcriptions are stored securely and encrypted</li>
              <li>You retain ownership of your meeting data and content</li>
              <li>See our Privacy Policy for details on how we handle your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Billing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Paid subscriptions are billed in advance on a monthly or annual basis. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide current, complete, and accurate billing information</li>
              <li>Pay all charges at the prices in effect when incurred</li>
              <li>Allow us to charge your payment method on a recurring basis</li>
              <li>Subscriptions automatically renew unless cancelled before renewal date</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancellation and Refunds</h2>
            <p className="text-gray-700 leading-relaxed">
              You may cancel your subscription at any time. Cancellations take effect at the end of the current
              billing period. We offer a 30-day money-back guarantee for first-time subscribers. Refunds are
              processed within 7-10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service and its original content, features, and functionality are owned by SummitIQ and are
              protected by international copyright, trademark, patent, trade secret, and other intellectual
              property laws. You retain ownership of content you create using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. AI-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed">
              SummitIQ uses artificial intelligence to provide expert recommendations, insights, and analysis.
              While we strive for accuracy, AI-generated content is provided "as is" and should be used as
              guidance rather than absolute fact. You are responsible for verifying important information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall SummitIQ, nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your
              access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or
              implied, and hereby disclaim all warranties including merchantability, fitness for a particular purpose,
              or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any
              material changes by posting the new Terms on this page and updating the "Last Updated" date. Your
              continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-900 font-semibold">SummitIQ Support</p>
              <p className="text-gray-700">Email: legal@summitiq.ai</p>
              <p className="text-gray-700">Website: www.summitiq.ai</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
