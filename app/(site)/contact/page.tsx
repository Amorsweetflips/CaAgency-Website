import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import ContactForm from '@/components/blocks/ContactForm'
import GradientDivider from '@/components/ui/GradientDivider'
import { Metadata } from 'next'

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

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-[150px] mobile:py-[80px] px-section-x relative">
        <div className="max-w-container mx-auto relative z-10">
          <div className="max-w-[850px] mx-auto">
            {/* Contact Form Card */}
            <div className="bg-background-light rounded-[16px] shadow-[0_4px_40px_-10px_rgba(0,0,0,0.3)] py-[70px] mobile:py-[50px] px-[70px] tablet:px-[50px] mobile:px-[30px]">
              {/* Header */}
              <div className="text-center mb-10">
                <Heading as="h1" color="dark" className="mb-4 tracking-[0.1px]">
                  Let's collaborate!
                </Heading>
                <Text color="muted" size="sm" className="max-w-[550px] mx-auto">
                  Whether you're a brand looking to launch an influencer campaign or a creator ready to grow, we'd love to hear from you.
                </Text>
              </div>

              {/* Contact Form */}
              <div className="mb-2">
                <Heading as="h3" color="dark" className="mb-6 text-[24px] mobile:text-[20px]">
                  Brand & Business Inquiries
                </Heading>
                <ContactForm formId={2} />
              </div>

              <GradientDivider variant="dark" className="my-14" />

              {/* Talent Submission */}
              <div>
                <Heading as="h3" color="dark" className="mb-3 text-[24px] mobile:text-[20px]">
                  Talent Submission
                </Heading>
                <Text color="muted" size="sm" className="mb-6">
                  Are you a content creator looking to join our roster? Tell us about yourself!
                </Text>
                <ContactForm formId={3} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
