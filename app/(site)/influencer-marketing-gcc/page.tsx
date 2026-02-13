import { Metadata } from 'next'
import Link from 'next/link'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import BrandCarousel from '@/components/blocks/BrandCarousel'

export const metadata: Metadata = {
  title: 'Influencer Marketing Agency GCC | CA Agency',
  description:
    'GCC influencer marketing agency connecting brands with top creators across UAE, Saudi Arabia, Kuwait, Qatar, Bahrain & Oman. Regional expertise, global reach.',
  keywords: [
    'influencer marketing GCC',
    'GCC influencer agency',
    'Gulf influencer marketing',
    'Middle East influencers',
    'Kuwait influencer agency',
    'Qatar influencer marketing',
    'Bahrain content creators',
    'Oman social media marketing',
  ],
  openGraph: {
    title: 'Influencer Marketing Agency GCC | CA Agency',
    description: 'Your partner for influencer marketing across the Gulf Cooperation Council region.',
    images: [{ url: '/images/site/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://caagency.com/influencer-marketing-gcc',
  },
}

const brandLogos = [
  { url: '/images/logos/brand-01.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-02.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-03.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-04.webp', alt: 'Brand partner' },
  { url: '/images/logos/brand-05.webp', alt: 'Brand partner' },
]

const gccCountries = [
  { name: 'UAE', link: '/influencer-marketing-uae', description: 'Dubai, Abu Dhabi & Emirates' },
  { name: 'Saudi Arabia', link: '/influencer-marketing-saudi-arabia', description: 'Riyadh, Jeddah & KSA' },
  { name: 'Kuwait', link: null, description: 'Kuwait City & nationwide' },
  { name: 'Qatar', link: null, description: 'Doha & Qatar' },
  { name: 'Bahrain', link: null, description: 'Manama & Bahrain' },
  { name: 'Oman', link: null, description: 'Muscat & Oman' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'GCC Influencer Marketing',
  provider: {
    '@type': 'Organization',
    name: 'CA Agency',
    url: 'https://caagency.com',
  },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Kuwait' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Bahrain' },
    { '@type': 'Country', name: 'Oman' },
  ],
  description: 'Influencer marketing services across the Gulf Cooperation Council region.',
}

export default function GCCPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {/* Hero */}
      <section className="bg-background-dark py-[100px] tablet:py-[80px] mobile:py-[60px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h1" color="white" className="mb-6 text-[56px] tablet:text-[44px] mobile:text-[32px] leading-tight">
            Influencer Marketing<br />Across the GCC
          </Heading>
          <Text color="white" size="lg" className="max-w-[700px] mx-auto mb-8 opacity-80">
            Your regional partner for influencer marketing across the Gulf. From Dubai to Riyadh, Kuwait to Doha – we connect brands with the GCC's most influential creators.
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact">Plan Your GCC Campaign</Button>
            <Button href="/talents" variant="dark">Explore Creators</Button>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="bg-background-dark py-[80px] px-section-x border-t border-white/5">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-center text-[40px] mobile:text-[28px]">
            GCC Coverage
          </Heading>
          <div className="grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-6">
            {gccCountries.map((country) => (
              <div key={country.name} className="bg-white/5 rounded-xl p-8">
                {country.link ? (
                  <Link href={country.link} className="block hover:opacity-80 transition-opacity">
                    <h3 className="text-white font-semibold text-xl mb-2">{country.name}</h3>
                    <Text color="white" size="sm" className="opacity-60">{country.description}</Text>
                    <span className="text-accent-red text-sm mt-3 inline-block">Learn more →</span>
                  </Link>
                ) : (
                  <>
                    <h3 className="text-white font-semibold text-xl mb-2">{country.name}</h3>
                    <Text color="white" size="sm" className="opacity-60">{country.description}</Text>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GCC */}
      <section className="bg-background-dark py-[80px] px-section-x">
        <div className="max-w-container mx-auto">
          <Heading as="h2" color="white" className="mb-8 text-[40px] mobile:text-[28px]">
            Why the GCC Market?
          </Heading>
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8">
            <div>
              <h3 className="text-white font-semibold text-xl mb-3">$2.7T+ Combined GDP</h3>
              <Text color="white" size="sm" className="opacity-70">
                The GCC represents one of the world's wealthiest consumer markets with high disposable income.
              </Text>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl mb-3">99% Social Penetration</h3>
              <Text color="white" size="sm" className="opacity-70">
                Among the highest social media usage rates globally – your audience is online and engaged.
              </Text>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl mb-3">Cultural Nuances</h3>
              <Text color="white" size="sm" className="opacity-70">
                We understand regional sensitivities and create content that resonates authentically.
              </Text>
            </div>
            <div>
              <h3 className="text-white font-semibold text-xl mb-3">Cross-Border Influence</h3>
              <Text color="white" size="sm" className="opacity-70">
                GCC creators often have pan-regional followings, maximizing your campaign impact.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-red py-[80px] px-section-x">
        <div className="max-w-container mx-auto text-center">
          <Heading as="h2" color="white" className="mb-6 text-[40px] mobile:text-[28px]">
            Go Regional with CA Agency
          </Heading>
          <Text color="white" size="lg" className="max-w-[600px] mx-auto mb-8 opacity-90">
            Ready to reach audiences across the Gulf? Let's discuss your GCC influencer strategy.
          </Text>
          <Button href="/contact" variant="light">Get Started</Button>
        </div>
      </section>

      <BrandCarousel images={brandLogos} />
    </>
  )
}
