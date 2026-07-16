'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getStoredConsent, storeConsent, type ConsentStatus } from '@/lib/consent'

const EXIT_DURATION_MS = 300

export interface CookieConsentLabels {
  title: string
  description: string
  learnMore: string
  decline: string
  acceptAll: string
}

export default function CookieConsent({ labels }: { labels: CookieConsentLabels }) {
  // Rendered inside the locale layouts (not the root layout) so the banner is
  // translated on /ar and /ko and inherits their text direction — the
  // 'cookies' namespace must stay in CLIENT_NAMESPACES (i18n/client-messages).
  const [status, setStatus] = useState<ConsentStatus>(getStoredConsent)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (status !== 'pending') return
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [status])

  useEffect(() => {
    const handleMenu = (event: Event) => {
      setMenuOpen((event as CustomEvent<{ open: boolean }>).detail.open)
    }
    window.addEventListener('caagency:mobile-menu', handleMenu)
    return () => window.removeEventListener('caagency:mobile-menu', handleMenu)
  }, [])

  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
    }
  }, [])

  const handleConsent = (consent: 'accepted' | 'declined') => {
    // Persist and broadcast immediately — the exit animation is cosmetic and
    // must not gate the decision (navigating away within 300ms would
    // otherwise lose the click). The timer only finishes the dismissal and
    // is cleared on unmount so it can't set state on a dead component.
    storeConsent(consent)
    setIsAnimatingOut(true)
    exitTimerRef.current = setTimeout(() => {
      setStatus(consent)
      setIsVisible(false)
      setIsAnimatingOut(false)
    }, EXIT_DURATION_MS)
  }

  if (status !== 'pending' || !isVisible || menuOpen) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label={labels.title}
      className={cn(
        // Logical end-* offsets: the banner follows the layout's text
        // direction, so it sits bottom-left on the RTL Arabic pages.
        'fixed bottom-4 end-4 md:bottom-8 md:end-8 z-[9999]',
        'w-[calc(100%-2rem)] max-w-[400px]',
        'animate-consent-in motion-reduce:animate-none',
        'transition-all duration-300 ease-in',
        isAnimatingOut && 'translate-y-6 opacity-0'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          'bg-background-dark text-foreground-white',
          'rounded-[20px] p-6 md:p-7',
          'shadow-[0_24px_60px_rgba(0,0,0,0.35)]',
          'ring-1 ring-white/10'
        )}
      >
        {/* Soft top-edge highlight so the dark card reads as a lit surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        <h3 className="font-anegra text-[22px] leading-[1.2] tracking-[0.5px] mb-2.5">
          {labels.title}
        </h3>

        <p className="font-work-sans text-[14px] leading-[1.65] text-white/60 mb-6">
          {labels.description}{' '}
          {/* Legal pages are English-only (site) routes — plain next/link,
              not the locale-aware one. */}
          <Link
            href="/privacy-policy"
            prefetch={false}
            className="text-white underline decoration-white/30 underline-offset-[3px] transition-colors hover:decoration-white"
          >
            {labels.learnMore}
          </Link>
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleConsent('declined')}
            className={cn(
              'flex-1 font-jost font-medium text-[14px]',
              'px-4 py-3 rounded-full',
              'border border-white/20 text-white/70',
              'hover:border-white/50 hover:text-white',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60',
              'transition-colors duration-200'
            )}
          >
            {labels.decline}
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className={cn(
              'flex-1 font-jost font-medium text-[14px]',
              'px-4 py-3 rounded-full',
              'bg-foreground-white text-background-dark',
              'hover:bg-white/85',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60',
              'transition-colors duration-200'
            )}
          >
            {labels.acceptAll}
          </button>
        </div>
      </div>
    </div>
  )
}
