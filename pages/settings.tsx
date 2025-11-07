import Link from 'next/link';
import { useState } from 'react';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'account' | 'billing' | 'integrations' | 'team'>('account');

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per user/month',
      features: [
        'Up to 20 meetings/month',
        'Real-time transcription',
        'Basic action items',
        'Email support',
        '7-day history',
      ],
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per user/month',
      current: true,
      popular: true,
      features: [
        'Unlimited meetings',
        'AI coaching & insights',
        'Advanced analytics',
        'CRM integrations',
        'Priority support',
        'Unlimited history',
        'Custom branding',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom AI training',
        'API access',
        'SSO & advanced security',
        'SLA guarantee',
        'On-premise deployment',
      ],
    },
  ];

  const integrations = [
    {
      name: 'Salesforce',
      description: 'Sync meeting notes and action items',
      icon: '☁️',
      connected: true,
      status: 'Active',
    },
    {
      name: 'HubSpot',
      description: 'Automatic CRM updates',
      icon: '🟠',
      connected: false,
      status: 'Not Connected',
    },
    {
      name: 'Zoom',
      description: 'Join and record Zoom meetings',
      icon: '📹',
      connected: true,
      status: 'Active',
    },
    {
      name: 'Google Calendar',
      description: 'Sync your meeting schedule',
      icon: '📅',
      connected: true,
      status: 'Active',
    },
    {
      name: 'Slack',
      description: 'Get meeting summaries in Slack',
      icon: '💬',
      connected: false,
      status: 'Not Connected',
    },
    {
      name: 'Microsoft Teams',
      description: 'Teams meeting integration',
      icon: '👥',
      connected: false,
      status: 'Not Connected',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SummitIQ
              </span>
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 border border-gray-200 w-fit">
          <button
            onClick={() => setActiveTab('account')}
            className={`px-6 py-3 rounded-md transition-all ${
              activeTab === 'account'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-6 py-3 rounded-md transition-all ${
              activeTab === 'billing'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Billing & Plans
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-6 py-3 rounded-md transition-all ${
              activeTab === 'integrations'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-6 py-3 rounded-md transition-all ${
              activeTab === 'team'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Team
          </button>
        </div>

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue="Acme Corporation"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                    <option>Account Executive</option>
                    <option>Sales Manager</option>
                    <option>SDR/BDR</option>
                    <option>Customer Success</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">AI Coaching</div>
                    <div className="text-sm text-gray-600">Get real-time suggestions during meetings</div>
                  </div>
                  <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive meeting summaries via email</div>
                  </div>
                  <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">Auto-sync to CRM</div>
                    <div className="text-sm text-gray-600">Automatically update your CRM after meetings</div>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div>
            {/* Current Plan */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Professional Plan</h2>
                  <p className="text-blue-100 mb-4">Your next billing date is January 15, 2025</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-bold">$79</span>
                    <span className="text-blue-100">per user/month</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Pricing Tiers */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                    tier.current ? 'border-blue-600' : tier.popular ? 'border-purple-400' : 'border-gray-100'
                  } relative`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  {tier.current && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      CURRENT PLAN
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-2">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      tier.current
                        ? 'bg-gray-100 text-gray-600 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={tier.current}
                  >
                    {tier.current ? 'Current Plan' : tier.price === 'Custom' ? 'Contact Sales' : 'Upgrade'}
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">•••• •••• •••• 4242</div>
                    <div className="text-sm text-gray-600">Expires 12/25</div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Update</button>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Connect SummitIQ with your favorite tools to automate your workflow and keep everything in sync.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{integration.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{integration.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{integration.description}</p>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            integration.connected
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {integration.status}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        integration.connected
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + Invite Member
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Actions</div>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { name: 'John Doe', email: 'john@company.com', role: 'Admin' },
                  { name: 'Sarah Chen', email: 'sarah@company.com', role: 'Member' },
                  { name: 'Mike Johnson', email: 'mike@company.com', role: 'Member' },
                ].map((member, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{member.name}</span>
                    </div>
                    <div className="text-gray-600">{member.email}</div>
                    <div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {member.role}
                      </span>
                    </div>
                    <div>
                      <button className="text-gray-600 hover:text-gray-900">•••</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
