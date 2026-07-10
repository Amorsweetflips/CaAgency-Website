import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, isRtlLocale } from '@/i18n/routing';
import { pickClientMessages } from '@/i18n/client-messages';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CookieConsent from '@/components/ui/CookieConsent';
import { getSiteContent } from '@/lib/site-content/service';
import { FooterContent } from '@/lib/site-content/site-types';

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Bind the request store to this segment's locale. Without it, the root
  // layout's setRequestLocale('en') leaks down and getMessages()/client
  // components (Header nav, FAQ, Testimonials) render English on /ar and /ko
  // even though the translations exist.
  setRequestLocale(locale);

  // Get the direction for RTL languages (Arabic)
  const dir = isRtlLocale(locale) ? 'rtl' : 'ltr';

  // Get messages for the current locale
  const messages = await getMessages();
  const footerContent = await getSiteContent<FooterContent>('footer');

  return (
    <div lang={locale} dir={dir}>
      {/* Client components only get the namespaces they consume — the full
          ar/ko catalogs added ~15-19KB to every page's RSC payload. */}
      <NextIntlClientProvider messages={pickClientMessages(messages)}>
        <Header />
        <Breadcrumbs />
        <main id="main-content">{children}</main>
        <Footer content={footerContent} />
        <CookieConsent />
      </NextIntlClientProvider>
    </div>
  );
}
