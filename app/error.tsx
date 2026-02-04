'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6">
      <div className="text-center max-w-[600px]">
        <h1 className="text-[120px] md:text-[80px] text-[#FF3333] leading-none mb-4 font-bold">
          Error
        </h1>
        <h2 className="text-white mb-6 text-[32px] md:text-[26px] font-semibold">
          Something went wrong
        </h2>
        <p className="text-white/70 text-[16px] leading-[26px] mb-10">
          We encountered an unexpected error. Please try again or contact us if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
