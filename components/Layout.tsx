import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser, useOrganization, UserButton, OrganizationSwitcher } from '@clerk/nextjs'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useUser()
  const { organization } = useOrganization()

  const navItems = [
    { href: '/prep', label: 'Prep' },
    { href: '/live', label: 'Live' },
    { href: '/knowledge', label: 'Knowledge' },
    { href: '/sessions', label: 'Sessions' },
  ]

  // Don't render nav on public pages
  const isPublicPage = ['/', '/sign-in', '/sign-up'].some(p =>
    router.pathname === p || router.pathname.startsWith(p + '/')
  )

  if (isPublicPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-mustard font-semibold text-lg">
              SummitIQ
            </Link>
            {isSignedIn && organization && (
              <div className="hidden md:flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm transition-colors ${
                      router.pathname === item.href
                        ? 'text-mustard'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoaded && isSignedIn ? (
              <>
                <OrganizationSwitcher
                  appearance={{
                    elements: {
                      rootBox: 'flex',
                      organizationSwitcherTrigger: 'text-white/60 hover:text-white text-sm',
                    }
                  }}
                  afterSelectOrganizationUrl="/prep"
                  afterCreateOrganizationUrl="/prep"
                />
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8',
                    }
                  }}
                />
              </>
            ) : isLoaded ? (
              <Link href="/sign-in" className="btn-primary text-sm">
                Sign In
              </Link>
            ) : null}
          </div>
        </div>
      </nav>

      {isSignedIn && !organization && (
        <div className="bg-mustard/10 border-b border-mustard/30 px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-sm">
              Select or create an organization to get started.
            </span>
            <OrganizationSwitcher
              hidePersonal
              afterSelectOrganizationUrl="/prep"
              afterCreateOrganizationUrl="/prep"
            />
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
