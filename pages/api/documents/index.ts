import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, orgId } = getAuth(req)

  if (!userId || !orgId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Get or create organization
  let org = await prisma.organization.findUnique({
    where: { clerkOrgId: orgId },
  })

  if (!org) {
    org = await prisma.organization.create({
      data: { clerkOrgId: orgId, name: 'My Organization' },
    })
  }

  if (req.method === 'GET') {
    const documents = await prisma.document.findMany({
      where: { organizationId: org.id },
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json(documents)
  }

  if (req.method === 'POST') {
    const { filename, s3Key, contentType, size } = req.body

    if (!filename || !s3Key) {
      return res.status(400).json({ error: 'Filename and s3Key are required' })
    }

    const document = await prisma.document.create({
      data: {
        organizationId: org.id,
        filename,
        s3Key,
        contentType: contentType || 'application/octet-stream',
        size: size || 0,
        status: 'PENDING',
      },
    })

    return res.status(201).json(document)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
