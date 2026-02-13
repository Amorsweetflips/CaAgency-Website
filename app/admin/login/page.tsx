import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth-config'
import { signInWithMicrosoft } from './actions'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>
}) {
  // Check if already authenticated
  const session = await auth()
  if (session?.user?.email?.endsWith('@caagency.com')) {
    redirect('/admin')
  }

  const params = await searchParams
  const error = params.error

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-section-x">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Heading as="h1" color="white" className="mb-4">
            Admin Login
          </Heading>
          <p className="text-foreground-white/70 text-sm">
            Sign in with your @caagency.com Microsoft account to access the admin panel.
          </p>
        </div>

        <div className="bg-background-dark border border-foreground-white/20 rounded-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error === 'AccessDenied'
                ? 'Access denied. Only @caagency.com emails are allowed.'
                : `Authentication error: ${error}`}
            </div>
          )}

          <form action={signInWithMicrosoft}>
            <Button
              variant="primary"
              className="w-full"
              type="submit"
            >
              Sign in with Microsoft
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-foreground-white/50 mt-6">
          Only @caagency.com email addresses are authorized to access this panel.
        </p>
      </div>
    </div>
  )
}
