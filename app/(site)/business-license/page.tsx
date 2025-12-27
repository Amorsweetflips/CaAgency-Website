import Heading from '@/components/ui/Heading'
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
        <Heading as="h1" color="dark" className="mb-10 font-brasika">
          Business License
        </Heading>
        <div className="flex flex-col lg:flex-row gap-[60px]">
          {/* License Image */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-[20px] p-4 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/site/business-license.webp"
                alt="CA Agency Business License - Dubai UAE Registration"
                width={600}
                height={800}
                className="rounded-[12px] w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Company Info */}
          <div className="w-full lg:w-1/2">
            {/* Company Information Card */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.08)] mb-8">
              <h2 className="font-anegra text-[26px] text-foreground-dark mb-6 tracking-wide">
                Company Information
              </h2>
              
              <div className="space-y-5 font-work-sans text-[16px]">
                <div>
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    Company Name
                  </span>
                  <span className="text-foreground-dark font-medium text-[18px]">
                    CA Agency L.L.C-FZ
                  </span>
                </div>

                <div>
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    License Number
                  </span>
                  <span className="text-foreground-dark font-medium text-[18px]">
                    2417532.01
                  </span>
                </div>

                <div>
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    Company Type
                  </span>
                  <span className="text-foreground-dark font-medium">
                    Limited Liability Company (Free Zone)
                  </span>
                </div>

                <div>
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    Registered Address
                  </span>
                  <span className="text-foreground-dark font-medium leading-relaxed block">
                    Meydan Grandstand, 6th floor<br />
                    Meydan Road, Nad Al Sheba<br />
                    Dubai, U.A.E.
                  </span>
                </div>

                <div>
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    Manager
                  </span>
                  <span className="text-foreground-dark font-medium">
                    Ilias Chaabit
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    Contact Email
                  </span>
                  <a 
                    href="mailto:info@caagency.com" 
                    className="text-accent-red font-medium hover:underline text-[18px]"
                  >
                    info@caagency.com
                  </a>
                </div>

                <div>
                  <span className="text-[13px] uppercase tracking-[2px] text-gray-500 block mb-1">
                    WhatsApp
                  </span>
                  <a 
                    href="https://wa.me/971585107546" 
                    className="text-foreground-dark font-medium hover:text-accent-red transition-colors text-[18px]"
                  >
                    +971 58 510 7546
                  </a>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.08)] mb-8">
              <h3 className="font-anegra text-[22px] text-foreground-dark mb-4 tracking-wide">
                About CA Agency
              </h3>
              <p className="font-work-sans text-[15px] leading-[26px] text-gray-700 mb-4">
                CA Agency is a licensed full-service influencer marketing agency based in Dubai, United Arab Emirates. 
                Founded in 2020, we specialize in connecting global brands with top-tier content creators across 
                Instagram, TikTok, and YouTube.
              </p>
              <p className="font-work-sans text-[15px] leading-[26px] text-gray-700">
                Our agency operates in compliance with UAE business regulations and is registered under the 
                Meydan Free Zone authority.
              </p>
            </div>

            {/* Legal Documents */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
              <h3 className="font-anegra text-[22px] text-foreground-dark mb-4 tracking-wide">
                Legal Documents
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/terms-of-service" 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px] hover:bg-gray-100 transition-colors group"
                >
                  <span className="font-work-sans font-medium text-foreground-dark">Terms of Service</span>
                  <span className="text-accent-red group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link 
                  href="/privacy-policy" 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px] hover:bg-gray-100 transition-colors group"
                >
                  <span className="font-work-sans font-medium text-foreground-dark">Privacy Policy</span>
                  <span className="text-accent-red group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
