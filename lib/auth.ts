import { auth } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export async function getAuthSession() {
  const session = await auth()
  return session
}

export async function requireAuth() {
  const session = await getAuthSession()

  if (!session || !session.user?.email?.endsWith('@caagency.com')) {
    redirect('/admin/login')
  }

  return session
}
