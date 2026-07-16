'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { localizeHref, stripLocalePrefix } from '@/lib/i18n/client-paths'

export default function IntentPrefetchLink({
  href,
  locale,
  children,
  className,
  activeClassName,
  inactiveClassName,
}: {
  href: string
  locale: string
  children: ReactNode
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}) {
  const [intent, setIntent] = useState(false)
  const pathname = stripLocalePrefix(usePathname())
  const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={localizeHref(href, locale)}
      prefetch={intent ? null : false}
      onMouseEnter={() => setIntent(true)}
      onFocus={() => setIntent(true)}
      aria-current={active ? 'page' : undefined}
      className={cn(className, active ? activeClassName : inactiveClassName)}
    >
      {children}
    </Link>
  )
}
