import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'sign_up_start', { method: 'email' });
    }
    window.location.href = '/dashboard';
  };

  const testimonials = [
    {
      quote: "SummitIQ increased our close rate by 43%. The AI expert panel is a game-changer!",
      author: "Sarah Chen",
      role: "VP of Sales, TechCorp",
      avatar: "SC"
    },
    {
      quote: "Finally, a meeting tool that actually helps us sell. Worth every penny.",
      author: "Michael Torres",
      role: "Sales Director, GlobalSales Inc",
      avatar: "MT"
    },
    {
      quote: "The real-time AI coaching during calls is like having a consultant on every meeting.",
      author: "Lisa Wang",
      role: "Account Executive, Enterprise Co",
      avatar: "LW"
    }
  ];

  const faqs = [
    {
      q: "How does the AI Expert Panel work?",
      a: "Our AI experts join your meetings virtually, listen to the conversation, and provide real-time suggestions only you can see. It's like having specialist consultants on every call."
    },
    {
      q: "Do customers know AI experts are present?",
      a: "No! The AI experts are completely invisible to your customers. Only you see their recommendations in your interface."
    },
    {
      q: "Which video platforms do you support?",
      a: "SummitIQ works with Zoom, Google Meet, Microsoft Teams, and most popular video conferencing platforms."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes! No long-term contracts. Cancel anytime with one click. We also offer a 14-day money-back guarantee."
    },
    {
      q: "How secure is my data?",
      a: "Enterprise-grade encryption (AES-256), SOC 2 Type II certified, and GDPR compliant. Your data is always secure."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Product Hunt Launch Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 text-center">
        <div className="container mx-auto px-6">
          <span className="font-semibold">🚀 We're live on Product Hunt! </span>
          <a href="https://www.producthunt.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-100 ml-2">
            Support us →
          </a>
        </div>
      </div>

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
              >
                FAQ
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-semibold text-sm">
              🎯 #1 AI Meeting Assistant for Sales Teams
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Turn Every Meeting
            <br />
            Into Revenue
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your AI co-pilot for every sales call. Open on your laptop or mobile during Zoom, Teams, or any meeting — get real-time expert recommendations only you can see.
          </p>

          <form onSubmit={handleGetStarted} className="max-w-md mx-auto mb-8">
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
              ✓ 14-day free trial • ✓ No credit card required • ✓ Cancel anytime
            </p>
          </form>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">2,500+</div>
              <div className="text-sm text-gray-600">Sales Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">150K+</div>
              <div className="text-sm text-gray-600">Meetings Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>

          {/* Video Demo */}
          <button
            onClick={() => setShowVideo(true)}
            className="group relative mx-auto mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://via.placeholder.com/800x450/667eea/ffffff?text=Watch+Demo+Video"
                alt="SummitIQ Demo"
                className="w-full max-w-3xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-4xl text-blue-600">▶</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-700 font-semibold">Watch 2-minute demo</p>
          </button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center space-x-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span>256-bit Encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - New Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How SummitIQ Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal AI assistant that runs on your device during every sales call
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
              1
            </div>
            <h3 className="text-xl font-bold mb-4">Open on Your Device</h3>
            <p className="text-gray-600 leading-relaxed">
              Launch SummitIQ on your laptop or mobile before your Zoom, Teams, or Google Meet call. It runs alongside your video app.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
              2
            </div>
            <h3 className="text-xl font-bold mb-4">AI Listens & Coaches</h3>
            <p className="text-gray-600 leading-relaxed">
              During your meeting, AI experts analyze the conversation and give you real-time suggestions only you can see on your screen.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
              3
            </div>
            <h3 className="text-xl font-bold mb-4">Close More Deals</h3>
            <p className="text-gray-600 leading-relaxed">
              Get instant answers to objections, perfect follow-up suggestions, and automated meeting summaries sent to your CRM.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl p-8 border-2 border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">💡</div>
            <div>
              <h4 className="text-xl font-bold mb-2">Your Secret Weapon</h4>
              <p className="text-gray-700 leading-relaxed">
                SummitIQ is invisible to your prospects. It's like having a team of expert coaches sitting next to you, feeding you the perfect thing to say at the perfect moment — but only you can see their recommendations on your screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">43%</div>
            <div className="text-gray-600">Higher Close Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">2.3x</div>
            <div className="text-gray-600">Meeting ROI</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">31%</div>
            <div className="text-gray-600">Time Saved</div>
          </div>
        </div>
      </section>

      {/* Features Grid - keeping existing but adding id */}
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
          {/* Existing feature cards with slight enhancement */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🎙️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Live Meeting Transcription</h3>
            <p className="text-gray-600 leading-relaxed">
              Watch your conversation transcribed in real-time on your screen. Scroll back to review what was said, copy exact quotes, and stay focused on the prospect.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
              NEW!
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Expert Panel</h3>
            <p className="text-gray-600 leading-relaxed">
              Invite AI experts to every call. They listen and whisper suggestions only you can see — like having consultants in your ear during meetings.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Real-Time AI Coaching</h3>
            <p className="text-gray-600 leading-relaxed">
              See suggestions pop up on your screen as you talk. Perfect responses to objections, pricing guidance, and next-step recommendations appear when you need them.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Analytics Dashboard</h3>
            <p className="text-gray-600 leading-relaxed">
              Track performance, talk-time ratios, and sentiment analysis across all meetings.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Action Items</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatically extract and track action items. Never let a follow-up slip through.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-3xl">🔄</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">CRM Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatic sync with Salesforce, HubSpot, and more. Keep your CRM updated.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-20 bg-white/50 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Sales Teams Everywhere
          </h2>
          <p className="text-xl text-gray-600">
            See what top performers are saying about SummitIQ
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SummitIQ
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">$29</span>
              <span className="text-gray-600 ml-2">/user/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                Up to 20 meetings/month
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                Real-time transcription
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                Basic action items
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                7-day history
              </li>
            </ul>
            <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Start Free Trial
            </button>
          </div>

          {/* Professional */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl text-white relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">$79</span>
              <span className="text-blue-100 ml-2">/user/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                Unlimited meetings
              </li>
              <li className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                AI Expert Panel
              </li>
              <li className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                Advanced analytics
              </li>
              <li className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                CRM integrations
              </li>
              <li className="flex items-center">
                <span className="text-green-300 mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                Everything in Pro
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                Custom AI training
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                SSO & Security
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                Dedicated support
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                SLA guarantee
              </li>
            </ul>
            <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-600">
          All plans include 14-day money-back guarantee • Cancel anytime • No hidden fees
        </p>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 2,500+ sales professionals who close more deals with SummitIQ
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Free Trial →
          </Link>
          <p className="mt-4 text-sm text-blue-100">
            No credit card required • 14-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-gray-800">SummitIQ</span>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered meeting assistant for sales professionals
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#features" className="hover:text-blue-600">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/meetings/prepare" className="hover:text-blue-600">AI Experts</Link></li>
              <li><Link href="/analytics" className="hover:text-blue-600">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">About</a></li>
              <li><a href="#" className="hover:text-blue-600">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><a href="#security" className="hover:text-blue-600">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 SummitIQ by ContractPlan Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              LinkedIn
            </a>
            <a href="https://producthunt.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              Product Hunt
            </a>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕ Close
            </button>
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-3xl font-bold text-white mb-4">Demo Video Coming Soon</h3>
                <p className="text-blue-100 text-lg mb-6">
                  We're creating an amazing demo to show you how SummitIQ transforms your sales calls.
                </p>
                <p className="text-sm text-blue-200">
                  Sign up for early access to see it first!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
