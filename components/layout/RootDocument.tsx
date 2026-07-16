import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { BotIdClient } from 'botid/client'
import { Anegra, WorkSans, Jost } from '@/lib/fonts'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/root-metadata'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import RevealObserver from '@/components/providers/RevealObserver'
import BackToTop from '@/components/ui/BackToTop'

/* eslint-disable @next/next/no-head-element -- This component is the shared shell used only by App Router root layouts. */

type RootDocumentProps = {
  children: React.ReactNode
  locale: string
  dir: 'ltr' | 'rtl'
  includePublicSchema?: boolean
}

export default function RootDocument({
  children,
  locale,
  dir,
  includePublicSchema = true,
}: RootDocumentProps) {
  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${Anegra.variable} ${WorkSans.variable} ${Jost.variable}`}
    >
      <head>
        {includePublicSchema && (
          <>
            <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
            <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
          </>
        )}
      </head>
      <body className="font-work-sans antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {process.env.VERCEL && (
          <BotIdClient protect={[{ path: '/api/contact', method: 'POST' }]} />
        )}
        {children}
        <BackToTop />
        <RevealObserver />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
