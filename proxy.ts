import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export const proxy = createMiddleware(routing);

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
};
