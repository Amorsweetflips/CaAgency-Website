'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export default function LocaleNotFound() {
  const t = useTranslations('errors')
  const tNav = useTranslations('nav')

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center px-section-x">
      <div className="text-center max-w-[600px]">
        <h1 className="font-anegra text-[120px] tablet:text-[80px] mobile:text-[60px] text-accent-red leading-none mb-4">
          {t('404.heading')}
        </h1>
        <h2 className="font-anegra text-[32px] tablet:text-[26px] mobile:text-[22px] text-foreground-white mb-6">
          {t('404.title')}
        </h2>
        <p className="text-foreground-white/70 text-[16px] leading-[26px] mb-10">
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
            className="inline-flex items-center justify-center px-8 py-4 border border-foreground-white/30 text-foreground-white font-medium rounded-full hover:bg-foreground-white/10 transition-colors"
          >
            {tNav('contact')}
          </Link>
        </div>
      </div>
    </div>
  )
}
