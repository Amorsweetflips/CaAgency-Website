import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { setRequestLocale } from 'next-intl/server'
import { Anegra, WorkSans, Jost } from '@/lib/fonts'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import MotionProvider from '@/components/providers/MotionProvider'
import SpeculationRules from '@/components/seo/SpeculationRules'
import BackToTop from '@/components/ui/BackToTop'
import './globals.css'

const siteUrl = 'https://caagency.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CA Agency | Full-Service Influencer Marketing Agency in Dubai',
    template: '%s | CA Agency',
  },
  description:
    'CA Agency is a leading influencer marketing agency in Dubai connecting global brands with top creators across Instagram, TikTok, and YouTube. Data-driven campaigns that captivate and convert.',
  keywords: [
    'influencer marketing agency',
    'influencer marketing Dubai',
    'Korean skincare influencer marketing',
    'K-beauty influencer agency',
    'talent management agency',
    'social media marketing',
    'content creators',
    'Instagram marketing',
    'TikTok marketing',
    'YouTube influencers',
    'brand partnerships',
    'creator economy',
    'influencer campaigns',
    'CA Agency',
    'UAE marketing agency',
  ],
  authors: [{ name: 'CA Agency', url: siteUrl }],
  creator: 'CA Agency',
  publisher: 'CA Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon-192.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'CA Agency',
    title: 'CA Agency | Full-Service Influencer Marketing Agency in Dubai',
    description:
      'Connecting global brands with top creators. Data-driven influencer campaigns across Instagram, TikTok, and YouTube that captivate and convert.',
    images: [
      {
        url: '/images/site/og-cover.webp',
        width: 1200,
        height: 630,
        alt: 'CA Agency - Influence • Digital • Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CA Agency | Full-Service Influencer Marketing Agency',
    description:
      'Connecting global brands with top creators. Data-driven influencer campaigns that captivate and convert.',
    images: ['/images/site/og-cover.webp'],
    creator: '@caagency_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'Marketing',
  verification: {
    // TODO: Add your Google Search Console verification code
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    // yandex: 'your-yandex-verification-code',
  },
}

// JSON-LD Structured Data for Organization + ProfessionalService
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Organization'],
  name: 'CA Agency',
  alternateName: 'CA Agency Global',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/images/site/logo.svg`,
    width: 200,
    height: 200,
  },
  image: `${siteUrl}/images/site/logo.svg`,
  description:
    'Full-service influencer marketing agency connecting brands with creators across Instagram, TikTok, and YouTube.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Meydan Grandstand, 6th floor, Meydan Road',
    addressLocality: 'Nad Al Sheba',
    addressRegion: 'Dubai',
    addressCountry: 'AE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+971-58-510-7546',
    contactType: 'customer service',
    email: 'info@caagency.com',
    availableLanguage: ['English', 'Arabic'],
  },
  sameAs: [
    'https://www.instagram.com/caagency/',
    'https://www.tiktok.com/@caagency_',
    'https://www.linkedin.com/company/caagency/',
    'https://www.facebook.com/caagencyglobal/',
  ],
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'South Korea' },
  ],
  knowsAbout: [
    'Influencer Marketing',
    'Social Media Marketing',
    'Content Creation',
    'Brand Partnerships',
    'Talent Management',
  ],
  slogan: 'Influence • Digital • Marketing',
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.0657,
    longitude: 55.2255,
  },
}

// WebSite schema — potentialAction omitted: /talents does not implement ?q= search
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CA Agency',
  url: siteUrl,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Seed the next-intl request-locale store with the default locale at the root,
  // which is shared by the (site) and [locale] groups. Without this, next-intl's
  // getConfig() falls back to reading the x-next-intl-locale header via headers(),
  // which opts EVERY route into dynamic rendering. Seeding here lets the (site)
  // (English-only) routes render statically. The [locale] group is unaffected:
  // its pages resolve messages from the [locale] route param via generateStaticParams,
  // so ar/ko still render with correct localized content (verified at build time).
  // The root <html lang> is statically "en"; the [locale] group sets the correct
  // lang/dir on its own inner <div> for ar/ko.
  setRequestLocale('en')
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${Anegra.variable} ${WorkSans.variable} ${Jost.variable}`}>
      <head>
        <SpeculationRules />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </head>
      <body className="font-work-sans antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <MotionProvider>
          {children}
          <BackToTop />
        </MotionProvider>
        {/* CookieConsent renders inside the (site)/[locale] layouts — it needs
            their NextIntlClientProvider (and RTL direction) for translation. */}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
