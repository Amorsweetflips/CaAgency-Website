'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const session = await res.json()
        if (session?.user?.email?.endsWith('@caagency.com')) {
          router.push('/admin')
        }
      } catch (error) {
        // Not authenticated, stay on login page
      }
    }
    checkAuth()
  }, [router])

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('azure-ad', {
        callbackUrl: '/admin',
        redirect: false,
      })

      if (result?.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        console.error('Sign in failed:', result?.error)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  }

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
          <Button
            onClick={handleSignIn}
            variant="primary"
            className="w-full"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in with Microsoft'}
          </Button>

          {isLoading && (
            <p className="text-center text-sm text-foreground-white/70 mt-4">
              Redirecting to Microsoft login...
            </p>
          )}
        </div>

        <p className="text-center text-xs text-foreground-white/50 mt-6">
          Only @caagency.com email addresses are authorized to access this panel.
        </p>
      </div>
    </div>
  )
}
