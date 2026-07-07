import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

// Server component: renders localized 404 copy without shipping the client
// message bundle (ar/ko ~20 KB) for a static error page.
export default async function LocaleNotFound() {
  const t = await getTranslations('errors')
  const tNav = await getTranslations('nav')

  return (
    <div className="min-h-screen bg-background-base flex items-center justify-center px-section-x">
      <div className="text-center max-w-[600px]">
        <h1 className="font-anegra text-[120px] tablet:text-[80px] mobile:text-[60px] text-accent-red leading-none mb-4">
          {t('404.heading')}
        </h1>
        <h2 className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] text-foreground-primary mb-6">
          {t('404.title')}
        </h2>
        <p className="text-black/70 text-[16px] leading-[26px] mb-10">
          {t('404.message')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent-red text-white font-medium rounded-full hover:bg-accent-red/90 transition-colors"
          >
            {tNav('home')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-black/20 text-foreground-primary font-medium rounded-full hover:bg-black/5 transition-colors"
          >
            {tNav('contact')}
          </Link>
        </div>
      </div>
    </div>
  )
}
