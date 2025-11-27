import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { useOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/router'

const PLANS = [
  { id: 'STARTER', name: 'Starter', price: 99, users: 5, features: ['5 users', 'Manual upload', 'Prep & Live'] },
  { id: 'PRO', name: 'Pro', price: 299, users: 25, features: ['25 users', 'Doc uploads', 'CRM integration'] },
  { id: 'BUSINESS', name: 'Business', price: 799, users: 100, features: ['100 users', 'All integrations', 'API access'] },
]

export default function Settings() {
  const { organization, isLoaded } = useOrganization()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (plan: string) => {
    setLoading(plan)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  const handlePortal = async () => {
    setLoading('portal')
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  if (!isLoaded) {
    return <Layout><div className="p-8">Loading...</div></Layout>
  }

  if (!organization) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="card text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Organization Required</h2>
            <p className="text-white/60">Select an organization to manage settings.</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-white/60 mb-8">Manage your organization and billing.</p>

        {router.query.success && (
          <div className="bg-green-500/20 border border-green-500/40 text-green-200 px-4 py-3 mb-6">
            Subscription activated successfully!
          </div>
        )}

        <div className="card mb-8">
          <h2 className="text-lg font-semibold mb-4">Organization</h2>
          <div className="text-white/60">
            <p><strong className="text-white">Name:</strong> {organization.name}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Plans</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div key={plan.id} className="card">
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <p className="text-2xl font-bold text-mustard mb-2">${plan.price}<span className="text-sm text-white/40">/mo</span></p>
                <p className="text-sm text-white/60 mb-4">Up to {plan.users} users</p>
                <ul className="text-sm text-white/60 space-y-1 mb-4">
                  {plan.features.map((f, i) => <li key={i}>→ {f}</li>)}
                </ul>
                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loading !== null}
                  className="btn-primary w-full text-sm"
                >
                  {loading === plan.id ? 'Loading...' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Billing</h2>
          <p className="text-white/60 mb-4">Manage your subscription, payment methods, and invoices.</p>
          <button onClick={handlePortal} disabled={loading !== null} className="btn-secondary">
            {loading === 'portal' ? 'Loading...' : 'Manage Billing'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
