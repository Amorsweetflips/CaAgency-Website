import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HeadingAccent from '@/components/ui/HeadingAccent'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'
import { alternatesFor } from '@/lib/seo/alternates'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'influencer marketing services',
      'talent management',
      'brand partnerships',
      'content creation agency',
      'social media campaigns',
      'influencer campaigns Dubai',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/images/site/og-cover.webp',
          width: 1200,
          height: 630,
          alt: 'CA Agency Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/site/og-cover.webp'],
    },
    alternates: alternatesFor(locale, '/services'),
  }
}

// Service schema for SEO
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Talent Management',
        description: 'We discover, develop, and manage top-tier influencers, ensuring they reach their full potential while maintaining authentic connections with their audiences.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Campaign Strategy',
        description: 'From concept to execution, we craft influencer campaigns that align with your brand goals and resonate with your target audience.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Content Creation',
        description: 'Our creators produce high-quality, engaging content that captures attention and drives engagement across all platforms.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Brand Partnerships',
        description: 'We connect brands with the perfect influencers to create authentic partnerships that deliver measurable results.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
  ],
}

const services = [
  {
    number: 1,
    key: 'talentManagement' as const,
    image: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/rebecca-ghaderi.jpeg',
  },
  {
    number: 2,
    key: 'campaignStrategy' as const,
    image: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/melly-sanchez.jpeg',
  },
  {
    number: 3,
    key: 'contentCreation' as const,
    image: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/beatrix-ramosaj.jpeg',
  },
  {
    number: 4,
    key: 'brandPartnerships' as const,
    image: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/asel-akmatova.jpeg',
  },
]

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>

      {/* Hero Section — CSS load-in (LCP-safe) */}
      <section className="relative overflow-hidden bg-background-base py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative z-[1] max-w-container mx-auto text-center">
          <Heading as="h1" color="dark" className="hero-rise hero-rise-1 text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[80px] tablet:leading-[60px] mobile:leading-[44px] font-light mb-8">
            {t('servicesAtCA')}<br />
            Influence • Digital • Marketing
          </Heading>
          <Text color="dark" size="lg" className="hero-rise hero-rise-2 text-center tablet:text-[16px] mobile:text-[16px] max-w-3xl mx-auto opacity-80">
            {t('subheading')}
          </Text>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-background-base py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal yOffset={24} className="max-w-[800px]">
            <Heading as="h2" color="dark" className="mb-5 tracking-[0.1px]">
              {t('topNotch')}
            </Heading>
            <HeadingAccent align="start" className="mb-8" />
            <Text color="dark" size="sm" className="mb-6 mobile:text-[16px] leading-[28px] opacity-80">
              <strong className="opacity-100">{t('introLead')}</strong>
            </Text>
            <Text color="dark" size="sm" className="mobile:text-[16px] leading-[28px] opacity-80">
              {t('introBody')}
            </Text>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid - 2x2 Layout */}
      <section className="bg-background-base pb-[100px] tablet:pb-[80px] mobile:pb-[60px] px-section-x">
        <div className="max-w-container mx-auto">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" stagger={0.1}>
            {services.map((service) => (
              <StaggerItem
                key={service.number}
                className="hover-lift group relative rounded-[20px] overflow-hidden bg-background-base ring-1 ring-black/5 hover:ring-black/15 hover:shadow-e3"
              >
                {/* Image Container - Full card background */}
                <div className="relative w-full aspect-4/5 tablet:aspect-3/4 mobile:aspect-3/4">
                  <Image
                    src={service.image}
                    alt={t(`${service.key}.title`)}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Content overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-8 tablet:p-6 mobile:p-5">
                    <h3 className="font-anegra text-[32px] tablet:text-[28px] mobile:text-[24px] font-semibold tracking-[0] text-white mb-4">
                      {service.number}. {t(`${service.key}.title`)}
                    </h3>
                    <p className="text-white/90 text-[14px] leading-[24px] mb-3">
                      <strong>{t(`${service.key}.highlight`)}</strong>
                    </p>
                    <p className="text-white/70 text-[14px] leading-[24px] mb-3">
                      {t(`${service.key}.description`)}
                    </p>
                    <p className="text-white/70 text-[14px] leading-[24px]">
                      {t(`${service.key}.details`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-background-base pb-[60px] tablet:pb-[50px] mobile:pb-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <ScrollReveal yOffset={24} className="max-w-[1000px] mx-auto text-center">
            <Text color="dark" size="sm" className="text-[15px] leading-[28px] mb-6 opacity-80">
              {t('closingLead')}
            </Text>
            <Text color="dark" size="sm" className="text-[15px] leading-[28px] opacity-80">
              <strong className="opacity-100">{t('closingBody')}</strong>
            </Text>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-base py-[80px] px-section-x border-t border-black/5">
        <ScrollReveal yOffset={24} className="max-w-container mx-auto text-center">
          <Heading as="h2" color="dark" className="mb-5 text-[40px] tablet:text-[32px] mobile:text-[26px]">
            {t('ctaTitle')}
          </Heading>
          <HeadingAccent className="mb-6" />
          <Text color="dark" size="base" className="max-w-[600px] mx-auto mb-8 opacity-80">
            {t('ctaText')}
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">{tCommon('contactUs')}</Button>
            <Button href="/work" variant="dark">{tCommon('viewOurWork')}</Button>
            <Button href="/talents" variant="dark">{tCommon('meetOurTalents')}</Button>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
