'use client'

import { usePathname, useRouter } from 'next/navigation'
import { localeNames, locales, type Locale } from '@/i18n/config'
import { localizeHref, stripLocalePrefix } from '@/lib/i18n/client-paths'

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: string
  label: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <label className="relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground-primary transition-colors hover:bg-black/5 hover:text-foreground-subtle">
      <span className="sr-only">{label}</span>
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <select
        value={locale}
        onChange={(event) => {
          const localizedPath = localizeHref(stripLocalePrefix(pathname), event.target.value)
          router.replace(`${localizedPath}${window.location.search}${window.location.hash}`)
        }}
        aria-label={`${localeNames[locale as Locale]} — ${label}`}
        className="cursor-pointer appearance-none bg-transparent pe-5 outline-none"
      >
        {locales.map((option) => (
          <option key={option} value={option}>
            {localeNames[option]}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute end-3 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 10 5 5 5-5" />
      </svg>
    </label>
  )
}
