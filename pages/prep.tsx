import React, { useState } from 'react'
import Layout from '../components/Layout'

interface Message {
  role: 'user' | 'expert'
  content: string
}

export default function Prep() {
  const [context, setContext] = useState({
    customer: '',
    customerType: '',
    product: '',
    goal: '',
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)

  const startSession = () => {
    if (!context.customer || !context.product) return

    const intro: Message = {
      role: 'expert',
      content: `Got it. You're meeting with ${context.customer}${context.customerType ? ` (${context.customerType})` : ''} about ${context.product}.${context.goal ? ` Your goal: ${context.goal}.` : ''}\n\nLet me prep you. What do you want to start with?\n\n• Tell me about their business so I can research\n• What objections might come up?\n• How do I position this for them?\n• What questions should I ask?\n• What do they probably already know?`
    }
    setMessages([intro])
    setStarted(true)
  }

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }

    // Simulated expert response - in production this calls your AI backend with knowledge base context
    const expertResponse: Message = {
      role: 'expert',
      content: getExpertResponse(input, context)
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Prep Mode</h1>
          <p className="text-white/60">
            Get coached before your call. Know what to say, what to expect, how to win.
          </p>
        </div>

        {!started ? (
          <div className="card">
            <h2 className="text-lg font-semibold mb-6">Set up your call</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Who are you meeting?
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Company name, contact name, role..."
                  value={context.customer}
                  onChange={(e) => setContext({ ...context, customer: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  What type of customer? (optional)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Industry, company size, use case..."
                  value={context.customerType}
                  onChange={(e) => setContext({ ...context, customerType: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  What are you discussing?
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Product, service, solution..."
                  value={context.product}
                  onChange={(e) => setContext({ ...context, product: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  What's your goal? (optional)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Close the deal, get a trial, schedule demo..."
                  value={context.goal}
                  onChange={(e) => setContext({ ...context, goal: e.target.value })}
                />
              </div>
              <button
                onClick={startSession}
                disabled={!context.customer || !context.product}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                Start Prep Session
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-240px)]">
            {/* Context banner */}
            <div className="bg-mustard/10 border border-mustard/20 px-4 py-3 mb-4 flex items-center justify-between">
              <span className="text-sm">
                <span className="text-mustard font-medium">{context.customer}</span>
                <span className="text-white/40 mx-2">·</span>
                <span className="text-white/60">{context.product}</span>
                {context.goal && (
                  <>
                    <span className="text-white/40 mx-2">·</span>
                    <span className="text-white/40">Goal: {context.goal}</span>
                  </>
                )}
              </span>
              <button
                onClick={() => { setStarted(false); setMessages([]); }}
                className="text-sm text-white/40 hover:text-white"
              >
                New session
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${
                    msg.role === 'expert'
                      ? 'bg-white/5 border-l-2 border-mustard'
                      : 'bg-white/10'
                  } px-4 py-3`}
                >
                  <div className="text-xs text-white/40 mb-1">
                    {msg.role === 'expert' ? 'SummitIQ' : 'You'}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={sendMessage} className="btn-primary">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Simulated expert responses - replace with real AI backend that pulls from knowledge base
function getExpertResponse(input: string, context: any): string {
  const lower = input.toLowerCase()

  if (lower.includes('objection') || lower.includes('pushback') || lower.includes('concern')) {
    return `For this meeting with ${context.customer}, anticipate these objections:\n\n**1. Price / Budget**\n"We don't have budget for this right now."\n→ Ask what they're spending now on the problem you solve. Reframe as cost of inaction.\n\n**2. Timing**\n"Not the right time."\n→ Ask what would make it the right time. Often reveals the real blocker.\n\n**3. Competition / Status Quo**\n"We already have something for this."\n→ Don't attack their current solution. Ask what's working and what's not.\n\n**4. Authority**\n"I need to check with my team/boss."\n→ Offer to include them now or set up a follow-up. Ask what they'd need to see to recommend it.\n\nWhich of these feels most likely? I can help you prepare a specific response.`
  }

  if (lower.includes('question') || lower.includes('ask them') || lower.includes('discovery')) {
    return `Good discovery questions for ${context.customer}:\n\n**Situation:**\n• "Walk me through how you handle [problem area] today."\n• "What tools/process are you using currently?"\n\n**Problem:**\n• "What's the biggest pain point with your current approach?"\n• "When does this problem cost you the most — time, money, deals?"\n\n**Implication:**\n• "What happens if this doesn't get solved this quarter?"\n• "How does this affect your team day-to-day?"\n\n**Need-payoff:**\n• "If you could fix one thing about this, what would it be?"\n• "What would success look like for you?"\n\nStart with situation, only go deeper if they're engaged. Don't interrogate.`
  }

  if (lower.includes('position') || lower.includes('pitch') || lower.includes('present') || lower.includes('sell')) {
    return `For ${context.customer}, I'd position ${context.product} around:\n\n**Lead with their problem, not your features.**\n"You mentioned [specific challenge]. Here's how we solve that..."\n\n**Be specific to their context.**\nDon't give the generic pitch. Reference what you know about their situation, industry, or role.\n\n**Differentiate on what matters to them.**\nNot everything you do — just the 1-2 things that matter for THIS customer.\n\n**Make it concrete.**\n"Customers like you typically see [specific outcome]." Real numbers, real examples.\n\n**End with a clear next step.**\nNot "let me know what you think" — propose something specific.\n\nWant me to help draft the actual positioning statement?`
  }

  if (lower.includes('close') || lower.includes('next step') || lower.includes('commit')) {
    return `Closing approaches for this conversation:\n\n**Assumptive close:**\n"Let's get you set up. What email should I send the agreement to?"\n\n**Trial close:**\n"Based on what we've discussed, does this feel like a fit?"\n\n**Next-step close:**\n"What would you need to see to move forward?"\n\n**Urgency (if legitimate):**\n"We can lock in [benefit] if we start by [date]."\n\n**The honest ask:**\n"I think this solves your problem. What's stopping us from moving forward today?"\n\nKey: propose a specific next step. "I'll follow up" is weak. "Can we schedule a call with your team for Thursday?" is better.`
  }

  if (lower.includes('research') || lower.includes('about them') || lower.includes('background')) {
    return `Here's what to research about ${context.customer} before the call:\n\n**Company:**\n• Recent news, funding, product launches\n• Growth trajectory — hiring? expanding? contracting?\n• Public statements about priorities or challenges\n\n**Contact:**\n• Their role and likely priorities\n• How long they've been there\n• LinkedIn for shared connections or interests\n\n**Industry:**\n• What's happening in their market right now?\n• What are their competitors doing?\n• Regulatory or economic factors affecting them\n\n**Your history with them:**\n• Previous conversations or deals?\n• Anyone at your company who knows them?\n\nSpend 10 minutes on this. It pays off when you can say "I saw you just launched X..."`
  }

  return `Got it. Let me think about that for your meeting with ${context.customer}.\n\nTo give you better prep, can you tell me more about:\n\n• What's their current situation?\n• What problem are you solving for them?\n• What do you know about their decision process?\n\nOr ask me about something specific:\n• Objections you might face\n• Questions to ask them\n• How to position ${context.product}\n• How to close or get to next steps`
}
