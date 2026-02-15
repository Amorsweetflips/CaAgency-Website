import { NextResponse, NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// next-intl middleware for locale routing
const intlMiddleware = createMiddleware(routing)

// Secondary domains that should redirect to primary
const SECONDARY_DOMAINS = [
  'www.caagency.com',
  'caagency.co.uk',
  'www.caagency.co.uk',
  'caagency.ae',
  'www.caagency.ae',
  'caagency.nl',
  'www.caagency.nl',
]

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // 1. Domain redirects at the edge (ultra-fast)
  if (SECONDARY_DOMAINS.includes(hostname)) {
    const url = new URL(request.url)
    url.hostname = 'caagency.com'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  // 2. Edge Config: check for maintenance mode
  try {
    const maintenance = await get<boolean>('maintenance')
    if (maintenance) {
      return new NextResponse(
        '<html><body style="background:#0C0C0C;color:white;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;"><div style="text-align:center"><h1 style="font-size:48px;margin-bottom:16px">We\'ll be right back</h1><p style="opacity:0.7">CA Agency is undergoing scheduled maintenance.</p></div></body></html>',
        {
          status: 503,
          headers: { 'Content-Type': 'text/html', 'Retry-After': '3600' },
        }
      )
    }
  } catch {
    // Edge Config not available, continue normally
  }

  // 3. i18n routing (handled by next-intl)
  return intlMiddleware(request)
}

export const config = {
  // Excluded paths bypass i18n and are served by app/(site)/ only.
  // Included paths go through next-intl and are served by app/[locale]/.
  // Keep this matcher in sync with app/sitemap.ts (see which pages are localized).
  //
  // Excluded: api, _next, _vercel, admin, influencer-marketing-*, legal, blog,
  // talents/* (detail pages; only listing exists under [locale]).
  matcher: [
    '/((?!api|_next|_vercel|admin|influencer-marketing-|privacy-policy|terms-of-service|business-license|blog|talents/|.*\\..*).*)',
  ],
}
