import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Next.js internals (/_next/*, /_vercel/*)
  // - Admin routes (/admin/*)
  // - Static files (files with extensions like .ico, .svg, .png, etc.)
  matcher: [
    '/((?!api|_next|_vercel|admin|.*\\..*).*)',
  ],
};
