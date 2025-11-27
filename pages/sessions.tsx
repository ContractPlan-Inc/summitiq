import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useOrganization } from '@clerk/nextjs'

interface Session {
  id: string
  mode: 'PREP' | 'LIVE'
  context: Record<string, unknown> | null
  transcript: Array<{ role: string; content: string }> | null
  summary: string | null
  startedAt: string
  endedAt: string | null
  user: { name: string | null; email: string }
}

export default function Sessions() {
  const { organization, isLoaded } = useOrganization()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  useEffect(() => {
    if (isLoaded && organization) {
      fetchSessions()
    } else if (isLoaded) {
      setLoading(false)
    }
  }, [isLoaded, organization])

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/sessions')
      if (res.ok) {
        const data = await res.json()
        setSessions(data)
      }
    } catch (err) {
      console.error('Failed to fetch sessions:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading) {
    return <Layout><div className="max-w-4xl mx-auto px-6 py-8 text-white/60">Loading...</div></Layout>
  }

  if (!organization) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="card text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Organization Required</h2>
            <p className="text-white/60">Select an organization to view session history.</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Session History</h1>
        <p className="text-white/60 mb-8">Review past prep and live sessions for coaching.</p>

        {sessions.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-white/60">No sessions yet. Start a Prep or Live session to see history here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="card cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      session.mode === 'LIVE' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {session.mode}
                    </span>
                    <span className="text-sm text-white/60">
                      {session.user.name || session.user.email}
                    </span>
                  </div>
                  <span className="text-sm text-white/40">
                    {new Date(session.startedAt).toLocaleDateString()} {new Date(session.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {session.context && typeof session.context === 'object' && 'customer' in session.context && (
                  <p className="text-sm text-white/60">
                    {(session.context as { customer?: string }).customer}
                  </p>
                )}
                {session.summary && (
                  <p className="text-sm text-white/40 mt-2 line-clamp-2">{session.summary}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedSession && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50" onClick={() => setSelectedSession(null)}>
            <div className="bg-black border border-white/10 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Session Details</h2>
                <button onClick={() => setSelectedSession(null)} className="text-white/40 hover:text-white">
                  Close
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm text-white/40">Mode:</span>
                  <span className="ml-2">{selectedSession.mode}</span>
                </div>
                <div>
                  <span className="text-sm text-white/40">User:</span>
                  <span className="ml-2">{selectedSession.user.name || selectedSession.user.email}</span>
                </div>
                <div>
                  <span className="text-sm text-white/40">Started:</span>
                  <span className="ml-2">{new Date(selectedSession.startedAt).toLocaleString()}</span>
                </div>
                {selectedSession.endedAt && (
                  <div>
                    <span className="text-sm text-white/40">Ended:</span>
                    <span className="ml-2">{new Date(selectedSession.endedAt).toLocaleString()}</span>
                  </div>
                )}

                {selectedSession.transcript && Array.isArray(selectedSession.transcript) && (
                  <div>
                    <span className="text-sm text-white/40 block mb-2">Transcript:</span>
                    <div className="space-y-2">
                      {selectedSession.transcript.map((msg, i) => (
                        <div key={i} className={`text-sm p-2 ${msg.role === 'assistant' ? 'bg-mustard/10 border-l-2 border-mustard' : 'bg-white/5'}`}>
                          <span className="text-white/40 text-xs">{msg.role === 'assistant' ? 'Summit' : 'User'}</span>
                          <p>{msg.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
