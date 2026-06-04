import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // All supported locales
  locales: ['en', 'ar', 'ko'],

  // Default locale when no locale matches
  defaultLocale: 'en',

  // Don't use a prefix for the default locale (English)
  localePrefix: 'as-needed',

  // Suppress the NEXT_LOCALE Set-Cookie header so Vercel can cache HTML
  // responses at the edge (X-Vercel-Cache: HIT). Supported in next-intl v3.22+;
  // installed version is next-intl ^4.8.1.
  localeCookie: false,
});

// Locale metadata for UI display
export const localeNames: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
  ko: '한국어',
};

// RTL locales
export const rtlLocales = ['ar'];

// Check if a locale is RTL
export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale);
}

// Lightweight wrappers around Next.js navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
