import React, { useState } from 'react'
import Layout from '../components/Layout'

interface Message {
  role: 'user' | 'expert' | 'system'
  content: string
  timestamp: Date
}

export default function Live() {
  const [isLive, setIsLive] = useState(false)
  const [context, setContext] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const goLive = () => {
    const systemMsg: Message = {
      role: 'system',
      content: 'Live session started. I\'m here. Type a question anytime — yours or your customer\'s. I\'ll keep answers short and scannable.',
      timestamp: new Date(),
    }
    setMessages([systemMsg])
    setIsLive(true)
  }

  const endSession = () => {
    const summary = messages.filter(m => m.role === 'user').length
    const systemMsg: Message = {
      role: 'system',
      content: `Session ended. ${summary} question${summary !== 1 ? 's' : ''} answered.`,
      timestamp: new Date(),
    }
    setMessages([...messages, systemMsg])
    setIsLive(false)
  }

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    // Simulated response - in production this calls your AI backend
    const expertResponse: Message = {
      role: 'expert',
      content: getLiveResponse(input),
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage, expertResponse])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
              Live Mode
              {isLive && (
                <span className="inline-flex items-center gap-2 text-sm font-normal">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400">Live</span>
                </span>
              )}
            </h1>
            <p className="text-white/60">
              In-call support. Type a question, get an answer. Fast.
            </p>
          </div>
          {isLive && (
            <button onClick={endSession} className="btn-secondary text-sm">
              End Session
            </button>
          )}
        </div>

        {!isLive ? (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Quick context (optional)</h2>
              <textarea
                className="input-field h-24 resize-none"
                placeholder="Who are you meeting? What's the situation? Any context helps..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <button onClick={goLive} className="btn-primary w-full py-4 text-lg">
              Go Live
            </button>

            <div className="card bg-transparent border-dashed">
              <h3 className="font-medium mb-3">How it works</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>→ Keep this open on your phone or tablet during the call</li>
                <li>→ When a question comes up, type it — yours or theirs</li>
                <li>→ I'll give you a fast, scannable answer</li>
                <li>→ Use it for specs, positioning, objection handling, whatever</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-240px)]">
            {/* Context banner */}
            {context && (
              <div className="bg-white/5 border border-white/10 px-4 py-2 mb-4 text-sm text-white/60">
                {context}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 ${
                    msg.role === 'expert'
                      ? 'bg-mustard/10 border-l-2 border-mustard'
                      : msg.role === 'system'
                      ? 'bg-white/5 text-white/60 text-sm'
                      : 'bg-white/10'
                  }`}
                >
                  {msg.role !== 'system' && (
                    <div className="text-xs text-white/40 mb-1 flex items-center justify-between">
                      <span>{msg.role === 'expert' ? 'SummitIQ' : 'You'}</span>
                      <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))}
            </div>

            {/* Input - large for quick access during call */}
            <div className="flex gap-3">
              <input
                type="text"
                className="input-field flex-1 text-lg py-4"
                placeholder="Type a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button onClick={sendMessage} className="btn-primary px-8">
                Ask
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Simulated live responses - optimized for quick, scannable answers
// In production, this calls your AI backend with full knowledge base context
function getLiveResponse(input: string): string {
  const lower = input.toLowerCase()

  if (lower.includes('price') || lower.includes('cost') || lower.includes('expensive') || lower.includes('budget')) {
    return `**Don't defend on price. Reframe:**

"What are you spending now on this problem — including time, workarounds, missed opportunities?"

If they push harder:
"We're not the cheapest. We're the most reliable. What's a failed [outcome] cost you?"`
  }

  if (lower.includes('competitor') || lower.includes('vs') || lower.includes('compared') || lower.includes('alternative')) {
    return `**Don't trash competitors:**

"They're solid. Where we're different is [specific thing that matters to this customer]."

Focus on fit, not on making them look bad. Win on why you're right for them, not why others are wrong.`
  }

  if (lower.includes('how does') || lower.includes('how do') || lower.includes('what is') || lower.includes('explain')) {
    return `This is a knowledge question — I need your product/service knowledge base to answer accurately.

For now: break it down simply, use an analogy if helpful, and ask "Does that make sense?" after.`
  }

  if (lower.includes('discount') || lower.includes('deal') || lower.includes('better price')) {
    return `**Don't give discounts unprompted. Ask:**

"What would need to be true for the current pricing to work for you?"

If they need something:
"I can look at [specific thing] if we can [commit today / sign annual / etc]."

Never discount without getting something back.`
  }

  if (lower.includes('think about') || lower.includes('get back') || lower.includes('let me check')) {
    return `**They're stalling. Clarify:**

"Totally understand. What specifically do you need to think through?"

Then: "What would help you make that decision? Can I get you anything?"

Try to surface the real blocker before they leave.`
  }

  if (lower.includes('not ready') || lower.includes('not now') || lower.includes('not the right time')) {
    return `**Timing objection. Dig deeper:**

"What would make it the right time?"

Then: "What changes between now and then?"

Often reveals the real issue — budget, authority, competing priorities. Address that instead.`
  }

  if (lower.includes('already have') || lower.includes('using') || lower.includes('current')) {
    return `**Don't attack their current solution:**

"What's working well with that?"
"What would you change if you could?"

Sell against the gap, not against them. They chose their current solution — don't make them feel stupid.`
  }

  if (lower.includes('help') || lower.includes('what can you')) {
    return `**I can help with:**

• Quick answers to customer questions
• Handling objections
• Pricing/discount strategy
• Positioning against competitors
• What to say next

Just type the question — theirs or yours.`
  }

  return `I don't have specific knowledge loaded to answer that precisely.

**In the moment:**
• If technical: "Let me get you the exact spec on that" (buy time)
• If objection: ask a clarifying question back
• If you're stuck: "What would be most helpful for you to know?"

Add this to your knowledge base after the call so I can answer it next time.`
}
