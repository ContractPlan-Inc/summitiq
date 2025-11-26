import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-mustard text-black">
      <nav className="p-6 flex justify-between items-center">
        <span className="text-lg font-semibold">SummitIQ</span>
        <a href="/dashboard" className="text-black hover:underline">
          Dashboard →
        </a>
      </nav>

      <section className="px-6 py-24 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
          Contract management software.
        </h1>
        <p className="text-xl mb-12 max-w-lg">
          You sign contracts. We help you track them, find them, and not forget about them. That's it.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-black text-mustard px-6 py-3 text-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Open Dashboard
        </a>
      </section>

      <section className="px-6 py-16 border-t border-black/20">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">What you get:</h2>
          <ul className="space-y-4 text-lg">
            <li>→ A place to store contracts</li>
            <li>→ Search that actually works</li>
            <li>→ Alerts before things expire</li>
            <li>→ Reports when you need them</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-black/20">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">What you don't get:</h2>
          <p className="text-lg text-black/70">
            AI buzzwords. Blockchain. "Revolutionary" anything. We're not pretending to be more than we are.
          </p>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-black/20 text-sm text-black/60">
        <p>SummitIQ — Contract management software</p>
      </footer>
    </main>
  );
}
