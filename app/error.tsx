'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-section-x">
      <div className="text-center max-w-[600px]">
        <h1 className="font-anegra text-[120px] tablet:text-[80px] mobile:text-[60px] text-accent-red leading-none mb-4">
          Error
        </h1>
        <Heading as="h2" color="white" className="mb-6 text-[32px] tablet:text-[26px] mobile:text-[22px]">
          Something went wrong
        </Heading>
        <p className="text-foreground-white/70 text-[16px] leading-[26px] mb-10">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="dark">
            Try again
          </Button>
          <Link href="/">
            <Button variant="dark">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
