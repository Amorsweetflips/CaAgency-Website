import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import enMessages from '@/messages/en.json'
import { pickClientMessages } from '@/i18n/client-messages'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CookieConsent from '@/components/ui/CookieConsent'
import { getSiteContent } from '@/lib/site-content/service'
import { FooterContent } from '@/lib/site-content/site-types'

// Frozen at build time so NextIntlClientProvider does not call new Date() per
// request (which opts the page into dynamic rendering). The (site) tree only
// uses relative-time/year formatting client-side, so a build-time `now` is safe.
const BUILD_NOW = new Date()

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // These (site) routes are English-only and excluded from the i18n middleware
  // matcher in proxy.ts. Pin the locale statically so next-intl never reads the
  // x-next-intl-locale request header (which would force dynamic rendering).
  setRequestLocale('en')

  // Import the English bundle at build time instead of getMessages(), which
  // routes through the request-config pipeline and keeps the branch dynamic.
  const footerContent = await getSiteContent<FooterContent>('footer')

  return (
    <NextIntlClientProvider
      locale="en"
      // Only the namespaces client components actually consume — shipping the
      // full catalog serialized ~10KB of server-only strings into every
      // page's RSC payload.
      messages={pickClientMessages(enMessages)}
      timeZone="Asia/Dubai"
      now={BUILD_NOW}
      // `formats` MUST be passed explicitly. If omitted, the server provider
      // calls getFormats() -> getConfig() -> requestLocale -> headers(), which
      // opts every (site) page into dynamic rendering. The project uses no
      // custom ICU formats, so an empty object is correct.
      formats={{}}
    >
      <Header />
      <Breadcrumbs />
      <main id="main-content">{children}</main>
      <Footer content={footerContent} />
      <CookieConsent />
    </NextIntlClientProvider>
  )
}
