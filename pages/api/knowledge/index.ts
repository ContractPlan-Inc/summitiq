import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, orgId } = getAuth(req)

  if (!userId || !orgId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Get or create org
  let org = await prisma.organization.findUnique({
    where: { clerkOrgId: orgId },
  })

  if (!org) {
    org = await prisma.organization.create({
      data: {
        clerkOrgId: orgId,
        name: 'Organization',
        slug: orgId.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      },
    })
  }

  if (req.method === 'GET') {
    const items = await prisma.knowledgeItem.findMany({
      where: { organizationId: org.id },
      orderBy: { createdAt: 'desc' },
    })
    return res.status(200).json(items)
  }

  if (req.method === 'POST') {
    const { type, title, content } = req.body

    if (!type || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const item = await prisma.knowledgeItem.create({
      data: {
        organizationId: org.id,
        type: type.toUpperCase(),
        title,
        content,
        source: 'MANUAL',
      },
    })
    return res.status(201).json(item)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
