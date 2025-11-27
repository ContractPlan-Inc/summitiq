import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './db'

export async function getCurrentUser() {
  const { userId, orgId } = await auth()

  if (!userId) {
    return null
  }

  let user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: { organization: true },
  })

  // Auto-create user if doesn't exist
  if (!user && orgId) {
    const clerkUser = await currentUser()
    const org = await getOrCreateOrg(orgId)

    user = await prisma.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
        name: clerkUser?.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : null,
        organizationId: org.id,
        role: 'MEMBER',
      },
      include: { organization: true },
    })
  }

  return user
}

export async function getOrCreateOrg(clerkOrgId: string) {
  let org = await prisma.organization.findUnique({
    where: { clerkOrgId },
  })

  if (!org) {
    // Create with temp name - will be updated via webhook
    org = await prisma.organization.create({
      data: {
        clerkOrgId,
        name: 'New Organization',
        slug: clerkOrgId.toLowerCase(),
      },
    })
  }

  return org
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireOrg() {
  const user = await getCurrentUser()
  if (!user?.organization) {
    throw new Error('Organization required')
  }
  return { user, org: user.organization }
}
