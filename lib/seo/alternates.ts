const baseUrl = 'https://caagency.com'

/**
 * Canonical + hreflang alternates for routes under app/[locale]/.
 * The default locale (en) is served without a URL prefix
 * (next-intl localePrefix: 'as-needed'), so its canonical must never
 * include /en. x-default points at the unprefixed English URL.
 *
 * @param locale current route locale ('en' | 'ar' | 'ko')
 * @param path   route path with leading slash, e.g. '/work' ('' for home)
 */
export function alternatesFor(locale: string, path: string = '') {
  const url = (l: string) => (l === 'en' ? `${baseUrl}${path}` || baseUrl : `${baseUrl}/${l}${path}`)
  return {
    canonical: url(locale),
    languages: {
      'x-default': url('en'),
      en: url('en'),
      ar: url('ar'),
      ko: url('ko'),
    },
  }
}
