import { Metadata } from 'next'
import LegalContentPage from '@/components/site/LegalContentPage'
import { getSiteContent } from '@/lib/site-content/service'
import { LegalPageContent } from '@/lib/site-content/site-types'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy of CA Agency explaining which personal data we collect, for which purposes, and how we handle your personal data in compliance with UAE regulations.',
  alternates: {
    canonical: 'https://caagency.com/privacy-policy',
  },
}

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent<LegalPageContent>('privacy-policy')
  return <LegalContentPage content={content} />
}
