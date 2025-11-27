import React, { useState, useEffect, useRef, useCallback } from 'react'
import Layout from '@/components/Layout'
import { useOrganization } from '@clerk/nextjs'

type Mode = 'directed' | 'interjection'
type Status = 'idle' | 'listening' | 'thinking' | 'speaking'

interface Utterance {
  role: 'customer' | 'summit' | 'system'
  content: string
  timestamp: Date
}

export default function Live() {
  const { organization, isLoaded: orgLoaded } = useOrganization()
  const [isLive, setIsLive] = useState(false)
  const [mode, setMode] = useState<Mode>('directed')
  const [status, setStatus] = useState<Status>('idle')
  const [utterances, setUtterances] = useState<Utterance[]>([])
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const isLiveRef = useRef(isLive)

  useEffect(() => {
    isLiveRef.current = isLive
  }, [isLive])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
      window.speechSynthesis.getVoices()
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return

    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    utterance.pitch = 1.0

    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Daniel') ||
      (v.name.includes('Google') && v.lang.startsWith('en')) ||
      v.lang.startsWith('en-US')
    )
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onstart = () => setStatus('speaking')
    utterance.onend = () => {
      setStatus('listening')
      if (recognitionRef.current && isLiveRef.current) {
        try { recognitionRef.current.start() } catch (e) { /* ignore */ }
      }
    }

    setStatus('speaking')
    synthRef.current.speak(utterance)
  }, [])

  const callExpert = useCallback(async (question: string): Promise<string> => {
    try {
      const response = await fetch('/api/expert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          context: { mode: 'live' },
          conversationHistory,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Failed to get response')
      }

      const data = await response.json()

      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: question },
        { role: 'assistant', content: data.response },
      ])

      return data.response
    } catch (err) {
      console.error('Expert API error:', err)
      return "I'm having trouble connecting right now. Give me a moment and try again."
    }
  }, [conversationHistory])

  const processUtterance = useCallback(async (transcript: string) => {
    const lower = transcript.toLowerCase().trim()

    const wakeWords = ['summit', 'summitiq', 'summit iq', 'hey summit', 'ok summit']
    const hasWakeWord = wakeWords.some(w => lower.includes(w))

    if (mode === 'directed' && !hasWakeWord) {
      return
    }

    let question = transcript
    wakeWords.forEach(w => {
      question = question.replace(new RegExp(w, 'gi'), '').trim()
    })
    question = question.replace(/^[,\s]+/, '').replace(/^(can you |could you |please |tell us |what about |what's )/i, '')

    if (question.length < 3) return

    setUtterances(prev => [...prev, {
      role: 'customer',
      content: transcript,
      timestamp: new Date()
    }])

    setStatus('thinking')

    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) { /* ignore */ }
    }

    const response = await callExpert(question)

    setUtterances(prev => [...prev, {
      role: 'summit',
      content: response,
      timestamp: new Date()
    }])

    speak(response)
  }, [mode, callExpert, speak])

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognitionAPI) {
      setError('Speech recognition not supported in this browser. Try Chrome on desktop.')
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setStatus('listening')
      setError(null)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
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

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech' || event.error === 'aborted') {
        return
      }
      console.error('Speech recognition error:', event.error)
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone access and reload.')
      }
    }

    recognition.onend = () => {
      if (isLiveRef.current) {
        setTimeout(() => {
          if (isLiveRef.current && recognitionRef.current) {
            try { recognitionRef.current.start() } catch (e) { /* ignore */ }
          }
        }, 100)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [processUtterance])

  const goLive = () => {
    setConversationHistory([])
    setIsLive(true)
    setUtterances([{
      role: 'system',
      content: mode === 'directed'
        ? 'Ready. Say "Summit" followed by your question.'
        : 'Listening. I\'ll help when I can.',
      timestamp: new Date()
    }])
    startListening()
  }

  const endSession = () => {
    setIsLive(false)
    setStatus('idle')
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) { /* ignore */ }
      recognitionRef.current = null
    }
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    const questionCount = utterances.filter(u => u.role === 'customer').length
    setUtterances(prev => [...prev, {
      role: 'system',
      content: `Session ended. ${questionCount} question${questionCount !== 1 ? 's' : ''} answered.`,
      timestamp: new Date()
    }])
  }

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop() } catch (e) { /* ignore */ }
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const statusColors: Record<Status, string> = {
    idle: 'bg-white/20',
    listening: 'bg-green-500',
    thinking: 'bg-mustard animate-pulse',
    speaking: 'bg-mustard'
  }

  const statusText: Record<Status, string> = {
    idle: 'Ready',
    listening: 'Listening',
    thinking: 'Thinking',
    speaking: 'Speaking'
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
            <p className="text-white/60">Select or create an organization to use Live mode.</p>
          </div>
        </div>
      </Layout>
    )
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
                Keep it natural. Something like: "I've got our product specialist on the line —
                feel free to ask them anything technical." Then set your phone down and go.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                <span className="text-lg font-medium">{statusText[status]}</span>
                <span className="text-white/40 text-sm">
                  {mode === 'directed' ? '(say "Summit" to ask)' : '(listening)'}
                </span>
              </div>
              <button onClick={endSession} className="btn-secondary text-sm">
                End
              </button>
            </div>

            {currentTranscript && (
              <div className="bg-white/5 border border-white/10 px-4 py-2 mb-4 text-white/60 italic">
                {currentTranscript}...
              </div>
            )}

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
