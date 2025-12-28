'use server'

import { signIn } from '@/lib/auth-config'

export async function signInWithMicrosoft() {
  await signIn('microsoft-entra-id', { redirectTo: '/admin' })
}
