import type { NextApiRequest, NextApiResponse } from 'next'
import Anthropic from '@anthropic-ai/sdk'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { buildSystemPrompt, ConversationContext } from '@/lib/expert'

const anthropic = new Anthropic()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, orgId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { message, context = { mode: 'live' }, conversationHistory = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Get knowledge from database if org exists
    let knowledge: any[] = []
    if (orgId) {
      const org = await prisma.organization.findUnique({
        where: { clerkOrgId: orgId },
      })

      if (org) {
        const items = await prisma.knowledgeItem.findMany({
          where: { organizationId: org.id },
        })
        knowledge = items.map((item: { type: string; title: string; content: string }) => ({
          type: item.type.toLowerCase(),
          title: item.title,
          content: item.content,
        }))
      }
    }

    const systemPrompt = buildSystemPrompt(knowledge, context as ConversationContext)

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
