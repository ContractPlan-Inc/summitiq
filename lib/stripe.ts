import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

export const PLANS = {
  STARTER: {
    name: 'Starter',
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    price: 99,
    users: 5,
    features: ['5 users', 'Manual knowledge upload', 'Prep & Live modes', 'Email support'],
  },
  PRO: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    price: 299,
    users: 25,
    features: ['25 users', 'Document uploads', 'CRM integration', 'Session analytics', 'Priority support'],
  },
  BUSINESS: {
    name: 'Business',
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || '',
    price: 799,
    users: 100,
    features: ['100 users', 'All integrations', 'Custom playbooks', 'API access', 'Dedicated support'],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    priceId: '',
    price: null,
    users: null,
    features: ['Unlimited users', 'Custom integrations', 'SSO/SAML', 'On-premise option', 'SLA'],
  },
} as const
