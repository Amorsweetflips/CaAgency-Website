import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get messages for the default locale (English)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <Breadcrumbs />
      <main id="main-content">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
