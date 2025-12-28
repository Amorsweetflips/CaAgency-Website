'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for error in URL params
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(errorParam === 'AccessDenied' 
        ? 'Access denied. Only @caagency.com emails are allowed.' 
        : `Authentication error: ${errorParam}`)
    }

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
  }, [router, searchParams])

  const handleSignIn = () => {
    setIsLoading(true)
    setError(null)
    // Redirect directly to the Microsoft OAuth authorization endpoint
    window.location.href = '/api/auth/signin/microsoft-entra-id?callbackUrl=/admin'
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
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <Button
            onClick={handleSignIn}
            variant="primary"
            className="w-full"
            type="button"
            disabled={isLoading}
          >
            {isLoading ? 'Redirecting...' : 'Sign in with Microsoft'}
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
