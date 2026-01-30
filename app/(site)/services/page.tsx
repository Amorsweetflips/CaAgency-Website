import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { Metadata } from 'next'

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
        name: 'Influencer Monetization',
        description: 'We help influencers build long-term, sustainable careers with personalized growth and monetization strategies.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Audience Growth & Reach Expansion',
        description: 'Strategic social media optimization and targeted content distribution to maximize visibility and grow loyal audiences.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Brand-Influencer Matching',
        description: 'Strategic matchmaking between brands and influencers for authentic partnerships that drive trust and engagement.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Performance Marketing Campaigns',
        description: 'Performance-driven influencer marketing campaigns designed to generate qualified traffic and measurable business outcomes.',
        provider: { '@type': 'Organization', name: 'CA Agency' },
        areaServed: 'Worldwide',
      },
    },
  ],
}

const services = [
  {
    number: 1,
    title: 'For Influencers',
    image: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/rebecca-ghaderi.jpeg',
    highlight: 'Monetization Amplified: Turn your influence into income with CA Agency.',
    description: 'We go beyond likes and followers we help influencers build long-term, sustainable careers. Our influencer marketing experts work one-on-one with creators to develop personalized growth and monetization strategies.',
    details: 'From paid brand collaborations and affiliate campaigns to exclusive long-term partnerships, we ensure that your creative content becomes a reliable revenue stream. At CA Agency, we empower influencers to grow their brand, increase visibility, and unlock their full earning potential.',
  },
  {
    number: 2,
    title: 'Expanding Reach',
    image: 'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/melly-sanchez.jpeg',
    highlight: 'Your voice deserves to be seen, heard, and celebrated on a global scale.',
    description: 'At CA Agency, we harness the full potential of digital platforms to maximize your visibility and help you grow a loyal, engaged audience. Through strategic social media optimization and targeted content distribution, we ensure you\'re present where it matters most from Instagram and TikTok to YouTube and beyond.',
    details: 'Whether you\'re an emerging creator or an established influencer, we help you expand your reach, boost engagement, and build a global personal brand that resonates.',
  },
  {
    number: 3,
    title: 'Targeted Engagement',
    image: '/images/talents/lidia-jora.jpg',
    highlight: 'Navigating the digital space takes strategy and that\'s where CA Agency leads.',
    description: 'We specialize in aligning brands with influencers whose values, tone, and audience perfectly reflect their brand identity. This strategic matchmaking results in authentic influencer partnerships that drive trust, increase brand loyalty, and spark deeper audience engagement.',
    details: 'By connecting companies with the right creators, we deliver targeted influencer marketing campaigns that don\'t just generate buzz they build real relationships with customers.',
  },
  {
    number: 4,
    title: 'Driving Traffic',
    image: '/images/talents/sadaf-torabi.jpg',
    highlight: 'At CA Agency, we know that visibility alone isn\'t enough results matter.',
    description: 'That\'s why we craft performance-driven influencer marketing campaigns designed to go beyond brand exposure. Our focus is on generating qualified traffic, boosting conversions, and achieving measurable business outcomes.',
    details: 'Through compelling content creation and strategic brand-influencer collaborations, we help you turn attention into action and followers into loyal customers.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="text-[68px] tablet:text-[50px] mobile:text-[36px] leading-[80px] tablet:leading-[60px] mobile:leading-[44px] font-light mb-8">
            Our Services at CA Agency<br />
            Influence • Digital • Marketing
          </Heading>
          <Text color="white" size="lg" className="text-center tablet:text-[16px] mobile:text-[16px] max-w-3xl mx-auto opacity-80">
            We believe every influencer has the ability to create meaningful impact, and every brand has the potential to build authentic, lasting connections with their audience.
          </Text>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[800px]">
            <Heading as="h2" color="white" className="mb-8 tracking-[0.1px]">
              Top-notch services
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

      {/* Services Grid - 2x2 Layout matching live site */}
      <section className="bg-background-dark pb-[100px] tablet:pb-[80px] mobile:pb-[60px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            {services.map((service) => (
              <div
                key={service.number}
                className="group relative rounded-[20px] overflow-hidden bg-background-dark"
              >
                {/* Image Container - Full card background */}
                <div className="relative w-full aspect-[4/5] tablet:aspect-[3/4] mobile:aspect-[3/4]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                  {/* Content overlay at bottom */}
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
            <Button href="/contact">Contact Us</Button>
            <Button href="/work" variant="dark">View Our Work</Button>
            <Button href="/talents" variant="dark">Our Talents</Button>
          </div>
        </div>
      </section>
    </>
  )
}
