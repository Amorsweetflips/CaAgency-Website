'use client'

import { usePathname } from 'next/navigation'

const siteUrl = 'https://caagency.com'

export default function BreadcrumbSchema() {
  const pathname = usePathname()

  // No breadcrumb needed on the homepage
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      item: `${siteUrl}/${segments.slice(0, index + 1).join('/')}`,
    })),
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
