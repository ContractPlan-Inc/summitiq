import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="px-6 py-6 flex items-center justify-between">
        <span className="text-mustard font-semibold text-lg">SummitIQ</span>
        <Link href="/prep" className="btn-primary">
          Open App →
        </Link>
      </nav>

      <section className="px-6 py-24 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Your expert.<br />
          <span className="text-mustard">Every call.</span>
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-xl">
          Your salespeople don't know everything. They can't.
          But now they don't have to.
        </p>
        <p className="text-xl text-white/70 mb-12 max-w-xl">
          Connect SummitIQ to your knowledge — products, specs, playbooks,
          competitive intel — and it becomes the expert your team needs
          in every conversation.
        </p>
        <div className="flex gap-4">
          <Link href="/prep" className="btn-primary">
            Start a Prep Session
          </Link>
          <Link href="/live" className="btn-secondary">
            Go Live
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl">
          <h2 className="text-sm text-mustard font-medium mb-8 uppercase tracking-wider">
            Two modes. One expert.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Prep Mode</h3>
              <p className="text-white/60">
                Before the call. Tell it who you're meeting, what you're selling.
                It coaches you on what to say, what objections to expect,
                how to position for this specific customer.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Live Mode</h3>
              <p className="text-white/60">
                During the call. Phone on the table. It's ready to answer
                technical questions, surface specs, or give you the positioning
                angle you need — in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl">
          <h2 className="text-sm text-mustard font-medium mb-8 uppercase tracking-wider">
            Your knowledge. Your expert.
          </h2>
          <ul className="space-y-3 text-lg text-white/80">
            <li>→ Connect your product catalog, specs, documentation</li>
            <li>→ Add customer personas, industry context, use cases</li>
            <li>→ Build playbooks for objections, positioning, closing</li>
            <li>→ Import competitive intel</li>
          </ul>
          <p className="text-white/60 mt-6">
            SummitIQ becomes an expert in whatever you teach it. Specialty flour.
            Enterprise software. Medical equipment. Industrial parts. Your domain,
            your knowledge, your expert.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl">
          <h2 className="text-sm text-mustard font-medium mb-8 uppercase tracking-wider">
            Why this works
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">It's your knowledge</h3>
              <p className="text-white/60 text-sm">
                Not generic AI. Your products, your positioning, your playbooks.
                It knows what you know — and it's available to every rep.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">It's honest</h3>
              <p className="text-white/60 text-sm">
                If it doesn't know, it says so. No hallucinations, no bullshit.
                Your customers will trust it because it's trustworthy.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">It scales expertise</h3>
              <p className="text-white/60 text-sm">
                Your best rep's knowledge, available to every rep.
                New hires perform like veterans. Veterans perform better.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">It's there when it counts</h3>
              <p className="text-white/60 text-sm">
                Not async. Not "check back later." Real-time support
                during the conversation that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-white/10 bg-mustard/5">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Ready to see it?</h2>
          <p className="text-white/70 mb-6">
            No demo theater. Open the app, connect your knowledge, and start using it.
          </p>
          <Link href="/knowledge" className="btn-primary">
            Set Up Your Knowledge Base →
          </Link>
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-white/10 text-sm text-white/40">
        <p>SummitIQ — Your expert, on demand</p>
      </footer>
    </main>
  )
}
