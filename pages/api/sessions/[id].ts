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

  const session = await prisma.session.findFirst({
    where: { id: id as string, organizationId: org.id },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  })

  if (!session) {
    return res.status(404).json({ error: 'Session not found' })
  }

  if (req.method === 'GET') {
    return res.status(200).json(session)
  }

  if (req.method === 'PATCH') {
    const { transcript, summary, endedAt } = req.body

    const updated = await prisma.session.update({
      where: { id: id as string },
      data: {
        ...(transcript && { transcript }),
        ...(summary && { summary }),
        ...(endedAt && { endedAt: new Date(endedAt) }),
      },
    })

    return res.status(200).json(updated)
  }

  if (req.method === 'DELETE') {
    await prisma.session.delete({
      where: { id: id as string },
    })
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
