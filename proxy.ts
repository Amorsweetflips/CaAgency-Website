import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Next.js internals (/_next/*, /_vercel/*)
  // - Admin routes (/admin/*)
  // - Static files (files with extensions like .ico, .svg, .png, etc.)
  // - Location/SEO pages (influencer-marketing-*)
  // - Legal pages (privacy-policy, terms-of-service, business-license)
  // - Blog pages (blog/*)
  matcher: [
    '/((?!api|_next|_vercel|admin|influencer-marketing-|privacy-policy|terms-of-service|business-license|blog|.*\\..*).*)',
  ],
};
