// Pure routing helpers used by the edge middleware (proxy.ts). Kept dependency
// free (no next/server, no Web APIs) so the logic can be unit-tested directly.

import { defaultLocale, locales } from '@/i18n/config'

export const PUBLIC_FILE_PATHS = new Set([
  '/edba0a2c3d98ad29bbfca51f0f73c0a4.txt', // IndexNow ownership key
  '/favicon.ico',
  '/favicon-32.png',
  '/google37e3e1aed99a9c5d.html',
  '/icon-192.png',
  '/icon-512.png',
  '/llms-full.txt',
  '/llms.txt',
  '/robots.txt',
  '/site.webmanifest',
  '/sitemap.xml',
  '/sitemap-video.xml',
])

export const PUBLIC_ASSET_PREFIXES = ['/fonts/', '/images/', '/videos/']

export const SENSITIVE_PROBE_PATTERNS = [
  /^\/\.env(?:\..*)?$/i,
  /^\/\.git(?:\/.*)?$/i,
  /^\/auth\.json$/i,
  /^\/backup\.sql$/i,
  /^\/database\.sql$/i,
  /^\/debug\.log$/i,
  /^\/index\.js$/i,
  /^\/storage\/logs\/laravel\.log$/i,
]

// (site)-only routes that exist English-only (no [locale] variant). A
// locale-prefixed request to any of these must be redirected to the canonical
// English path instead of 404ing.
const NON_DEFAULT_LOCALES = locales.filter((locale) => locale !== defaultLocale).join('|')
const LOCALIZED_SITE_ROUTE = new RegExp(
  `^\\/(${NON_DEFAULT_LOCALES})\\/(blog|case-studies|privacy-policy|terms-of-service|business-license|talents\\/|services\\/|influencer-marketing-|korean-skincare-influencer-marketing)`
)

export function isPublicAsset(pathname: string): boolean {
  return (
    PUBLIC_FILE_PATHS.has(pathname) ||
    PUBLIC_ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  )
}

export function isSensitiveProbe(pathname: string): boolean {
  return SENSITIVE_PROBE_PATTERNS.some((pattern) => pattern.test(pathname))
}

/**
 * If `pathname` is a locale-prefixed (site)-only route, return the canonical
 * English path (locale prefix stripped). Otherwise return null.
 */
export function getLocalizedSiteRouteRedirect(pathname: string): string | null {
  if (!LOCALIZED_SITE_ROUTE.test(pathname)) return null
  return pathname.replace(new RegExp(`^\\/(${NON_DEFAULT_LOCALES})`), '')
}
