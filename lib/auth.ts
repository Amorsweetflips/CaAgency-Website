import { auth } from '@/lib/auth-config'
import { redirect } from 'next/navigation'

export async function getAuthSession() {
  const session = await auth()
  return session
}

// For API routes: throws an error that callers catch
export async function requireAuth() {
  const session = await getAuthSession()

  if (!session || !session.user?.email?.endsWith('@caagency.com')) {
    throw new Error('Unauthorized')
  }

  return session
}

// For page components: redirects to login
export async function requireAuthWithRedirect() {
  const session = await getAuthSession()

  if (!session || !session.user?.email?.endsWith('@caagency.com')) {
    redirect('/admin/login')
  }

  return session
}
