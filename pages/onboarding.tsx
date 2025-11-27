import React from 'react'
import { useOrganization, CreateOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Onboarding() {
  const { organization, isLoaded } = useOrganization()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && organization) {
      router.push('/prep')
    }
  }, [isLoaded, organization, router])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to SummitIQ</h1>
        <p className="text-white/60">
          Create your organization to get started. Your team's knowledge base
          and sessions will live here.
        </p>
      </div>

      <CreateOrganization
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-white/5 border border-white/10',
          }
        }}
        afterCreateOrganizationUrl="/prep"
      />
    </div>
  )
}
