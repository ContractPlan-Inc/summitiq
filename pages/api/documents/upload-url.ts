import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { getUploadUrl, generateKey, ALLOWED_TYPES, MAX_FILE_SIZE } from '@/lib/s3'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId, orgId } = getAuth(req)

  if (!userId || !orgId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { filename, contentType, size } = req.body

  if (!filename || !contentType) {
    return res.status(400).json({ error: 'Filename and contentType are required' })
  }

  if (!ALLOWED_TYPES.includes(contentType)) {
    return res.status(400).json({
      error: 'File type not allowed. Supported: PDF, TXT, MD, DOCX, XLSX, CSV'
    })
  }

  if (size && size > MAX_FILE_SIZE) {
    return res.status(400).json({
      error: 'File too large. Maximum size is 10MB'
    })
  }

  try {
    const key = generateKey(orgId, filename)
    const uploadUrl = await getUploadUrl(key, contentType)

    return res.status(200).json({
      uploadUrl,
      key,
    })
  } catch (error) {
    console.error('Error generating upload URL:', error)
    return res.status(500).json({ error: 'Failed to generate upload URL' })
  }
}
