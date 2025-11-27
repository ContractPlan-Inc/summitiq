import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, orgId } = getAuth(req)

  if (!userId || !orgId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const org = await prisma.organization.findUnique({
    where: { clerkOrgId: orgId },
  })

  if (!org) {
    return res.status(404).json({ error: 'Organization not found' })
  }

  // Get user
  let user = await prisma.user.findFirst({
    where: { clerkUserId: userId, organizationId: org.id },
  })

  if (!user) {
    // Auto-create user
    user = await prisma.user.create({
      data: {
        clerkUserId: userId,
        email: '',
        organizationId: org.id,
        role: 'MEMBER',
      },
    })
  }

  if (req.method === 'GET') {
    const { limit = '20', offset = '0' } = req.query

    const sessions = await prisma.session.findMany({
      where: { organizationId: org.id },
      orderBy: { startedAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    })

    return res.status(200).json(sessions)
  }

  if (req.method === 'POST') {
    const { mode, context } = req.body

    if (!mode || !['PREP', 'LIVE'].includes(mode.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid mode' })
    }

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        organizationId: org.id,
        mode: mode.toUpperCase(),
        context: context || {},
      },
    })

    return res.status(201).json(session)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
