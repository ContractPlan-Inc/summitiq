import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { stripe, PLANS } from '@/lib/stripe'
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

    const { plan } = req.body
    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return res.status(400).json({ error: 'Invalid plan' })
    }

    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig.priceId) {
      return res.status(400).json({ error: 'Contact sales for Enterprise' })
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

    // Create or get Stripe customer
    let customerId = org.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { orgId: org.id, clerkOrgId: orgId },
      })
      customerId = customer.id
      await prisma.organization.update({
        where: { id: org.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/settings?canceled=true`,
      metadata: { orgId: org.id, plan },
    })

    return res.status(200).json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return res.status(500).json({ error: error.message })
  }
}
