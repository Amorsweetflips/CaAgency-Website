import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // These pages are English-only (not processed by i18n middleware)
  // Explicitly set the locale for next-intl to work correctly
  setRequestLocale('en')
  
  // Get messages for the default locale (English)
  const messages = await getMessages({ locale: 'en' })

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Header />
      <Breadcrumbs />
      <main id="main-content">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
