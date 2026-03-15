import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/blocks/ContactForm'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import GradientDivider from '@/components/ui/GradientDivider'
import { getSiteContent } from '@/lib/site-content/service'
import { ContactPageContent } from '@/lib/site-content/site-types'

export const metadata: Metadata = {
  title: 'Contact CA Agency Dubai | Influencer Marketing Inquiries',
  description:
    'Contact CA Agency for influencer campaigns, brand partnerships or talent representation. Dubai agency serving global brands. Get a response within 24h!',
  keywords: [
    'contact CA Agency',
    'influencer marketing inquiry',
    'brand partnership',
    'talent submission',
    'influencer agency contact',
    'Dubai marketing agency',
  ],
  openGraph: {
    title: 'Contact CA Agency',
    description:
      'Get in touch for influencer marketing campaigns, brand partnerships, or talent representation.',
    images: [
      {
        url: '/images/site/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Contact CA Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact CA Agency',
    description: 'Get in touch for influencer marketing campaigns or talent representation.',
    images: ['/images/site/og-image.webp'],
  },
  alternates: {
    canonical: 'https://caagency.com/contact',
  },
}

export default async function ContactPage() {
  const content = await getSiteContent<ContactPageContent>('contact')

  return (
    <section className="bg-background-dark py-[150px] mobile:py-[80px] px-section-x relative">
      <div className="max-w-container mx-auto relative z-10">
        <div className="max-w-[850px] mx-auto">
          <div className="bg-background-light rounded-[16px] shadow-[0_4px_40px_-10px_rgba(0,0,0,0.3)] py-[70px] mobile:py-[50px] px-[70px] tablet:px-[50px] mobile:px-[30px]">
            <div className="text-center mb-10">
              <Heading as="h1" color="dark" className="mb-4 tracking-[0.1px]">
                {content.hero.title}
              </Heading>
              <Text color="muted" size="sm" className="max-w-[550px] mx-auto">
                {content.hero.subtitle}
              </Text>
              <Text color="muted" size="sm" className="max-w-[620px] mx-auto mt-4">
                Looking for a regional brief first? See our{' '}
                <Link href="/influencer-marketing-dubai" className="text-black underline underline-offset-4">
                  influencer marketing agency Dubai
                </Link>{' '}
                page or our{' '}
                <Link href="/influencer-marketing-uae" className="text-black underline underline-offset-4">
                  influencer marketing agency UAE
                </Link>{' '}
                page. If you are targeting international markets, start with our{' '}
                <Link href="/influencer-marketing-usa" className="text-black underline underline-offset-4">
                  influencer marketing agency USA
                </Link>{' '}
                or{' '}
                <Link href="/influencer-marketing-asia" className="text-black underline underline-offset-4">
                  influencer marketing agency Asia
                </Link>{' '}
                page before submitting your inquiry.
              </Text>
            </div>

            <div className="mb-2">
              <Heading as="h3" color="dark" className="mb-6 text-[24px] mobile:text-[20px]">
                {content.hero.businessTitle}
              </Heading>
              <ContactForm formId={2} />
            </div>

            <GradientDivider variant="dark" className="my-14" />

            <div>
              <Heading as="h3" color="dark" className="mb-3 text-[24px] mobile:text-[20px]">
                {content.hero.talentTitle}
              </Heading>
              <Text color="muted" size="sm" className="mb-6">
                {content.hero.talentDescription}
              </Text>
              <ContactForm formId={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
