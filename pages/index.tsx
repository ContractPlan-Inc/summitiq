import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [demoMode, setDemoMode] = useState(false);

  const features = [
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Real-time insights into your contract portfolio with AI-powered analytics and risk assessment."
    },
    {
      icon: "🔔",
      title: "Intelligent Alerts",
      description: "Never miss a deadline with smart notifications for renewals, expirations, and obligations."
    },
    {
      icon: "🤝",
      title: "Collaboration Hub",
      description: "Seamless team collaboration with role-based access and approval workflows."
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with SOC 2, GDPR, and industry standards."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 text-center animate-fade-in">
          <p className="text-sm font-medium">
            🎯 Demo Mode Active - Explore all features with sample data
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            ContractPlan
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              demoMode
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300"
            }`}
          >
            {demoMode ? "Exit Demo" : "Live Demo"}
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
            Contract Intelligence
            <br />
            Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform how you manage contracts with AI-powered insights, automated workflows, and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <button
              onClick={() => setDemoMode(true)}
              className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-primary-300 transition-all"
            >
              Try Live Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-gray-600 mt-2 font-medium">Uptime SLA</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-gray-600 mt-2 font-medium">Contracts Managed</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-gray-600 mt-2 font-medium">Enterprise Customers</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Everything You Need
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          Powerful features designed for modern contract management
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Contract Management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies streamlining their contract workflows
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <button
              onClick={() => setDemoMode(true)}
              className="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">© 2025 ContractPlan. All rights reserved.</p>
          <p className="text-sm">Enterprise contract intelligence platform</p>
        </div>
      </footer>
    </main>
  );
}
