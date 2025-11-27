import React, { useState, useEffect, useCallback } from 'react'
import Layout from '../components/Layout'
import { useOrganization } from '@clerk/nextjs'

interface KnowledgeItem {
  id: string
  type: 'PRODUCT' | 'CUSTOMER' | 'COMPETITOR' | 'PLAYBOOK'
  title: string
  content: string
  createdAt: string
}

interface Document {
  id: string
  filename: string
  contentType: string
  size: number
  status: 'PENDING' | 'PROCESSING' | 'READY' | 'FAILED'
  createdAt: string
}

export default function Knowledge() {
  const { organization, isLoaded: orgLoaded } = useOrganization()
  const [items, setItems] = useState<KnowledgeItem[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newItem, setNewItem] = useState({ type: 'PRODUCT' as const, title: '', content: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [activeTab, setActiveTab] = useState<'knowledge' | 'documents'>('knowledge')
  const [error, setError] = useState<string | null>(null)

  const typeLabels: Record<string, string> = {
    PRODUCT: 'Products & Services',
    CUSTOMER: 'Customer Types',
    COMPETITOR: 'Competitors',
    PLAYBOOK: 'Playbooks',
  }

  const typeDescriptions: Record<string, string> = {
    PRODUCT: 'Your offerings — specs, features, pricing, use cases, what makes them different.',
    CUSTOMER: 'Who you sell to — personas, industries, pain points, what they care about.',
    COMPETITOR: 'Who you compete with — their strengths, weaknesses, how to position against them.',
    PLAYBOOK: 'How to sell — objection handling, closing techniques, discovery questions.',
  }

  const typeColors: Record<string, string> = {
    PRODUCT: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    CUSTOMER: 'bg-green-500/20 text-green-400 border-green-500/30',
    COMPETITOR: 'bg-red-500/20 text-red-400 border-red-500/30',
    PLAYBOOK: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }

  const fetchItems = useCallback(async () => {
    if (!organization) return

    try {
      setLoading(true)
      const [knowledgeRes, docsRes] = await Promise.all([
        fetch('/api/knowledge'),
        fetch('/api/documents')
      ])

      if (knowledgeRes.ok) {
        const data = await knowledgeRes.json()
        setItems(data)
      } else {
        const err = await knowledgeRes.json()
        setError(err.error || 'Failed to load knowledge')
      }

      if (docsRes.ok) {
        const docsData = await docsRes.json()
        setDocuments(docsData)
      }
    } catch (err) {
      setError('Failed to connect')
    } finally {
      setLoading(false)
    }
  }, [organization])

  useEffect(() => {
    if (orgLoaded && organization) {
      fetchItems()
    } else if (orgLoaded) {
      setLoading(false)
    }
  }, [orgLoaded, organization, fetchItems])

  const addItem = async () => {
    if (!newItem.title || !newItem.content) return

    setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })

      if (res.ok) {
        const item = await res.json()
        setItems([item, ...items])
        setNewItem({ type: 'PRODUCT', title: '', content: '' })
        setShowAdd(false)
      } else {
        const err = await res.json()
        setError(err.error || 'Failed to save')
      }
    } catch (err) {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/knowledge/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setItems(items.filter(item => item.id !== id))
      }
    } catch (err) {
      setError('Failed to delete')
    }
  }

  const uploadFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Get presigned upload URL
      const urlRes = await fetch('/api/documents/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      })

      if (!urlRes.ok) {
        const err = await urlRes.json()
        setError(err.error || 'Failed to get upload URL')
        setUploading(false)
        return
      }

      const { uploadUrl, key } = await urlRes.json()

      // Upload to S3
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      })

      if (!uploadRes.ok) {
        setError('Failed to upload file')
        setUploading(false)
        return
      }

      // Save document record
      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          s3Key: key,
          contentType: file.type,
          size: file.size,
        }),
      })

      if (docRes.ok) {
        const doc = await docRes.json()
        setDocuments([doc, ...documents])
      } else {
        setError('Failed to save document record')
      }
    } catch (err) {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const deleteDocument = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDocuments(documents.filter(doc => doc.id !== id))
      }
    } catch (err) {
      setError('Failed to delete document')
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {} as Record<string, KnowledgeItem[]>)

  if (!orgLoaded || loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-white/60">Loading...</div>
        </div>
      </Layout>
    )
  }

  if (!organization) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="card text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Organization Required</h2>
            <p className="text-white/60 mb-6">
              Create or select an organization to manage your knowledge base.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-white/60">
            Everything Summit knows about your business. The more you add, the better it gets.
          </p>
        </div>

        <div className="flex items-center gap-6 border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'knowledge'
                ? 'border-mustard text-mustard'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Knowledge Items
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 text-sm font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'documents'
                ? 'border-mustard text-mustard'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            Documents ({documents.length})
          </button>
          {activeTab === 'knowledge' && (
            <button onClick={() => setShowAdd(true)} className="btn-primary ml-auto text-sm">
              + Add Knowledge
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-200 px-4 py-3 mb-6">
            {error}
            <button onClick={() => setError(null)} className="ml-4 underline">Dismiss</button>
          </div>
        )}

        {activeTab === 'knowledge' && items.length === 0 && !showAdd && (
          <div className="card border-dashed mb-8">
            <h2 className="text-lg font-semibold mb-4">Get started</h2>
            <p className="text-white/60 mb-6">
              Add your first piece of knowledge. Start with whatever you know best.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(typeLabels).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => {
                    setNewItem({ ...newItem, type: type as any })
                    setShowAdd(true)
                  }}
                  className={`text-left p-4 border ${typeColors[type]} hover:bg-white/5 transition-colors`}
                >
                  <h3 className="font-medium mb-1">{label}</h3>
                  <p className="text-xs text-white/50">{typeDescriptions[type]}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && showAdd && (
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Add Knowledge</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Type</label>
                <select
                  className="input-field"
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                >
                  <option value="PRODUCT">Product / Service</option>
                  <option value="CUSTOMER">Customer Type</option>
                  <option value="COMPETITOR">Competitor</option>
                  <option value="PLAYBOOK">Playbook</option>
                </select>
                <p className="text-xs text-white/40 mt-1">
                  {typeDescriptions[newItem.type]}
                </p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Give it a clear name..."
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Content</label>
                <textarea
                  className="input-field h-40 resize-none font-mono text-sm"
                  placeholder="Everything Summit should know. Be specific — specs, numbers, examples."
                  value={newItem.content}
                  onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addItem}
                  className="btn-primary"
                  disabled={!newItem.title || !newItem.content || saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => { setShowAdd(false); setNewItem({ type: 'PRODUCT', title: '', content: '' }) }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && items.length > 0 && (
          <div className="space-y-8">
            {Object.entries(typeLabels).map(([type, label]) => (
              groupedItems[type]?.length ? (
                <div key={type}>
                  <h2 className="text-sm text-mustard font-medium mb-4 uppercase tracking-wider">
                    {label}
                  </h2>
                  <div className="space-y-3">
                    {groupedItems[type].map((item) => (
                      <div key={item.id} className="card group">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{item.title}</h3>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-white/60 text-sm whitespace-pre-wrap">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <h3 className="font-medium mb-4">Tips for better knowledge</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>- <strong className="text-white/80">Be specific.</strong> Numbers, specs, concrete examples.</li>
              <li>- <strong className="text-white/80">Include context.</strong> When to use it, who it's for.</li>
              <li>- <strong className="text-white/80">Capture objections.</strong> What do customers push back on?</li>
            </ul>
          </div>
        )}

        {activeTab === 'documents' && (
          <>
            <div
              className="card border-dashed mb-6 text-center py-8"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              {uploading ? (
                <div className="text-white/60">Uploading...</div>
              ) : (
                <>
                  <p className="text-white/60 mb-4">
                    Drag and drop a file here, or click to select
                  </p>
                  <label className="btn-primary cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.txt,.md,.docx,.xlsx,.csv"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="text-xs text-white/40 mt-4">
                    PDF, TXT, MD, DOCX, XLSX, CSV - Max 10MB
                  </p>
                </>
              )}
            </div>

            {documents.length === 0 ? (
              <div className="text-center text-white/40 py-8">
                No documents uploaded yet
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="card group flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{doc.filename}</h3>
                      <p className="text-xs text-white/40">
                        {formatFileSize(doc.size)} - {doc.status.toLowerCase()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 border-t border-white/10 pt-8">
              <h3 className="font-medium mb-4">About document uploads</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>- <strong className="text-white/80">Product catalogs.</strong> Specs, pricing, features.</li>
                <li>- <strong className="text-white/80">Sales playbooks.</strong> Objection handling, competitive intel.</li>
                <li>- <strong className="text-white/80">Customer data.</strong> Personas, case studies, testimonials.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
