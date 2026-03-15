import Image from 'next/image'
import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import { getSiteContent } from '@/lib/site-content/service'
import { ServicesPageContent } from '@/lib/site-content/site-types'

export const metadata: Metadata = {
  title: 'Influencer Marketing Services Dubai | CA Agency',
  description:
    'Full-service influencer marketing: talent management, brand partnerships & content creation. Instagram, TikTok & YouTube campaigns. Request a quote!',
  keywords: [
    'influencer marketing services',
    'talent management',
    'brand partnerships',
    'content creation agency',
    'social media campaigns',
    'influencer campaigns Dubai',
  ],
  openGraph: {
    title: 'Influencer Marketing Services | CA Agency',
    description:
      'Full-service influencer marketing: talent management, brand partnerships, and high-impact campaigns across Instagram, TikTok & YouTube.',
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
    title: 'Influencer Marketing Services | CA Agency',
    description: 'Full-service influencer marketing: talent management, brand partnerships, and campaigns.',
    images: ['/images/site/og-image.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/services',
  },
}

export default async function ServicesPage() {
  const content = await getSiteContent<ServicesPageContent>('services')

  return (
    <>
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[80px] tablet:leading-[60px] mobile:leading-[44px] font-light mb-8 whitespace-pre-line">
            {content.hero.title}
          </Heading>
          <Text color="white" size="lg" className="text-center tablet:text-[16px] mobile:text-[16px] max-w-3xl mx-auto opacity-80">
            {content.hero.subtitle}
          </Text>
        </div>
      </section>

      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[800px]">
            <Heading as="h2" color="white" className="mb-8 tracking-[0.1px]">
              {content.intro.title}
            </Heading>
            {content.intro.paragraphs.map((paragraph, index) => (
              <Text
                key={index}
                color="white"
                size="sm"
                className={`${index === content.intro.paragraphs.length - 1 ? '' : 'mb-6'} mobile:text-[16px] leading-[28px] opacity-80`}
              >
                {paragraph.text}
              </Text>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-dark pb-[100px] tablet:pb-[80px] mobile:pb-[60px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {content.cards.map((service) => (
              <div
                key={service.number}
                className="group relative rounded-[20px] overflow-hidden bg-background-dark"
              >
                <div className="relative w-full aspect-4/5 tablet:aspect-3/4 mobile:aspect-3/4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

                  <div className="absolute inset-x-0 bottom-0 p-8 tablet:p-6 mobile:p-5">
                    <h3 className="font-anegra text-[32px] tablet:text-[28px] mobile:text-[24px] font-semibold tracking-[1.2px] text-white mb-4">
                      {service.number}. {service.title}
                    </h3>
                    <p className="text-white/90 text-[14px] leading-[24px] mb-3">
                      <strong>{service.highlight}</strong>
                    </p>
                    <p className="text-white/70 text-[14px] leading-[24px] mb-3">
                      {service.description}
                    </p>
                    <p className="text-white/70 text-[14px] leading-[24px]">
                      {service.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
