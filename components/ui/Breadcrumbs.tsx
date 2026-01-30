'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

const pathLabels: Record<string, string> = {
  about: 'About Us',
  talents: 'Our Talents',
  work: 'Our Work',
  services: 'Services',
  contact: 'Contact',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'business-license': 'Business License',
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show on homepage
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
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
