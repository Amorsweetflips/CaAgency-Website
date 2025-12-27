import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy of CA Agency explaining which personal data we collect, for which purposes, and how we handle your personal data in compliance with UAE regulations.',
  alternates: {
    canonical: 'https://caagency.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-background-light py-[100px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <div className="max-w-[900px]">
          <Heading as="h1" color="dark" className="mb-6">
            Privacy Policy
          </Heading>

          <p className="font-work-sans text-[15px] text-gray-600 mb-10">
            <strong>Last updated: December 27, 2024</strong>
          </p>

          <div className="space-y-10 font-work-sans text-[16px] leading-[30px] text-foreground-dark">
            {/* Introduction */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                1. Introduction
              </h2>
              <p className="mb-4">
                This is the Privacy Policy of CA Agency (hereinafter: "CA Agency", "we", "us", or "our"), a company
                registered and located at Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
                (License No. 2417532.01).
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you
                visit our website at{' '}
                <a href="https://caagency.com" className="text-accent-red hover:underline font-medium">
                  caagency.com
                </a>{' '}
                or use our influencer marketing and talent management services. We are committed to protecting your
                privacy and handling your personal data with care, in accordance with the UAE Federal Decree-Law No. 45
                of 2021 on the Protection of Personal Data (PDPL) and other applicable data protection regulations.
              </p>
            </div>

            {/* Data Controller */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                2. Data Controller
              </h2>
              <p className="mb-4">
                CA Agency is the data controller responsible for your personal data. For any questions regarding this
                Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
                <p className="mb-2 text-[18px] font-semibold">CA Agency</p>
                <p className="mb-2">Meydan Grandstand, 6th floor, Meydan Road</p>
                <p className="mb-2">Nad Al Sheba, Dubai, U.A.E.</p>
                <p className="mb-4">Registration No.: 2417532.01</p>
                <p>
                  Email:{' '}
                  <a href="mailto:info@caagency.com" className="text-accent-red hover:underline font-medium">
                    info@caagency.com
                  </a>
                </p>
              </div>
            </div>

            {/* What Data We Collect */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                3. What Personal Data We Collect
              </h2>
              <p className="mb-4">We may collect the following categories of personal data:</p>

              <h3 className="font-anegra font-semibold text-foreground-dark mb-3 text-[20px] tracking-[1px]">Information you provide directly:</h3>
              <ul className="list-disc space-y-2 ml-6 mb-6">
                <li>
                  <strong>Contact information:</strong> Name, email address, phone number, company name
                </li>
                <li>
                  <strong>Professional information:</strong> Job title, social media handles, portfolio links
                </li>
                <li>
                  <strong>Talent application data:</strong> Photos, videos, social media statistics, demographic
                  information
                </li>
                <li>
                  <strong>Business inquiry details:</strong> Campaign requirements, budget information, brand details
                </li>
                <li>
                  <strong>Communication records:</strong> Messages sent through our contact forms or email
                </li>
              </ul>

              <h3 className="font-anegra font-semibold text-foreground-dark mb-3 text-[20px] tracking-[1px]">Information collected automatically:</h3>
              <ul className="list-disc space-y-2 ml-6">
                <li>
                  <strong>Device information:</strong> IP address, browser type, operating system
                </li>
                <li>
                  <strong>Usage data:</strong> Pages visited, time spent on site, referral source
                </li>
                <li>
                  <strong>Cookies and similar technologies:</strong> As described in our cookie notice
                </li>
              </ul>
            </div>

            {/* How We Use Data */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                4. How We Use Your Personal Data
              </h2>
              <p className="mb-4">We process your personal data for the following purposes:</p>
              <ul className="list-disc space-y-2 ml-6">
                <li>
                  <strong>Service delivery:</strong> To provide our influencer marketing and talent management services
                </li>
                <li>
                  <strong>Communication:</strong> To respond to inquiries and communicate about our services
                </li>
                <li>
                  <strong>Talent matching:</strong> To connect brands with suitable influencers for campaigns
                </li>
                <li>
                  <strong>Business operations:</strong> To manage contracts, payments, and business relationships
                </li>
                <li>
                  <strong>Marketing:</strong> To send relevant updates about our services (with your consent)
                </li>
                <li>
                  <strong>Website improvement:</strong> To analyze usage patterns and enhance user experience
                </li>
                <li>
                  <strong>Legal compliance:</strong> To comply with applicable laws and regulations
                </li>
                <li>
                  <strong>Security:</strong> To protect against fraud and unauthorized access
                </li>
              </ul>
            </div>

            {/* Legal Basis */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                5. Legal Basis for Processing
              </h2>
              <p className="mb-4">
                We process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc space-y-2 ml-6">
                <li>
                  <strong>Contract performance:</strong> Processing necessary for services you have requested
                </li>
                <li>
                  <strong>Legitimate interests:</strong> Processing for our business operations and improvements
                </li>
                <li>
                  <strong>Legal obligation:</strong> Processing required by applicable laws
                </li>
                <li>
                  <strong>Consent:</strong> Processing based on your explicit consent (e.g., marketing communications)
                </li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                6. How We Share Your Data
              </h2>
              <p className="mb-4">
                We treat all personal data as strictly confidential. We may share your personal data with:
              </p>
              <ul className="list-disc space-y-2 ml-6 mb-4">
                <li>
                  <strong>Clients and brands:</strong> Talent profiles shared with potential brand partners (with
                  consent)
                </li>
                <li>
                  <strong>Service providers:</strong> Third-party vendors who assist in our operations (e.g., hosting,
                  analytics)
                </li>
                <li>
                  <strong>Legal authorities:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales
                </li>
              </ul>
              <p>
                We require all third parties to respect the security of your personal data and treat it in accordance
                with applicable law. We do not sell your personal data to third parties.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                7. International Data Transfers
              </h2>
              <p>
                As a global influencer marketing agency, we may transfer your personal data to countries outside the
                UAE. When we do so, we ensure appropriate safeguards are in place to protect your data in accordance
                with applicable data protection laws, including contractual clauses and security measures that meet
                international standards.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                8. Data Retention
              </h2>
              <p className="mb-4">
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was
                collected, including:
              </p>
              <ul className="list-disc space-y-2 ml-6">
                <li>Active client relationships: Duration of engagement plus 7 years</li>
                <li>Talent applications: Up to 3 years from submission</li>
                <li>General inquiries: Up to 2 years from last contact</li>
                <li>Legal and compliance records: As required by applicable law</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                9. Your Rights
              </h2>
              <p className="mb-4">
                Under applicable data protection laws, you have the following rights regarding your personal data:
              </p>
              <ul className="list-disc space-y-2 ml-6 mb-4">
                <li>
                  <strong>Right of access:</strong> Request a copy of the personal data we hold about you
                </li>
                <li>
                  <strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data
                </li>
                <li>
                  <strong>Right to erasure:</strong> Request deletion of your personal data in certain circumstances
                </li>
                <li>
                  <strong>Right to restrict processing:</strong> Request limitation of how we use your data
                </li>
                <li>
                  <strong>Right to data portability:</strong> Request transfer of your data to another service
                </li>
                <li>
                  <strong>Right to object:</strong> Object to processing based on legitimate interests
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> Withdraw consent at any time where processing is based on
                  consent
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:info@caagency.com" className="text-accent-red hover:underline font-medium">
                  info@caagency.com
                </a>
                . We will respond to your request within 30 days. Please note that we can only process requests that
                relate to your own personal data.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                10. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4">
                Our website uses cookies and similar tracking technologies to enhance your experience. These include:
              </p>
              <ul className="list-disc space-y-2 ml-6 mb-4">
                <li>
                  <strong>Essential cookies:</strong> Required for website functionality
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how visitors interact with our site
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to deliver relevant advertisements
                </li>
              </ul>
              <p>
                You can manage cookie preferences through your browser settings. Please note that disabling certain
                cookies may affect website functionality.
              </p>
            </div>

            {/* Security */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                11. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access
                controls, secure hosting, and regular security assessments. However, no method of transmission over the
                Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                12. Children's Privacy
              </h2>
              <p>
                Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal
                data from children under 16 without parental or guardian consent. If you believe we have inadvertently
                collected data from a minor without appropriate consent, please contact us immediately at{' '}
                <a href="mailto:info@caagency.com" className="text-accent-red hover:underline font-medium">
                  info@caagency.com
                </a>
                , and we will promptly delete such information.
              </p>
            </div>

            {/* Third-Party Links */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                13. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites, including social media platforms. We are not
                responsible for the privacy practices of these external sites. We encourage you to review the privacy
                policies of any third-party sites you visit.
              </p>
            </div>

            {/* Changes to Policy */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                14. Changes to This Privacy Policy
              </h2>
              <p>
                CA Agency reserves the right to update this Privacy Policy at any time. Changes will be effective
                immediately upon posting to our website. We will indicate the date of the most recent update at the top
                of this page. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-anegra text-[28px] text-foreground-dark mb-4 tracking-[1.2px] font-semibold">
                15. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact
                us:
              </p>
              <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.08)] mb-6">
                <p className="mb-2 text-[18px] font-semibold">CA Agency</p>
                <p className="mb-2">Meydan Grandstand, 6th floor, Meydan Road</p>
                <p className="mb-2">Nad Al Sheba, Dubai, U.A.E.</p>
                <p className="mb-4">Registration No.: 2417532.01</p>
                <p className="mb-2">
                  Email:{' '}
                  <a href="mailto:info@caagency.com" className="text-accent-red hover:underline font-medium">
                    info@caagency.com
                  </a>
                </p>
                <p>
                  WhatsApp:{' '}
                  <a href="https://wa.me/971585107546" className="hover:text-accent-red transition-colors">
                    +971 58 510 7546
                  </a>
                </p>
              </div>
              <p>
                See also our{' '}
                <Link href="/terms-of-service" className="text-accent-red hover:underline font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/business-license" className="text-accent-red hover:underline font-medium">
                  Business License
                </Link>{' '}
                for additional information about CA Agency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
