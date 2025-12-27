import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business License',
  description:
    'CA Agency business license and registration information. Licensed influencer marketing agency in Dubai, UAE. Registration No. 2417532.01.',
  alternates: {
    canonical: 'https://caagency.com/business-license',
  },
}

export default function BusinessLicensePage() {
  return (
    <section className="bg-background-light py-[100px] mobile:py-[50px] px-section-x">
      <div className="max-w-container mx-auto">
        <Heading as="h1" color="dark" className="mb-8 font-brasika">
          Business License
        </Heading>
        <div className="flex flex-col md:flex-row gap-[50px]">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/site/business-license.webp"
              alt="CA Agency Business License - Dubai UAE Registration"
              width={600}
              height={800}
              className="rounded-[15px] shadow-lg"
              priority
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="font-work-sans text-[15px] leading-[28px] text-muted">
              <h2 className="font-anegra text-[24px] text-foreground-dark mb-6">
                Company Information
              </h2>
              <div className="bg-background-dark/5 rounded-[15px] p-6 mb-6">
                <p className="mb-3">
                  <strong className="text-foreground-dark">Company Name:</strong>
                  <br />
                  CA Agency
                </p>
                <p className="mb-3">
                  <strong className="text-foreground-dark">Registration Number:</strong>
                  <br />
                  2417532.01
                </p>
                <p className="mb-3">
                  <strong className="text-foreground-dark">Registered Address:</strong>
                  <br />
                  Meydan Grandstand, 6th floor
                  <br />
                  Meydan Road, Nad Al Sheba
                  <br />
                  Dubai, U.A.E.
                </p>
                <p className="mb-3">
                  <strong className="text-foreground-dark">Contact Email:</strong>
                  <br />
                  <a href="mailto:info@caagency.com" className="text-accent-red hover:underline">
                    info@caagency.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground-dark">WhatsApp:</strong>
                  <br />
                  +971 58 510 7546
                </p>
              </div>

              <h3 className="font-anegra text-[20px] text-foreground-dark mb-4">
                About CA Agency
              </h3>
              <p className="mb-4">
                CA Agency is a licensed full-service influencer marketing agency based in Dubai, United Arab Emirates.
                Founded in 2020, we specialize in connecting global brands with top-tier content creators across
                Instagram, TikTok, and YouTube.
              </p>
              <p className="mb-6">
                Our agency operates in compliance with UAE business regulations and is registered with the relevant
                authorities in Dubai.
              </p>

              <h3 className="font-anegra text-[20px] text-foreground-dark mb-4">
                Legal Documents
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms-of-service" className="text-accent-red hover:underline">
                    Terms of Service →
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-accent-red hover:underline">
                    Privacy Policy →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
