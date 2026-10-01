import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from '@/i18n/config';

export const routing = defineRouting({
  // All supported locales
  locales,

  // Default locale when no locale matches
  defaultLocale,

  // Don't use a prefix for the default locale (English)
  localePrefix: 'as-needed',

  // Suppress the NEXT_LOCALE Set-Cookie header so Vercel can cache HTML
  // responses at the edge (X-Vercel-Cache: HIT). Supported since next-intl v3.22.
  localeCookie: false,
});
