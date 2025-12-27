import Heading from '@/components/ui/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for CA Agency. Read our terms and conditions governing the use of our influencer marketing services and website.',
  alternates: {
    canonical: 'https://caagency.com/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <section className="bg-background-light py-[100px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <div className="max-w-[900px]">
          <Heading as="h1" color="dark" className="mb-6 font-brasika">
            Terms of Service
          </Heading>

          <p className="font-work-sans text-[15px] text-gray-600 mb-10">
            <strong>Last updated: December 27, 2024</strong>
          </p>

          <div className="space-y-10 font-work-sans text-[16px] leading-[30px] text-foreground-dark">
            {/* Introduction */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to CA Agency. These Terms of Service ("Terms") govern your access to and use of our website at{' '}
                <a href="https://caagency.com" className="text-accent-red hover:underline font-medium">
                  caagency.com
                </a>{' '}
                and all related services provided by CA Agency.
              </p>
              <p>
                CA Agency is a company registered in Dubai, United Arab Emirates, located at Meydan Grandstand, 6th
                floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E. (Registration No. 2417532.01). By accessing or using our
                services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use
                our services.
              </p>
            </div>

            {/* Definitions */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                2. Definitions
              </h2>
              <ul className="list-disc space-y-3 ml-6">
                <li>
                  <strong>"Agency"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>{' '}
                  refers to CA Agency.
                </li>
                <li>
                  <strong>"Client"</strong> or <strong>"Brand"</strong> refers to any company, organization, or
                  individual engaging our services for influencer marketing campaigns.
                </li>
                <li>
                  <strong>"Talent"</strong>, <strong>"Creator"</strong>, or <strong>"Influencer"</strong> refers to
                  content creators represented by or working with CA Agency.
                </li>
                <li>
                  <strong>"Services"</strong> refers to influencer marketing, talent management, content creation,
                  campaign management, and all related services provided by CA Agency.
                </li>
                <li>
                  <strong>"User"</strong> or <strong>"you"</strong> refers to any person accessing our website or
                  services.
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                3. Our Services
              </h2>
              <p className="mb-4">CA Agency provides the following services:</p>
              <ul className="list-disc space-y-2 ml-6 mb-4">
                <li>Influencer marketing strategy and campaign management</li>
                <li>Talent management and representation</li>
                <li>Brand-influencer partnership facilitation</li>
                <li>Content creation and creative direction</li>
                <li>Social media marketing across Instagram, TikTok, and YouTube</li>
                <li>Performance analytics and campaign reporting</li>
              </ul>
              <p>
                The specific scope, deliverables, and terms of any engagement will be outlined in separate agreements or
                statements of work executed between CA Agency and the Client or Talent.
              </p>
            </div>

            {/* Client Obligations */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                4. Client Obligations
              </h2>
              <p className="mb-4">As a Client engaging our services, you agree to:</p>
              <ul className="list-disc space-y-2 ml-6">
                <li>Provide accurate and complete information about your brand and campaign requirements</li>
                <li>Supply all necessary brand assets, guidelines, and materials in a timely manner</li>
                <li>Review and approve content within agreed timeframes</li>
                <li>Make payments according to the agreed payment schedule</li>
                <li>Comply with all applicable advertising regulations and disclosure requirements</li>
                <li>Not engage in any activities that could harm the reputation of CA Agency or its Talents</li>
              </ul>
            </div>

            {/* Talent Obligations */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                5. Talent Obligations
              </h2>
              <p className="mb-4">As a Talent represented by or working with CA Agency, you agree to:</p>
              <ul className="list-disc space-y-2 ml-6">
                <li>Create and deliver content according to agreed specifications and timelines</li>
                <li>Maintain authenticity and transparency in all brand partnerships</li>
                <li>Comply with platform terms of service and applicable advertising disclosure requirements</li>
                <li>Not enter into conflicting arrangements without prior disclosure</li>
                <li>Maintain professional conduct in all client interactions</li>
                <li>Accurately represent engagement metrics and audience demographics</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                6. Intellectual Property
              </h2>
              <p className="mb-4">
                All content, trademarks, logos, and intellectual property displayed on the CA Agency website are the
                property of CA Agency or its licensors and are protected by applicable intellectual property laws.
              </p>
              <p className="mb-4">
                Content created as part of influencer campaigns is subject to the intellectual property terms specified
                in the individual campaign agreements. Unless otherwise agreed:
              </p>
              <ul className="list-disc space-y-2 ml-6">
                <li>Creators retain ownership of their original content</li>
                <li>Clients receive a license to use campaign content as specified in their agreement</li>
                <li>CA Agency may showcase campaign work for portfolio and promotional purposes</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                7. Payment Terms
              </h2>
              <p className="mb-4">
                Payment terms for services are outlined in individual client agreements. General payment policies
                include:
              </p>
              <ul className="list-disc space-y-2 ml-6">
                <li>Payment schedules as agreed in writing between parties</li>
                <li>All fees are quoted in the currency specified in the agreement</li>
                <li>Late payments may incur interest charges as permitted by UAE law</li>
                <li>CA Agency reserves the right to suspend services for accounts with outstanding balances</li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                8. Confidentiality
              </h2>
              <p>
                All parties agree to maintain the confidentiality of proprietary information shared during the course of
                business. This includes but is not limited to campaign strategies, pricing, client lists, performance
                data, and any information marked as confidential. Confidentiality obligations survive the termination of
                any agreement.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                9. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the maximum extent permitted by applicable law, CA Agency shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc space-y-2 ml-6 mb-4">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or content</li>
                <li>Reputational damage</li>
                <li>Third-party claims</li>
              </ul>
              <p>
                Our total liability for any claims arising from our services shall not exceed the fees paid by the
                Client for the specific services giving rise to the claim.
              </p>
            </div>

            {/* Indemnification */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                10. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless CA Agency, its officers, directors, employees, and
                agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable
                legal fees) arising out of or in any way connected with your use of our services, violation of these
                Terms, or infringement of any third-party rights.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                11. Termination
              </h2>
              <p className="mb-4">
                Either party may terminate an engagement according to the terms specified in the applicable agreement.
                Upon termination:
              </p>
              <ul className="list-disc space-y-2 ml-6">
                <li>All outstanding payments become immediately due</li>
                <li>Confidentiality obligations remain in effect</li>
                <li>License grants for content continue as specified in the agreement</li>
                <li>CA Agency may retain campaign data and materials for portfolio purposes unless otherwise agreed</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                12. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the United Arab Emirates.
                Any disputes arising from these Terms or your use of our services shall be subject to the exclusive
                jurisdiction of the courts of Dubai, UAE. The parties agree to first attempt to resolve any disputes
                through good-faith negotiation before initiating formal legal proceedings.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                13. Modifications to Terms
              </h2>
              <p>
                CA Agency reserves the right to modify these Terms at any time. Changes will be effective immediately
                upon posting to our website. Your continued use of our services after any modifications indicates your
                acceptance of the updated Terms. We encourage you to review these Terms periodically for any changes.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-4 tracking-wide">
                14. Contact Information
              </h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
