import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard or signup
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SummitIQ
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-semibold text-sm">
              🎯 AI-Powered Meeting Intelligence
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Turn Every Meeting
            <br />
            Into Revenue
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's most intelligent meeting assistant for sales professionals.
            Get real-time transcription, AI coaching, and automated follow-ups that close more deals.
          </p>

          <form onSubmit={handleGetStarted} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Free Trial
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">43%</div>
              <div className="text-gray-600">More Follow-ups</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2.3x</div>
              <div className="text-gray-600">Deal Velocity</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">31%</div>
              <div className="text-gray-600">Shorter Cycles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Win
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful AI features that transform your sales meetings from start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🎙️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Real-Time Transcription</h3>
            <p className="text-gray-600 leading-relaxed">
              AI-powered speech-to-text with speaker identification. Never miss a word or detail.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Coaching</h3>
            <p className="text-gray-600 leading-relaxed">
              Get real-time suggestions and best practices during your meetings to handle objections.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Analytics Dashboard</h3>
            <p className="text-gray-600 leading-relaxed">
              Track performance, talk-time ratios, and sentiment analysis across all meetings.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Action Items</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatically extract and track action items. Never let a follow-up slip through.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">CRM Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatic sync with Salesforce, HubSpot, and more. Keep your CRM updated.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Smart Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              AI analyzes patterns and provides actionable insights to improve your sales strategy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of sales professionals who close more deals with SummitIQ
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800">SummitIQ</span>
          </div>
          <div className="text-gray-600 text-sm">
            © 2025 SummitIQ by ContractPlan Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
