import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, isRtlLocale } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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

  // Get the direction for RTL languages (Arabic)
  const dir = isRtlLocale(locale) ? 'rtl' : 'ltr';

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <div lang={locale} dir={dir}>
      <NextIntlClientProvider messages={messages}>
        <Header />
        <Breadcrumbs />
        <main id="main-content">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
