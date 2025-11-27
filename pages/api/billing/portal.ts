import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, orgId } = getAuth(req)
    if (!userId || !orgId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const org = await prisma.organization.findUnique({
      where: { clerkOrgId: orgId },
    })

    if (!org?.stripeCustomerId) {
      return res.status(400).json({ error: 'No billing setup' })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: org.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/settings`,
    })

    return res.status(200).json({ url: session.url })
  } catch (error: any) {
    console.error('Portal error:', error)
    return res.status(500).json({ error: error.message })
  }
}
