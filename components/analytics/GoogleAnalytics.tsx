'use client'

import { useSyncExternalStore } from 'react'
import Script from 'next/script'
import { CONSENT_CHANGE_EVENT, getStoredConsent } from '@/lib/consent'

interface GoogleAnalyticsProps {
  measurementId?: string
}

function subscribeToConsent(onChange: () => void) {
  // React never calls subscribe during SSR, but non-DOM test environments can.
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  // gtag only loads after explicit consent (GDPR) — this also keeps ~45KB gz
  // of analytics JS off the main thread for declining visitors. The server
  // snapshot is 'pending', so SSR renders null and acceptance (stored or via
  // the banner's consent event) mounts the scripts client-side.
  const consent = useSyncExternalStore(subscribeToConsent, getStoredConsent, () => 'pending' as const)

  if (!gaId || consent !== 'accepted') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Helper function to track events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track form submissions
export function trackFormSubmission(formName: string) {
  trackEvent('form_submission', 'engagement', formName)
}

// Track contact form conversion
export function trackContactConversion() {
  trackEvent('generate_lead', 'conversion', 'contact_form')
}

// Track page views (for SPA navigation)
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
