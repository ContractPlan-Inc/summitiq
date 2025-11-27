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
          An expert in every sales call.
        </h1>
        <p className="text-xl mb-12 max-w-lg">
          Set your phone on the table. SummitIQ listens, answers questions, and knows your products cold. Your salespeople never walk in alone again.
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
          <h2 className="text-2xl font-bold mb-8">How it works:</h2>
          <ul className="space-y-4 text-lg">
            <li>→ Salesperson opens SummitIQ on their phone or iPad</li>
            <li>→ Sets it on the table during the meeting</li>
            <li>→ AI expert listens and joins when needed</li>
            <li>→ Answers technical questions, makes recommendations, knows the specs</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-black/20">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">What else it does:</h2>
          <ul className="space-y-4 text-lg">
            <li>→ Takes notes so your rep can focus on the conversation</li>
            <li>→ Sets follow-up reminders</li>
            <li>→ Pulls from your product databases, specs, and systems</li>
            <li>→ Deep expertise in whatever specialty you need</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-black/20">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">The real problem this solves:</h2>
          <p className="text-lg text-black/80">
            Your best salespeople aren't always your most technical. Your most technical people aren't always available. Now every rep has backup.
          </p>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-black/20 text-sm text-black/60">
        <p>SummitIQ — Expert on demand</p>
      </footer>
    </main>
  );
}
