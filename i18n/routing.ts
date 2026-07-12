import { defineRouting } from 'next-intl/routing';
import { defaultLocale, isRtlLocale, localeNames, locales, rtlLocales } from '@/i18n/config';

export { defaultLocale, isRtlLocale, localeNames, locales, rtlLocales } from '@/i18n/config';

export const routing = defineRouting({
  // All supported locales
  locales,

  // Default locale when no locale matches
  defaultLocale,

  // Don't use a prefix for the default locale (English)
  localePrefix: 'as-needed',

  // Suppress the NEXT_LOCALE Set-Cookie header so Vercel can cache HTML
  // responses at the edge (X-Vercel-Cache: HIT). Supported in next-intl v3.22+;
  // installed version is next-intl ^4.8.1.
  localeCookie: false,
});
