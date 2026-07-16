import type { Metadata, Viewport } from 'next'

const siteUrl = 'https://caagency.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Global Beauty Influencer Marketing Agency | CA Agency',
    template: '%s',
  },
  description:
    'CA Agency connects beauty and skincare brands with creators across the USA and global markets, managing strategy, content, amplification, and reporting.',
  keywords: [
    'global influencer marketing agency',
    'beauty influencer marketing agency',
    'influencer marketing agency USA',
    'Korean skincare influencer marketing',
    'K-beauty influencer agency',
    'talent management agency',
    'creator marketing agency',
    'Instagram marketing',
    'TikTok marketing',
    'YouTube influencers',
    'CA Agency',
  ],
  authors: [{ name: 'CA Agency', url: siteUrl }],
  creator: 'CA Agency',
  publisher: 'CA Agency',
  formatDetection: { email: false, address: false, telephone: false },
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
    title: 'Global Beauty Influencer Marketing Agency | CA Agency',
    description:
      'Beauty and skincare creator campaigns across the USA and global markets, from strategy and production to amplification and reporting.',
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
    title: 'Global Beauty Influencer Marketing Agency | CA Agency',
    description: 'Creator campaigns for beauty and skincare brands across the USA and global markets.',
    images: ['/images/site/og-cover.webp'],
    creator: '@caagency',
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
  alternates: { canonical: siteUrl },
  category: 'Marketing',
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      undefined,
  },
}

export const organizationJsonLd = {
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
    'Global influencer marketing agency connecting beauty and skincare brands with creators across the USA and international markets.',
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
    availableLanguage: ['English', 'Arabic', 'Korean'],
  },
  sameAs: [
    'https://www.instagram.com/caagency/',
    'https://www.tiktok.com/@caagency/',
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
    'Beauty Marketing',
    'Social Media Marketing',
    'Content Creation',
    'Brand Partnerships',
    'Talent Management',
  ],
  slogan: 'Influence • Digital • Marketing',
  priceRange: '$$',
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CA Agency',
  url: siteUrl,
}
