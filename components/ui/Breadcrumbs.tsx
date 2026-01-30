'use client'

import { Link, usePathname } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

interface BreadcrumbItem {
  label: string
  href: string
}

// Fallback labels for paths not in translations
const pathLabels: Record<string, string> = {
  about: 'About Us',
  talents: 'Our Talents',
  work: 'Our Work',
  services: 'Services',
  contact: 'Contact',
  blog: 'Blog',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'business-license': 'Business License',
  'influencer-marketing-dubai': 'Influencer Marketing Dubai',
  'influencer-marketing-uae': 'Influencer Marketing UAE',
  'influencer-marketing-saudi-arabia': 'Influencer Marketing Saudi Arabia',
  'influencer-marketing-gcc': 'Influencer Marketing GCC',
  'influencer-marketing-korea': 'Influencer Marketing Korea',
  'influencer-marketing-usa': 'Influencer Marketing USA',
  'influencer-marketing-uk': 'Influencer Marketing UK',
  'influencer-marketing-canada': 'Influencer Marketing Canada',
  'influencer-marketing-australia': 'Influencer Marketing Australia',
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('breadcrumbs')

  // Don't show on homepage
  if (pathname === '/' || pathname === '') return null

  // Filter out locale segments from the path
  const segments = pathname
    .split('/')
    .filter((segment) => segment && !routing.locales.includes(segment as typeof routing.locales[number]))

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('home'), href: '/' },
    ...segments.map((segment, index) => ({
      label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: '/' + segments.slice(0, index + 1).join('/'),
    })),
  ]

  // JSON-LD for breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://caagency.com${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="bg-background-dark py-4 px-section-x border-b border-foreground-white/10"
      >
        <div className="max-w-container mx-auto">
          <ol className="flex items-center gap-2 text-[14px]">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-foreground-white/40">/</span>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-foreground-white/60">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-foreground-white/80 hover:text-foreground-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}
