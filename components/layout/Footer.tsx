// Server component: ~25 links of static text — as a client component this
// hydrated on every page and dragged SocialIcons' react-icons imports into
// the client bundle. useTranslations works in Server Components (next-intl),
// and both layouts call setRequestLocale before rendering it, so static
// rendering is preserved.
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import SocialIcons from '@/components/ui/SocialIcons'
import GradientDivider from '@/components/ui/GradientDivider'
import Button from '@/components/ui/Button'
import { FooterContent } from '@/lib/site-content/site-types'
import { localizeHref } from '@/lib/i18n/client-paths'
import { locationPages } from '@/lib/data/locations'
import type { Locale } from '@/i18n/config'

const defaultFooterContent: FooterContent = {
  description:
    'CA Agency is a leading, full-service talent management & marketing agency, connecting brands with creators through strategy, production and performance-led campaigns.',
  address: 'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.',
  email: 'info@caagency.com',
  registrationNo: '2417532.01',
  socialLinks: [
    { name: 'Instagram', href: 'https://www.instagram.com/caagency/', icon: 'fab fa-instagram' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@caagency/', icon: 'fab fa-tiktok' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/caagency/', icon: 'fab fa-linkedin-in' },
    { name: 'Facebook', href: 'https://www.facebook.com/caagencyglobal/', icon: 'fab fa-facebook-f' },
  ],
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-jost text-[13px] font-medium uppercase tracking-[0.15em] text-foreground-primary mb-5">
      {children}
    </h3>
  )
}

const footerLinkClasses =
  'font-work-sans text-[15px] font-normal leading-[2em] text-foreground-body hover:text-foreground-primary transition-colors block'

export default function Footer({
  content = defaultFooterContent,
  locale = 'en',
}: {
  content?: FooterContent
  locale?: Locale
}) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tLocations = useTranslations('locations')
  const currentYear = new Date().getFullYear()
  // The CMS footer row is English-only; other locales use the translated
  // catalog so /ar, /ko etc. don't render an English blurb and address.
  const isDefaultLocale = locale === 'en'
  const description = isDefaultLocale ? content.description : t('description')
  const address = isDefaultLocale ? content.address : t('address')
  const registrationNo = isDefaultLocale ? content.registrationNo : t('registrationNo')

  const infoMenuItems = [
    { label: tNav('home'), href: '/' },
    { label: tNav('about'), href: '/about' },
    { label: tNav('talents'), href: '/talents' },
    { label: tNav('work'), href: '/work' },
    { label: tNav('caseStudies'), href: '/case-studies' },
    { label: tNav('services'), href: '/services' },
    { label: tNav('blog'), href: '/blog' },
    { label: tNav('contact'), href: '/contact' },
  ]

  // Legal and information pages
  const moreInfoMenuItems = [
    { label: t('businessLicense'), href: '/business-license' },
    { label: t('termsOfService'), href: '/terms-of-service' },
    { label: t('privacyPolicy'), href: '/privacy-policy' },
  ]

  // Location pages for SEO
  const locationMenuItems = locationPages.map(({ key, path }) => ({ label: tLocations(key), href: path }))

  return (
    <footer className="footer-defer bg-background-soft text-foreground-body">
      {/* Gradient Divider */}
      <GradientDivider variant="light" />

      {/* Main Footer */}
      <div className="max-w-container mx-auto px-section-x py-[64px] mobile:py-[48px]">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 mobile:gap-y-8">
          {/* Brand column */}
          <div className="col-span-4 tablet:col-span-5 mobile:col-span-12">
            <Image
              src="/images/site/logo.svg"
              alt="CA Agency"
              width={343}
              height={181}
              className="w-[112px] mobile:w-[84px] h-auto mb-5"
            />
            <p className="font-work-sans text-[15px] font-normal leading-[1.7] text-foreground-body max-w-[340px] mb-6">
              {description}
            </p>
            <SocialIcons
              icons={content.socialLinks.map((s) => ({
                name: s.name,
                href: s.href,
                icon: s.icon,
              }))}
              size="md"
              className="gap-[18px] mb-8"
            />
            <Button href="/contact" locale={locale} size="sm" className="text-[15px]" prefetch={false}>
              {t('contactUs')}
            </Button>
          </div>

          {/* Info Column */}
          <div className="col-span-2 tablet:col-span-3 mobile:col-span-6">
            <ColumnLabel>{t('info')}</ColumnLabel>
            <nav aria-label={t('info')}>
              <ul className="space-y-0">
                {infoMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={localizeHref(item.href, locale)} prefetch={false} className={footerLinkClasses}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More Info Column */}
          <div className="col-span-2 tablet:col-span-4 mobile:col-span-6">
            <ColumnLabel>{t('moreInfo')}</ColumnLabel>
            <nav aria-label="Legal navigation">
              <ul className="space-y-0">
                {moreInfoMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={localizeHref(item.href, locale)} prefetch={false} className={footerLinkClasses}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Locations Column */}
          <div className="col-span-2 tablet:col-span-5 mobile:col-span-6">
            <ColumnLabel>{t('locations')}</ColumnLabel>
            <nav aria-label="Location pages">
              <ul className="space-y-0">
                {locationMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={localizeHref(item.href, locale)} prefetch={false} className={footerLinkClasses}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 tablet:col-span-7 mobile:col-span-6">
            <ColumnLabel>{t('contact')}</ColumnLabel>
            <ul className="space-y-[10px]">
              <li className="font-work-sans text-[15px] font-normal leading-[1.6] text-foreground-body">
                {address}
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="font-work-sans text-[15px] font-normal leading-[1.6] text-foreground-body hover:text-foreground-primary hover:underline"
                >
                  {content.email}
                </a>
              </li>
              <li className="font-work-sans text-[15px] font-normal leading-[1.6] text-foreground-body">
                {registrationNo}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <GradientDivider variant="light" />
      <div className="max-w-container mx-auto px-section-x py-[24px]">
        <p className="font-work-sans text-[14px] font-normal leading-[1.5em] text-foreground-subtle text-center mobile:text-start">
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  )
}
