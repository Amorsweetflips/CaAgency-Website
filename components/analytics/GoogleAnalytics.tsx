'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  measurementId?: string
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!gaId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
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
