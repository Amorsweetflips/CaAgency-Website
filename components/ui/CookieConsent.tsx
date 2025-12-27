'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const COOKIE_CONSENT_KEY = 'ca-agency-cookie-consent'

type ConsentStatus = 'pending' | 'accepted' | 'declined'

export default function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>('pending')
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored === 'accepted' || stored === 'declined') {
      setStatus(stored)
    } else {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = (consent: 'accepted' | 'declined') => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, consent)
      setStatus(consent)
      setIsVisible(false)
      setIsAnimatingOut(false)
    }, 300)
  }

  if (status !== 'pending' || !isVisible) {
    return null
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]',
        'w-[calc(100%-2rem)] max-w-[380px]',
        'transition-all duration-300 ease-out',
        isAnimatingOut
          ? 'translate-y-4 opacity-0'
          : 'translate-y-0 opacity-100'
      )}
    >
      <div
        className={cn(
          'bg-background-dark/95 backdrop-blur-md',
          'border border-divider-darkMid rounded-[20px]',
          'p-5 md:p-6',
          'shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
        )}
      >
        {/* Cookie Icon */}
        <div className="w-10 h-10 bg-accent-red/10 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-5 h-5 text-accent-red"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-.34-.02-.67-.05-1-.4.2-.83.35-1.29.45-.3.06-.6.1-.91.1-2.21 0-4-1.79-4-4 0-.31.04-.61.1-.91.1-.46.25-.89.45-1.29-.33-.03-.66-.05-1-.05-.34 0-.67-.02-1-.05-.46.1-.89.25-1.29.45-.3.06-.6.1-.91.1-2.21 0-4-1.79-4-4 0-.31.04-.61.1-.91.1-.46.25-.89.45-1.29A10.1 10.1 0 0012 2zm-2 4a1 1 0 100 2 1 1 0 000-2zm-3 4a1 1 0 100 2 1 1 0 000-2zm8 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-5 3a1 1 0 100 2 1 1 0 000-2zm-2 3a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-anegra text-[18px] text-foreground-white mb-2 tracking-[0.5px]">
          We use cookies
        </h3>

        {/* Text */}
        <p className="font-work-sans text-[14px] text-foreground-mutedOnDark leading-[1.6] mb-5">
          We use cookies to enhance your browsing experience and analyze site traffic.{' '}
          <Link
            href="/privacy-policy"
            className="text-accent-red hover:underline"
          >
            Learn more
          </Link>
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent('declined')}
            className={cn(
              'flex-1 font-jost font-medium text-[14px]',
              'px-4 py-2.5 rounded-full',
              'border border-foreground-mutedOnDark text-foreground-white',
              'hover:border-foreground-white hover:bg-foreground-white/5',
              'transition-all duration-200'
            )}
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className={cn(
              'flex-1 font-jost font-medium text-[14px]',
              'px-4 py-2.5 rounded-full',
              'bg-accent-red text-foreground-white',
              'hover:bg-accent-red/90',
              'transition-all duration-200'
            )}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
