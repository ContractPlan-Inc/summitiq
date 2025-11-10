import React, { useState } from 'react';
import Link from 'next/link';

export default function JayLimPremium() {
  const [activePlan, setActivePlan] = useState('professional');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg"></div>
              <span className="text-2xl font-bold text-gray-900">SummitIQ</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-lime-500 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-lime-500 transition-colors font-medium">Pricing</a>
              <a href="#stats" className="text-gray-600 hover:text-lime-500 transition-colors font-medium">Results</a>
              <Link href="/dashboard">
                <a className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-lg transition-colors font-semibold">
                  Dashboard
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md mb-6 animate-bounce">
              <span className="w-2 h-2 bg-lime-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-700">Premium Demo Experience</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Transform Your Business
              <br />
              <span className="bg-gradient-to-r from-lime-500 to-green-600 text-transparent bg-clip-text">
                With SummitIQ
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The all-in-one platform that empowers teams to work smarter, faster, and achieve
              extraordinary results. Join 50,000+ companies already scaling with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-lime-500 focus:outline-none text-lg w-full sm:w-80"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Get Started Free
                </button>
              </form>
            </div>
            {showSuccess && (
              <div className="mt-4 inline-block px-6 py-3 bg-green-100 border-2 border-green-500 rounded-lg animate-pulse">
                <span className="text-green-700 font-semibold">✓ Thanks! We'll be in touch soon!</span>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Active Companies', color: 'lime' },
              { number: '99.9%', label: 'Uptime SLA', color: 'green' },
              { number: '2M+', label: 'Tasks Completed', color: 'emerald' },
              { number: '4.9/5', label: 'Customer Rating', color: 'lime' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-lime-500 to-green-600 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-lime-500 to-green-600 text-transparent bg-clip-text">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to supercharge your workflow and boost productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Lightning Fast',
                description: 'Experience blazing-fast performance with our optimized infrastructure. Load times under 100ms guaranteed.',
                gradient: 'from-lime-100 to-green-100'
              },
              {
                icon: '🎯',
                title: 'Smart Analytics',
                description: 'Make data-driven decisions with real-time insights and advanced reporting tools that matter.',
                gradient: 'from-green-100 to-emerald-100'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level encryption, SSO, and compliance with SOC 2, GDPR, and HIPAA standards.',
                gradient: 'from-emerald-100 to-lime-100'
              },
              {
                icon: '⚡',
                title: 'Automation Power',
                description: 'Automate repetitive tasks and workflows. Save 20+ hours per week on manual work.',
                gradient: 'from-lime-100 to-green-100'
              },
              {
                icon: '🤝',
                title: 'Team Collaboration',
                description: 'Work together seamlessly with real-time updates, comments, and file sharing.',
                gradient: 'from-green-100 to-emerald-100'
              },
              {
                icon: '📊',
                title: 'Custom Dashboards',
                description: 'Build personalized dashboards that display exactly what you need to see, when you need it.',
                gradient: 'from-emerald-100 to-lime-100'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-lime-400`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Simple, Transparent{' '}
              <span className="bg-gradient-to-r from-lime-500 to-green-600 text-transparent bg-clip-text">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '29',
                id: 'starter',
                description: 'Perfect for small teams',
                features: [
                  'Up to 10 team members',
                  'Basic analytics',
                  '5GB storage',
                  'Email support',
                  'Mobile apps'
                ],
                buttonText: 'Start Free Trial',
                popular: false
              },
              {
                name: 'Professional',
                price: '79',
                id: 'professional',
                description: 'Most popular for growing teams',
                features: [
                  'Up to 50 team members',
                  'Advanced analytics',
                  '100GB storage',
                  'Priority support',
                  'Custom integrations',
                  'Advanced automation'
                ],
                buttonText: 'Start Free Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '199',
                id: 'enterprise',
                description: 'For large organizations',
                features: [
                  'Unlimited team members',
                  'Custom analytics',
                  'Unlimited storage',
                  '24/7 dedicated support',
                  'White-label options',
                  'Advanced security',
                  'SLA guarantee'
                ],
                buttonText: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                onClick={() => setActivePlan(plan.id)}
                className={`relative rounded-2xl p-8 transition-all transform hover:scale-105 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-br from-lime-500 to-green-600 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-lime-400 shadow-md hover:shadow-xl'
                } ${activePlan === plan.id ? 'ring-4 ring-lime-400 ring-offset-2' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-lime-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>
                <div className="text-center mb-6">
                  <span className={`text-5xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-lime-100' : 'text-gray-600'}`}>/month</span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all mb-6 ${
                    plan.popular
                      ? 'bg-white text-lime-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-lime-500 to-green-600 text-white hover:from-lime-600 hover:to-green-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {plan.buttonText}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-lime-200' : 'text-lime-500'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={`${plan.popular ? 'text-lime-50' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-lime-500 to-green-600 text-transparent bg-clip-text">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600">See what our customers have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "SummitIQ transformed how our team collaborates. We've increased productivity by 300% in just 3 months!",
                author: "Sarah Chen",
                role: "CEO, TechStart Inc",
                avatar: "👩‍💼"
              },
              {
                quote: "The automation features alone save us 20+ hours per week. Best investment we've made this year.",
                author: "Michael Rodriguez",
                role: "Operations Manager, GrowthCo",
                avatar: "👨‍💼"
              },
              {
                quote: "Incredible platform! The analytics give us insights we never had before. Game changer for our business.",
                author: "Emily Watson",
                role: "Director, Innovation Labs",
                avatar: "👩‍💻"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-2 border-lime-200 hover:border-lime-400"
              >
                <div className="text-3xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-lime-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-lime-50 mb-10">
            Join 50,000+ companies already using SummitIQ to achieve extraordinary results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-lime-600 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
              Start Your Free Trial
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-lime-600 transition-all">
              Schedule a Demo
            </button>
          </div>
          <p className="text-lime-100 mt-6">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg"></div>
                <span className="text-xl font-bold">SummitIQ</span>
              </div>
              <p className="text-gray-400">Transforming businesses worldwide with intelligent solutions.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-lime-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-lime-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-lime-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 SummitIQ. All rights reserved. Built with ❤️ for amazing teams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
