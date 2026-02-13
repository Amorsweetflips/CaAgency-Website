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
