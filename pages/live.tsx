import React, { useState, useEffect, useRef, useCallback } from 'react'
import Layout from '../components/Layout'

type Mode = 'directed' | 'interjection'
type Status = 'idle' | 'listening' | 'thinking' | 'speaking'

interface Utterance {
  role: 'customer' | 'summit' | 'system'
  content: string
  timestamp: Date
}

export default function Live() {
  const [isLive, setIsLive] = useState(false)
  const [mode, setMode] = useState<Mode>('directed')
  const [status, setStatus] = useState<Status>('idle')
  const [utterances, setUtterances] = useState<Utterance[]>([])
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return

    // Stop any current speech
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0

    // Try to get a natural-sounding voice
    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Alex') ||
      v.name.includes('Google') ||
      v.lang.startsWith('en')
    )
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => setStatus('speaking')
    utterance.onend = () => {
      setStatus('listening')
      // Resume recognition after speaking
      if (recognitionRef.current && isLive) {
        try { recognitionRef.current.start() } catch (e) {}
      }
    }

    setStatus('speaking')
    synthRef.current.speak(utterance)
  }, [isLive])

  const processUtterance = useCallback((transcript: string) => {
    const lower = transcript.toLowerCase().trim()

    // Check for wake word in directed mode
    const wakeWords = ['summit', 'summitiq', 'summit iq']
    const hasWakeWord = wakeWords.some(w => lower.includes(w))

    if (mode === 'directed' && !hasWakeWord) {
      // In directed mode, ignore if no wake word
      return
    }

    // Extract the actual question (remove wake word)
    let question = transcript
    wakeWords.forEach(w => {
      question = question.replace(new RegExp(w, 'gi'), '').trim()
    })
    // Clean up common patterns
    question = question.replace(/^[,\s]+/, '').replace(/^(can you |could you |please |tell us |what about )/i, '')

    if (question.length < 3) return

    // Log what we heard
    setUtterances(prev => [...prev, {
      role: 'customer',
      content: transcript,
      timestamp: new Date()
    }])

    setStatus('thinking')

    // Generate response (in production, this calls your AI backend)
    const response = generateResponse(question, mode)

    // Log and speak the response
    setUtterances(prev => [...prev, {
      role: 'summit',
      content: response,
      timestamp: new Date()
    }])

    // Stop listening while we speak
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) {}
    }

    speak(response)
  }, [mode, speak])

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser. Try Chrome.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setStatus('listening')
      setError(null)
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      setCurrentTranscript(interimTranscript)

      if (finalTranscript) {
        setCurrentTranscript('')
        processUtterance(finalTranscript)
      }
    }

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        // This is fine, just no speech detected
        return
      }
      console.error('Speech recognition error:', event.error)
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access.')
      }
    }

    recognition.onend = () => {
      // Restart if we're still live and not speaking
      if (isLive && status !== 'speaking') {
        try { recognition.start() } catch (e) {}
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [isLive, status, processUtterance])

  const goLive = () => {
    setIsLive(true)
    setUtterances([{
      role: 'system',
      content: mode === 'directed'
        ? 'Listening. Say "Summit" followed by your question.'
        : 'Listening to the conversation. I\'ll jump in when I can help.',
      timestamp: new Date()
    }])
    startListening()
  }

  const endSession = () => {
    setIsLive(false)
    setStatus('idle')
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    setUtterances(prev => [...prev, {
      role: 'system',
      content: 'Session ended.',
      timestamp: new Date()
    }])
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const statusColors = {
    idle: 'bg-white/20',
    listening: 'bg-green-500',
    thinking: 'bg-mustard animate-pulse',
    speaking: 'bg-blue-500 animate-pulse'
  }

  const statusText = {
    idle: 'Ready',
    listening: 'Listening',
    thinking: 'Thinking...',
    speaking: 'Speaking'
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {!isLive ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Live Mode</h1>
              <p className="text-white/60">
                Voice-activated expert. Phone on table. Hands-free.
              </p>
            </div>

            <div className="card mb-6">
              <h2 className="text-lg font-semibold mb-4">Choose your mode</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setMode('directed')}
                  className={`text-left p-4 border transition-colors ${
                    mode === 'directed'
                      ? 'border-mustard bg-mustard/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <h3 className="font-medium mb-1">Directed</h3>
                  <p className="text-sm text-white/60">
                    Only responds when called. "Summit, tell us about..."
                  </p>
                </button>
                <button
                  onClick={() => setMode('interjection')}
                  className={`text-left p-4 border transition-colors ${
                    mode === 'interjection'
                      ? 'border-mustard bg-mustard/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <h3 className="font-medium mb-1">Interjection</h3>
                  <p className="text-sm text-white/60">
                    Listens to the conversation. Jumps in when it can help.
                  </p>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <button onClick={goLive} className="btn-primary w-full py-4 text-lg">
              Go Live
            </button>

            <div className="card bg-transparent border-dashed mt-6">
              <h3 className="font-medium mb-3">Introducing Summit</h3>
              <p className="text-white/60 text-sm">
                Keep it natural. Something like: "I've got our product specialist on the line with us —
                feel free to ask them anything technical." Then just set your phone down and go.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            {/* Status bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                <span className="text-lg font-medium">{statusText[status]}</span>
                <span className="text-white/40 text-sm">
                  {mode === 'directed' ? '(say "Summit" to ask)' : '(listening to conversation)'}
                </span>
              </div>
              <button onClick={endSession} className="btn-secondary text-sm">
                End Session
              </button>
            </div>

            {/* Current transcript */}
            {currentTranscript && (
              <div className="bg-white/5 border border-white/10 px-4 py-2 mb-4 text-white/60 italic">
                {currentTranscript}...
              </div>
            )}

            {/* Conversation log */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {utterances.map((u, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 ${
                    u.role === 'summit'
                      ? 'bg-mustard/10 border-l-2 border-mustard'
                      : u.role === 'system'
                      ? 'bg-white/5 text-white/60 text-sm'
                      : 'bg-white/10'
                  }`}
                >
                  {u.role !== 'system' && (
                    <div className="text-xs text-white/40 mb-1">
                      {u.role === 'summit' ? 'Summit' : 'Heard'}
                    </div>
                  )}
                  <div>{u.content}</div>
                </div>
              ))}
            </div>

            {/* Large visual indicator for table view - minimal, professional */}
            <div className="flex items-center justify-center py-8">
              <div className={`w-32 h-32 rounded-full ${statusColors[status]} flex items-center justify-center transition-all duration-300`}>
                <span className="text-black font-semibold uppercase tracking-wide text-sm">
                  {statusText[status]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// Response generation - in production this calls your AI backend with full knowledge base
function generateResponse(question: string, mode: Mode): string {
  const lower = question.toLowerCase()

  // Product-specific responses (demo - would come from knowledge base)
  if (lower.includes('anchovy') || lower.includes('paste')) {
    return "Anchovy paste is one of those secret weapons in professional kitchens. It adds deep umami without tasting fishy when used correctly. Start with half a teaspoon per serving in sauces, dressings, or braises. It dissolves completely and just makes everything taste more savory. Great for Caesar dressing, pasta puttanesca, or anywhere you want depth without people knowing why it tastes so good."
  }

  if (lower.includes('gluten') || lower.includes('flour') || lower.includes('protein')) {
    return "Protein content in flour determines structure. Higher protein, like 13 to 14 percent, gives you more gluten development — that's what you want for chewy breads, bagels, pizza with good chew. Lower protein, around 8 to 10 percent, keeps things tender — better for cakes, pastries, biscuits. Match the flour to what you're making."
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('expensive')) {
    return "Fair question on price. Here's how I'd think about it: what's the cost of inconsistency? A bad batch on a busy night, a customer complaint, having to comp a meal. Our customers find that the reliability pays for itself. But I'd suggest trying a sample batch in your kitchen first — see the difference yourself, then decide."
  }

  if (lower.includes('competitor') || lower.includes('other') || lower.includes('alternative') || lower.includes('compare')) {
    return "There are good options out there. Where we tend to win is on consistency batch to batch and technical support when you need it. But honestly, the best test is your kitchen. Let's get you a sample and you can compare side by side with what you're using now."
  }

  if (lower.includes('menu') || lower.includes('application') || lower.includes('use')) {
    return "That really depends on your menu and what you're trying to achieve. Tell me more about what dishes you're thinking about, and I can give you specific recommendations on applications and techniques."
  }

  if (lower.includes('hello') || lower.includes('hi ') || lower.includes('hey')) {
    return "Hello! I'm Summit, here to help with any product questions. Feel free to ask about specs, applications, or anything else — that's what I'm here for."
  }

  // Default response
  return "That's a good question. Let me give you the specific details on that — could you tell me a bit more about what you're trying to accomplish? That'll help me give you the most relevant answer."
}
