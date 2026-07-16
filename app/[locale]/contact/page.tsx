import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import Heading from '@/components/ui/Heading'
import HeadingAccent from '@/components/ui/HeadingAccent'
import Text from '@/components/ui/Text'
import ContactForm from '@/components/blocks/ContactForm'
import GradientDivider from '@/components/ui/GradientDivider'
import { buildPageMetadata } from '@/lib/seo/metadata'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/contact',
    keywords: [
      'contact CA Agency',
      'influencer marketing inquiry',
      'brand partnership',
      'talent submission',
      'influencer agency contact',
      'Dubai marketing agency',
    ],
    imageAlt: 'Contact CA Agency',
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={{ contactForm: messages.contactForm }}
    >
      {/* Hero Section */}
      <section className="bg-background-soft py-[150px] mobile:py-[80px] px-section-x relative overflow-hidden">
        <div className="max-w-container mx-auto relative z-10">
          <div className="max-w-[850px] mx-auto">
            {/* Contact Form Card */}
            <div className="hero-rise-media bg-background-light rounded-[16px] shadow-[0_4px_40px_-10px_rgba(0,0,0,0.15)] py-[70px] mobile:py-[50px] px-[70px] tablet:px-[50px] mobile:px-[30px]">
              {/* Header */}
              <div className="text-center mb-10">
                <Heading as="h1" color="dark" className="mb-4 tracking-[0.1px]">
                  {t('heading')}
                </Heading>
                <Text color="muted" size="sm" className="max-w-[550px] mx-auto">
                  {t('brandDescription')}
                </Text>
              </div>

              {/* Contact Form */}
              <div className="mb-2">
                <Heading as="h2" color="dark" className="mb-4 text-[24px] mobile:text-[20px]">
                  {t('brandInquiries')}
                </Heading>
                <HeadingAccent align="start" className="mb-6" />
                <ContactForm formId={2} />
              </div>

              <GradientDivider variant="dark" className="my-14" />

              {/* Talent Submission */}
              <div>
                <Heading as="h2" color="dark" className="mb-3 text-[24px] mobile:text-[20px]">
                  {t('talentSubmission')}
                </Heading>
                <HeadingAccent align="start" className="mb-4" />
                <Text color="muted" size="sm" className="mb-6">
                  {t('talentDescription')}
                </Text>
                <ContactForm formId={3} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </NextIntlClientProvider>
  )
}
