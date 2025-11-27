import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import type Stripe from 'stripe'

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature'] as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.metadata?.orgId && session.metadata?.plan) {
          await prisma.organization.update({
            where: { id: session.metadata.orgId },
            data: {
              plan: session.metadata.plan as any,
              stripePriceId: session.subscription as string,
            },
          })
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const org = await prisma.organization.findFirst({
          where: { stripeCustomerId: customerId },
        })

        if (org) {
          const isActive = subscription.status === 'active'
          await prisma.organization.update({
            where: { id: org.id },
            data: {
              plan: isActive ? org.plan : 'STARTER',
              stripePriceId: isActive ? subscription.id : null,
            },
          })
        }
        break
      }
    }

    return res.status(200).json({ received: true })
  } catch (error: any) {
    console.error('Webhook handler error:', error)
    return res.status(500).json({ error: error.message })
  }
}
