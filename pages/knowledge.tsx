import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getKnowledge, saveKnowledge } from '../lib/store'

interface KnowledgeItem {
  id: string
  type: 'product' | 'customer' | 'competitor' | 'playbook'
  title: string
  content: string
}

export default function Knowledge() {
  const [items, setItems] = useState<KnowledgeItem[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getKnowledge()
    // Add IDs if missing (for backwards compatibility)
    const withIds = stored.map((item: any, i: number) => ({
      ...item,
      id: item.id || Date.now().toString() + i,
    }))
    setItems(withIds)
    setLoaded(true)
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    if (loaded) {
      saveKnowledge(items)
    }
  }, [items, loaded])
  const [newItem, setNewItem] = useState({ type: 'product' as const, title: '', content: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const typeLabels = {
    product: 'Products & Services',
    customer: 'Customer Types',
    competitor: 'Competitors',
    playbook: 'Playbooks',
  }

  const typeDescriptions = {
    product: 'Your offerings — specs, features, pricing, use cases, what makes them different.',
    customer: 'Who you sell to — personas, industries, pain points, what they care about.',
    competitor: 'Who you compete with — their strengths, weaknesses, how to position against them.',
    playbook: 'How to sell — objection handling, closing techniques, discovery questions.',
  }

  const typeColors = {
    product: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    customer: 'bg-green-500/20 text-green-400 border-green-500/30',
    competitor: 'bg-red-500/20 text-red-400 border-red-500/30',
    playbook: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }

  const addItem = () => {
    if (!newItem.title || !newItem.content) return
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        ...newItem,
      },
    ])
    setNewItem({ type: 'product', title: '', content: '' })
    setShowAdd(false)
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {} as Record<string, KnowledgeItem[]>)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Knowledge Base</h1>
            <p className="text-white/60">
              Everything SummitIQ knows about your business. The more you add, the better it gets.
            </p>
          </div>
          <button onClick={() => setShowAdd(true)} className="btn-primary">
            + Add Knowledge
          </button>
        </div>

        {items.length === 0 && !showAdd && (
          <div className="card border-dashed mb-8">
            <h2 className="text-lg font-semibold mb-4">Get started</h2>
            <p className="text-white/60 mb-6">
              Add your first piece of knowledge. Start with whatever you know best — a product
              you sell, a customer type you understand, or an objection you hear often.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(typeLabels).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => {
                    setNewItem({ ...newItem, type: type as any })
                    setShowAdd(true)
                  }}
                  className={`text-left p-4 border ${typeColors[type as keyof typeof typeColors]} hover:bg-white/5 transition-colors`}
                >
                  <h3 className="font-medium mb-1">{label}</h3>
                  <p className="text-xs text-white/50">{typeDescriptions[type as keyof typeof typeDescriptions]}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {showAdd && (
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
                  <option value="product">Product / Service</option>
                  <option value="customer">Customer Type</option>
                  <option value="competitor">Competitor</option>
                  <option value="playbook">Playbook</option>
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
                  placeholder="Everything SummitIQ should know about this. Be specific — specs, numbers, examples, context. The more detail, the better the answers."
                  value={newItem.content}
                  onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={addItem} className="btn-primary" disabled={!newItem.title || !newItem.content}>
                  Save
                </button>
                <button onClick={() => { setShowAdd(false); setNewItem({ type: 'product', title: '', content: '' }); }} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {items.length > 0 && (
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

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="font-medium mb-4">Tips for better knowledge</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>→ <strong className="text-white/80">Be specific.</strong> "14% protein, best for high-hydration doughs" beats "high quality flour"</li>
            <li>→ <strong className="text-white/80">Include context.</strong> When to use it, who it's for, what problems it solves</li>
            <li>→ <strong className="text-white/80">Add examples.</strong> Real scenarios where this product/technique/approach worked</li>
            <li>→ <strong className="text-white/80">Capture objections.</strong> What do customers push back on? How do you respond?</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
