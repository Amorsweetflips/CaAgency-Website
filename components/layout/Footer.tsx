'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import SocialIcons from '@/components/ui/SocialIcons'
import GradientDivider from '@/components/ui/GradientDivider'
import { FooterContent } from '@/lib/site-content/site-types'

const defaultFooterContent: FooterContent = {
  description:
    'CA Agency is a full-service influencer marketing agency connecting brands with creators through strategy, production, and performance-led campaigns.',
  address: 'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.',
  email: 'info@caagency.com',
  phone: '+971-58-510-7546',
  registrationNo: '2417532.01',
  socialLinks: [
    { name: 'Instagram', href: 'https://www.instagram.com/caagency/', icon: 'fab fa-instagram' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@caagency_', icon: 'fab fa-tiktok' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/caagency/', icon: 'fab fa-linkedin-in' },
    { name: 'Facebook', href: 'https://www.facebook.com/caagencyglobal/', icon: 'fab fa-facebook-f' },
  ],
}

export default function Footer({
  content = defaultFooterContent,
}: {
  content?: FooterContent
}) {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tLocations = useTranslations('locations')
  const currentYear = new Date().getFullYear()

  const infoMenuItems = [
    { label: tNav('home'), href: '/' },
    { label: tNav('about'), href: '/about' },
    { label: tNav('talents'), href: '/talents' },
    { label: tNav('work'), href: '/work' },
    { label: tNav('services'), href: '/services' },
    { label: tNav('contact'), href: '/contact' },
  ]

  // Legal and information pages
  const moreInfoMenuItems = [
    { label: t('businessLicense'), href: '/business-license' },
    { label: t('termsOfService'), href: '/terms-of-service' },
    { label: t('privacyPolicy'), href: '/privacy-policy' },
  ]

  // Location pages for SEO
  const locationMenuItems = [
    { label: tLocations('dubai'), href: '/influencer-marketing-dubai' },
    { label: tLocations('uae'), href: '/influencer-marketing-uae' },
    { label: tLocations('saudiArabia'), href: '/influencer-marketing-saudi-arabia' },
    { label: tLocations('gcc'), href: '/influencer-marketing-gcc' },
    { label: tLocations('korea'), href: '/influencer-marketing-korea' },
    { label: tLocations('usa'), href: '/influencer-marketing-usa' },
    { label: tLocations('uk'), href: '/influencer-marketing-uk' },
    { label: tLocations('canada'), href: '/influencer-marketing-canada' },
    { label: tLocations('australia'), href: '/influencer-marketing-australia' },
  ]

  return (
    <footer className="bg-background-dark text-foreground-white">
      {/* Gradient Divider */}
      <GradientDivider variant="light" />

      {/* Main Footer */}
      <div className="max-w-container mx-auto px-section-x py-[50px] tablet:py-[50px] tablet:px-[20px]">
        <div className="flex flex-row flex-wrap justify-between tablet:flex-wrap">
          {/* Info Column */}
          <div className="w-[10.7%] laptop:w-[162px] tablet:w-[10%] mobile:w-1/2 mobile:mb-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              {t('info')}
            </h3>
            <nav>
              <ul className="space-y-0">
                {infoMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[2em] tracking-[-0.8px] text-foreground-white hover:text-button-hover transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More Info Column */}
          <div className="w-[15%] tablet:w-[15%] mobile:w-1/2 mobile:mb-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              {t('moreInfo')}
            </h3>
            <nav aria-label="Legal navigation">
              <ul className="space-y-0">
                {moreInfoMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[2em] tracking-[-0.8px] text-foreground-white hover:text-button-hover transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Locations Column */}
          <div className="w-[15%] tablet:w-[15%] mobile:w-1/2 mobile:mb-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              {t('locations')}
            </h3>
            <nav aria-label="Location pages">
              <ul className="space-y-0">
                {locationMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[2em] tracking-[-0.8px] text-foreground-white hover:text-button-hover transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="w-[25%] tablet:w-[20%] mobile:w-full mobile:mb-0 mobile:pt-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              {t('contact')}
            </h3>
            <ul className="space-y-[10px]">
              <li className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white">
                {content.address}
              </li>
              <li>
                <a
                  href={`mailto:${content.email}`}
                  className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white hover:underline"
                >
                  {content.email}
                </a>
              </li>
              <li className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white">
                {content.phone}
              </li>
              <li className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white">
                {content.registrationNo}
              </li>
            </ul>
          </div>

          {/* Logo & Social Column */}
          <div className="w-[25%] tablet:w-[35%] mobile:w-full mobile:pt-[30px]">
            {/* White CA Logo - same interlocking design as header */}
            <Image
              src="/images/site/logo-white.svg"
              alt="CA Agency"
              width={142}
              height={143}
              className="w-[142px] tablet:w-[30%] mobile:w-[90px] h-auto mb-4"
            />
            <p className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white mb-0">
              {content.description}
            </p>
            <h4 className="font-anegra text-[23px] font-semibold tracking-[1.2px] pt-[20px] tablet:pt-0 mb-4 text-foreground-white">
              {t('followUs')}
            </h4>
            <SocialIcons
              icons={content.socialLinks.map((s) => ({
                name: s.name,
                href: s.href,
                icon: s.icon,
              }))}
              size="lg"
              className="gap-[22px] tablet:gap-[18px]"
            />
            {/* Contact button - visible only on mobile */}
            <Link
              href="/contact"
              className="hidden mobile:inline-block mt-6 font-jost text-base font-medium px-6 py-3 bg-button-bg text-button-text rounded-[30px] hover:bg-button-hover transition-colors"
            >
              {t('contactUs')}
            </Link>
          </div>

          {/* Desktop/Tablet Contact Button Column - hidden on mobile, aligned to top */}
          <div className="w-auto tablet:w-auto mobile:hidden flex flex-col items-start justify-start">
            <Link
              href="/contact"
              className="font-jost text-base font-medium px-6 py-3 bg-button-bg text-button-text rounded-[30px] hover:bg-button-hover transition-colors"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <GradientDivider variant="light" />
      <div className="max-w-container mx-auto px-section-x py-[30px] tablet:py-[50px]">
        <p className="font-work-sans text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white text-center mobile:text-left">
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  )
}
