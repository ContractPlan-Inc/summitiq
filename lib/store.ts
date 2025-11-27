// Simple client-side store for knowledge base
// In production, this would be a database

import { KnowledgeItem } from './expert'

const STORAGE_KEY = 'summitiq_knowledge'

export function getKnowledge(): KnowledgeItem[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveKnowledge(items: KnowledgeItem[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('Failed to save knowledge:', e)
  }
}

export function addKnowledgeItem(item: Omit<KnowledgeItem, 'id'>): KnowledgeItem[] {
  const items = getKnowledge()
  const newItem = { ...item, id: Date.now().toString() } as KnowledgeItem & { id: string }
  const updated = [...items, newItem]
  saveKnowledge(updated)
  return updated
}

export function removeKnowledgeItem(id: string): KnowledgeItem[] {
  const items = getKnowledge()
  const updated = items.filter((item: any) => item.id !== id)
  saveKnowledge(updated)
  return updated
}
