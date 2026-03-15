import { revalidatePath } from 'next/cache'
import { routing } from '@/i18n/routing'

export function revalidateTalentsPages() {
  revalidatePath('/talents')
  revalidatePath('/')
  for (const locale of routing.locales) {
    if (locale !== routing.defaultLocale) {
      revalidatePath(`/${locale}/talents`)
    }
  }
}

export function revalidateSitePages() {
  const paths = [
    '/',
    '/about',
    '/services',
    '/work',
    '/contact',
    '/business-license',
    '/privacy-policy',
    '/terms-of-service',
    '/influencer-marketing-dubai',
    '/influencer-marketing-uae',
    '/influencer-marketing-saudi-arabia',
    '/influencer-marketing-gcc',
    '/influencer-marketing-korea',
    '/influencer-marketing-usa',
    '/influencer-marketing-uk',
    '/influencer-marketing-canada',
    '/influencer-marketing-australia',
  ]

  for (const path of paths) {
    revalidatePath(path)
  }

  for (const locale of routing.locales) {
    if (locale !== routing.defaultLocale) {
      revalidatePath(`/${locale}`)
      revalidatePath(`/${locale}/about`)
      revalidatePath(`/${locale}/services`)
      revalidatePath(`/${locale}/contact`)
    }
  }
}
