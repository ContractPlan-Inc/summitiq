import Link from 'next/link';

export default function Privacy() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: November 7, 2025</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              SummitIQ ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use our AI-powered meeting
              assistant platform. Please read this policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Account Information:</strong> Name, email address, company name, job title</li>
              <li><strong>Payment Information:</strong> Billing address, payment method (processed by secure third-party providers)</li>
              <li><strong>Profile Data:</strong> User preferences, settings, and customization choices</li>
              <li><strong>Communication Data:</strong> Support tickets, feedback, and correspondence</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">2.2 Information Automatically Collected</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Meeting Data:</strong> Audio recordings, transcriptions, participant information, timestamps</li>
              <li><strong>Usage Data:</strong> Features used, time spent, interaction patterns, click data</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Analytics Data:</strong> Performance metrics, error logs, crash reports</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">2.3 Meeting Content</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Audio recordings of your meetings (when you choose to record)</li>
              <li>Real-time transcriptions and speaker identification</li>
              <li>AI-generated insights, summaries, and action items</li>
              <li>Meeting metadata (duration, participants, topics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use the collected information for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Service Delivery:</strong> Providing transcription, AI insights, and meeting analytics</li>
              <li><strong>AI Training:</strong> Improving our AI models and expert recommendations (with anonymization)</li>
              <li><strong>Personalization:</strong> Customizing your experience and recommendations</li>
              <li><strong>Communication:</strong> Sending service updates, security alerts, and support messages</li>
              <li><strong>Analytics:</strong> Understanding usage patterns and improving our Service</li>
              <li><strong>Security:</strong> Detecting fraud, abuse, and security incidents</li>
              <li><strong>Legal Compliance:</strong> Meeting regulatory requirements and legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI and Machine Learning</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SummitIQ uses artificial intelligence and machine learning to provide intelligent features:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Meeting transcriptions are processed using speech-to-text AI models</li>
              <li>AI expert panel generates recommendations based on meeting context</li>
              <li>Sentiment analysis evaluates conversation tone and engagement</li>
              <li>Your meeting data may be used to improve AI models (in anonymized form)</li>
              <li>You can opt-out of AI training data usage in your settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">5.1 We Share Data With:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Cloud hosting (AWS/GCP), analytics (Google Analytics), payment processing (Stripe)</li>
              <li><strong>CRM Integrations:</strong> When you connect Salesforce, HubSpot, or other CRMs</li>
              <li><strong>Team Members:</strong> Users within your organization account</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">5.2 We Do NOT:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Sell your personal information to third parties</li>
              <li>Share meeting recordings with unauthorized parties</li>
              <li>Use your data for advertising without consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We implement industry-standard security measures:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Encryption:</strong> 256-bit AES encryption for data at rest, TLS 1.3 for data in transit</li>
              <li><strong>Access Controls:</strong> Role-based access, multi-factor authentication, SSO support</li>
              <li><strong>Compliance:</strong> SOC 2 Type II certified, GDPR compliant, CCPA compliant</li>
              <li><strong>Regular Audits:</strong> Third-party security audits and penetration testing</li>
              <li><strong>Data Isolation:</strong> Tenant isolation ensures your data remains separate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your data as follows:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Meeting Recordings:</strong> Stored until you delete them or close your account</li>
              <li><strong>Account Data:</strong> Retained while your account is active, deleted 90 days after closure</li>
              <li><strong>Usage Analytics:</strong> Aggregated data retained indefinitely for service improvement</li>
              <li><strong>Legal Holds:</strong> Data retained longer when required for legal purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Privacy Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails, disable AI training usage</li>
              <li><strong>Consent Withdrawal:</strong> Revoke consent for specific data processing</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, contact us at <strong>privacy@summitiq.ai</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. GDPR Compliance (EU Users)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For users in the European Economic Area (EEA):
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Legal basis for processing: Consent, contract performance, legitimate interests</li>
              <li>Data transfers: We use Standard Contractual Clauses for international transfers</li>
              <li>Data Protection Officer: Available at dpo@summitiq.ai</li>
              <li>Right to lodge complaints with your local data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. CCPA Compliance (California Users)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              California residents have additional rights under CCPA:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information (we do not sell)</li>
              <li>Right to deletion of personal information</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use cookies and similar technologies:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
              <li><strong>Analytics Cookies:</strong> Google Analytics to understand usage patterns</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li>You can control cookies through your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We integrate with third-party services that have their own privacy policies:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Zoom, Microsoft Teams, Google Meet (video conferencing)</li>
              <li>Salesforce, HubSpot (CRM integrations)</li>
              <li>Stripe (payment processing)</li>
              <li>Google Analytics (usage analytics)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              SummitIQ is not intended for users under 18 years of age. We do not knowingly collect personal
              information from children. If you become aware that a child has provided us with personal data,
              please contact us, and we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of material changes via email
              or prominent notice on our Service. Your continued use after such changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For privacy-related questions or to exercise your rights, contact us:
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
              <p className="text-gray-900 font-semibold">SummitIQ Privacy Team</p>
              <p className="text-gray-700">Email: privacy@summitiq.ai</p>
              <p className="text-gray-700">Data Protection Officer: dpo@summitiq.ai</p>
              <p className="text-gray-700">Website: www.summitiq.ai</p>
              <p className="text-gray-700 mt-4">Mailing Address:<br />
                SummitIQ, Inc.<br />
                123 Innovation Drive<br />
                San Francisco, CA 94105<br />
                United States
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
