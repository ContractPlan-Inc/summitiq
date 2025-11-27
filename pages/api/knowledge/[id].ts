import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, orgId } = getAuth(req)
  const { id } = req.query

  if (!userId || !orgId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const org = await prisma.organization.findUnique({
    where: { clerkOrgId: orgId },
  })

  if (!org) {
    return res.status(404).json({ error: 'Organization not found' })
  }

  // Verify item belongs to org
  const item = await prisma.knowledgeItem.findFirst({
    where: { id: id as string, organizationId: org.id },
  })

  if (!item) {
    return res.status(404).json({ error: 'Item not found' })
  }

  if (req.method === 'PUT') {
    const { type, title, content } = req.body
    const updated = await prisma.knowledgeItem.update({
      where: { id: id as string },
      data: {
        type: type?.toUpperCase(),
        title,
        content,
        updatedAt: new Date(),
      },
    })
    return res.status(200).json(updated)
  }

  if (req.method === 'DELETE') {
    await prisma.knowledgeItem.delete({
      where: { id: id as string },
    })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
