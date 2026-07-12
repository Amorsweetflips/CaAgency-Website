export const locales = ['en', 'ar', 'ko'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  ko: '한국어',
}

export const rtlLocales: ReadonlyArray<Locale> = ['ar']

export function isRtlLocale(locale: string) {
  return rtlLocales.includes(locale as Locale)
}
