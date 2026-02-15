'use client'

import { usePathname } from 'next/navigation'

export default function BreadcrumbSchema() {
  const pathname = usePathname()

  // Don't render on homepage
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  // Build breadcrumb items
  const itemListElement = segments.map((segment, index) => {
    const url = `https://caagency.com/${segments.slice(0, index + 1).join('/')}`
    return {
      '@type': 'ListItem',
      position: index + 2, // Homepage is 1
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      item: url,
    }
  })

  // Add Homepage as first item
  itemListElement.unshift({
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: 'https://caagency.com',
  })

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
