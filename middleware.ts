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

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // 1. Domain redirects at the edge (ultra-fast)
  if (SECONDARY_DOMAINS.includes(hostname)) {
    const url = new URL(request.url)
    url.hostname = 'caagency.com'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  // 2. Edge Config: check for maintenance mode or feature flags
  try {
    const maintenance = await get<boolean>('maintenance')
    if (maintenance) {
      // Return a simple maintenance response at the edge
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

  // 3. i18n routing for locale-prefixed paths
  const pathname = request.nextUrl.pathname
  const isLocalePath = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (isLocalePath) {
    return intlMiddleware(request)
  }

  // 4. Add performance headers at the edge
  const response = NextResponse.next()

  // Security headers (applied at edge = faster than serverless)
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|videos|api|site.webmanifest|robots.txt|sitemap.xml|google).*)',
  ],
}
