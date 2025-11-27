import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useOrganization } from '@clerk/nextjs'

interface Message {
  role: 'user' | 'expert'
  content: string
}

export default function Prep() {
  const { organization, isLoaded: orgLoaded } = useOrganization()
  const [context, setContext] = useState({
    customer: '',
    customerType: '',
    product: '',
    goal: '',
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])

  const startSession = async () => {
    if (!context.customer || !context.product) return

    setStarted(true)
    setLoading(true)

    const setupMessage = `I'm about to meet with ${context.customer}${context.customerType ? ` (${context.customerType})` : ''} to discuss ${context.product}.${context.goal ? ` My goal is: ${context.goal}.` : ''} Help me prepare for this call.`

    try {
      const response = await fetch('/api/expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: setupMessage,
          context: { mode: 'prep', ...context },
          conversationHistory: [],
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages([{ role: 'expert', content: data.response }])
        setConversationHistory([
          { role: 'user', content: setupMessage },
          { role: 'assistant', content: data.response },
        ])
      } else {
        setMessages([{ role: 'expert', content: "I'm ready to help you prep. What would you like to focus on — objections, positioning, questions to ask, or something else?" }])
      }
    } catch (err) {
      setMessages([{ role: 'expert', content: "I'm ready to help you prep. What would you like to focus on?" }])
    }

    setLoading(false)
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          context: { mode: 'prep', ...context },
          conversationHistory,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'expert', content: data.response }])
        setConversationHistory(prev => [
          ...prev,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: data.response },
        ])
      } else {
        setMessages(prev => [...prev, { role: 'expert', content: "Sorry, I couldn't process that. Try again?" }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'expert', content: "Connection issue. Try again in a moment." }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetSession = () => {
    setStarted(false)
    setMessages([])
    setConversationHistory([])
    setContext({ customer: '', customerType: '', product: '', goal: '' })
  }

  if (!orgLoaded) {
    return <Layout><div className="max-w-4xl mx-auto px-6 py-8 text-white/60">Loading...</div></Layout>
  }

  if (!organization) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="card text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Organization Required</h2>
            <p className="text-white/60">Select or create an organization to start using Prep mode.</p>
          </div>
        </div>
      </Layout>
    )
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
                onClick={resetSession}
                className="text-sm text-white/40 hover:text-white"
              >
                New session
              </button>
            </div>

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
                    {msg.role === 'expert' ? 'Summit' : 'You'}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div className="bg-white/5 border-l-2 border-mustard px-4 py-3">
                  <div className="text-xs text-white/40 mb-1">Summit</div>
                  <div className="text-white/60">Thinking...</div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                className="btn-primary"
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
