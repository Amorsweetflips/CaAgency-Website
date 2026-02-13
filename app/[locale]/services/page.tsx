import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

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
          url: '/images/site/og-image.webp',
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
      images: ['/images/site/og-image.webp'],
    },
    alternates: {
      canonical: 'https://caagency.com/services',
      languages: {
        en: 'https://caagency.com/services',
        ar: 'https://caagency.com/ar/services',
        ko: 'https://caagency.com/ko/services',
      },
    },
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
    image: '/images/talents/lidia-jora.jpg',
  },
  {
    number: 4,
    key: 'brandPartnerships' as const,
    image: '/images/talents/sadaf-torabi.jpg',
  },
]

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>

      {/* Hero Section */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[80px] tablet:leading-[60px] mobile:leading-[44px] font-light mb-8">
            {t('servicesAtCA')}<br />
            Influence • Digital • Marketing
          </Heading>
          <Text color="white" size="lg" className="text-center tablet:text-[16px] mobile:text-[16px] max-w-3xl mx-auto opacity-80">
            {t('subheading')}
          </Text>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[800px]">
            <Heading as="h2" color="white" className="mb-8 tracking-[0.1px]">
              {t('topNotch')}
            </Heading>
            <Text color="white" size="sm" className="mb-6 mobile:text-[16px] leading-[28px] opacity-80">
              <strong className="opacity-100">At CA Agency, we deliver top-tier influencer marketing services that connect powerful voices with forward-thinking brands.</strong>
            </Text>
            <Text color="white" size="sm" className="mobile:text-[16px] leading-[28px] opacity-80">
              We believe every influencer has the ability to create meaningful impact, and every brand has the potential to build authentic, lasting connections with their audience. As a full-service influencer marketing agency, we act as the bridge between creators and companies producing storytelling content that resonates, engages, and drives measurable growth across platforms like Instagram, Youtube and TikTok.
            </Text>
          </div>
        </div>
      </section>

      {/* Services Grid - 2x2 Layout */}
      <section className="bg-background-dark pb-[100px] tablet:pb-[80px] mobile:pb-[60px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {services.map((service) => (
              <div
                key={service.number}
                className="group relative rounded-[20px] overflow-hidden bg-background-dark"
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
                    <h3 className="font-anegra text-[32px] tablet:text-[28px] mobile:text-[24px] font-semibold tracking-[1.2px] text-white mb-4">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-background-dark pb-[60px] tablet:pb-[50px] mobile:pb-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[1000px] mx-auto text-center">
            <Text color="white" size="sm" className="text-[15px] leading-[28px] mb-6 opacity-80">
              <strong className="opacity-100">At CA Agency, success is more than numbers – it's about real transformation.</strong> Our portfolio is filled with inspiring <strong>influencer success stories</strong>: creators who turned passion into full-time careers, and brands that brought their visions to life through strategic influencer partnerships.
            </Text>
            <Text color="white" size="sm" className="text-[15px] leading-[28px] opacity-80">
              <strong className="opacity-100">Together, we're not just building campaigns – we're cultivating a thriving digital ecosystem rooted in authenticity, creativity, and mutual growth. Whether you're a brand or a creator, CA Agency is your partner in long-term digital success.</strong>
            </Text>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] tablet:text-[32px] mobile:text-[26px]">
            Ready to Get Started?
          </Heading>
          <Text color="white" size="base" className="max-w-[600px] mx-auto mb-8 opacity-80">
            Whether you&apos;re a brand looking for influencers or a creator ready to grow, we&apos;re here to help.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">{tCommon('contactUs')}</Button>
            <Button href="/work" variant="dark">{tCommon('viewOurWork')}</Button>
            <Button href="/talents" variant="dark">{tCommon('meetOurTalents')}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
