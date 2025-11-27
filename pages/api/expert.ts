import type { NextApiRequest, NextApiResponse } from 'next'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt, KnowledgeItem, ConversationContext } from '../../lib/expert'

const anthropic = new Anthropic()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      message,
      knowledge = [],
      context = { mode: 'live' },
      conversationHistory = [],
    } = req.body as {
      message: string
      knowledge?: KnowledgeItem[]
      context?: ConversationContext
      conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
    }

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const systemPrompt = buildSystemPrompt(knowledge, context)

    // Build message history
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...conversationHistory,
      { role: 'user', content: message },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: context.mode === 'live' ? 300 : 1024,
      system: systemPrompt,
      messages,
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return res.status(500).json({ error: 'Unexpected response type' })
    }

    return res.status(200).json({
      response: content.text,
      usage: response.usage,
    })
  } catch (error: any) {
    console.error('Expert API error:', error)

    if (error.status === 401) {
      return res.status(500).json({
        error: 'API key not configured. Set ANTHROPIC_API_KEY environment variable.',
      })
    }

    return res.status(500).json({
      error: error.message || 'An error occurred',
    })
  }
}
