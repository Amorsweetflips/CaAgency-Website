import { Metadata } from 'next'
import LegalContentPage from '@/components/site/LegalContentPage'
import { getSiteContent } from '@/lib/site-content/service'
import { LegalPageContent } from '@/lib/site-content/site-types'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for CA Agency covering use of the website, services, payments, intellectual property, and legal conditions.',
  alternates: {
    canonical: 'https://caagency.com/terms-of-service',
  },
}

export default async function TermsOfServicePage() {
  const content = await getSiteContent<LegalPageContent>('terms-of-service')
  return <LegalContentPage content={content} />
}
