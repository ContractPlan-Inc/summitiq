import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { deleteObject, getDownloadUrl } from '@/lib/s3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, orgId } = getAuth(req)
  const { id } = req.query

  if (!userId || !orgId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Document ID is required' })
  }

  const org = await prisma.organization.findUnique({
    where: { clerkOrgId: orgId },
  })

  if (!org) {
    return res.status(404).json({ error: 'Organization not found' })
  }

  const document = await prisma.document.findFirst({
    where: { id, organizationId: org.id },
  })

  if (!document) {
    return res.status(404).json({ error: 'Document not found' })
  }

  if (req.method === 'GET') {
    try {
      const downloadUrl = await getDownloadUrl(document.s3Key)
      return res.status(200).json({ ...document, downloadUrl })
    } catch (error) {
      console.error('Error getting download URL:', error)
      return res.status(500).json({ error: 'Failed to get download URL' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await deleteObject(document.s3Key)
      await prisma.document.delete({ where: { id } })
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting document:', error)
      return res.status(500).json({ error: 'Failed to delete document' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
