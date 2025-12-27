import Link from 'next/link'
import Image from 'next/image'
import SocialIcons from '@/components/ui/SocialIcons'
import GradientDivider from '@/components/ui/GradientDivider'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const infoMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Talents', href: '/talents' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  // Order matches Elementor: Business License first, then Privacy Policy
  const moreInfoMenuItems = [
    { label: 'Business license', href: '/business-license' },
    { label: 'Privacy policy', href: '/privacy-policy' },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/caagency/',
      icon: 'fab fa-instagram',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@caagency_',
      icon: 'fab fa-tiktok',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/caagency/',
      icon: 'fab fa-linkedin-in',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/caagencyglobal/',
      icon: 'fab fa-facebook-f',
    },
  ]

  return (
    <footer className="bg-background-dark text-foreground-white">
      {/* Gradient Divider */}
      <GradientDivider variant="light" />

      {/* Main Footer */}
      <div className="max-w-container mx-auto px-section-x py-[50px] tablet:py-[50px] tablet:px-[20px]">
        <div className="flex flex-row flex-wrap justify-between tablet:flex-wrap">
          {/* Info Column */}
          <div className="w-[10.7%] laptop:w-[162px] tablet:w-[10%] mobile:w-1/2 mobile:mb-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              Info
            </h3>
            <nav>
              <ul className="space-y-0">
                {infoMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[2em] tracking-[-0.8px] text-foreground-white hover:text-button-hover transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More Info Column */}
          <div className="w-[25%] tablet:w-[20%] mobile:w-1/2 mobile:mb-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              More info
            </h3>
            <nav>
              <ul className="space-y-0">
                {moreInfoMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[2em] tracking-[-0.8px] text-foreground-white hover:text-button-hover transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="w-[25%] tablet:w-[20%] mobile:w-full mobile:mb-0 mobile:pt-[30px]">
            <h3 className="font-anegra text-[30px] tablet:text-[25px] font-semibold tracking-[1.2px] mb-4 text-foreground-white">
              Contact
            </h3>
            <ul className="space-y-[10px]">
              <li className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white">
                Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.
              </li>
              <li>
                <a
                  href="mailto:info@caagency.com"
                  className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white hover:underline"
                >
                  info@caagency.com
                </a>
              </li>
              <li className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white">
                WA.: +971 58 510 7546
              </li>
              <li className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white">
                Registration no.: 2417532.01
              </li>
            </ul>
          </div>

          {/* Logo & Social Column */}
          <div className="w-[25%] tablet:w-[35%] mobile:w-full mobile:pt-[30px]">
            {/* White CA Logo - same interlocking design as header */}
            <Image
              src="/images/site/logo-white.svg"
              alt="CA Agency"
              width={142}
              height={143}
              className="w-[142px] tablet:w-[30%] mobile:w-[90px] h-auto mb-4"
            />
            <p className="font-work-sans text-[16px] tablet:text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white mb-0">
              CA Agency is a talent-first marketing agency that thrives on harnessing the creative power of individuals to drive innovative and impactful campaigns.
            </p>
            <h4 className="font-anegra text-[23px] font-semibold tracking-[1.2px] pt-[20px] tablet:pt-0 mb-4 text-foreground-white">
              Follow us
            </h4>
            <SocialIcons
              icons={socialLinks.map((s) => ({
                name: s.name,
                href: s.href,
                icon: s.icon,
              }))}
              size="lg"
              className="gap-[22px] tablet:gap-[18px]"
            />
            {/* Contact button - visible only on mobile */}
            <Link
              href="/contact"
              className="hidden mobile:inline-block mt-6 font-jost text-base font-medium px-6 py-3 bg-button-bg text-button-text rounded-[30px] hover:bg-button-hover transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* Desktop/Tablet Contact Button Column - hidden on mobile, aligned to top */}
          <div className="w-auto tablet:w-auto mobile:hidden flex flex-col items-start justify-start">
            <Link
              href="/contact"
              className="font-jost text-base font-medium px-6 py-3 bg-button-bg text-button-text rounded-[30px] hover:bg-button-hover transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <GradientDivider variant="light" />
      <div className="max-w-container mx-auto px-section-x py-[30px] tablet:py-[50px]">
        <p className="font-work-sans text-[14px] font-normal leading-[1.5em] tracking-[-0.8px] text-foreground-white text-center mobile:text-left">
          © {currentYear} Copyright CA Agency
        </p>
      </div>
    </footer>
  )
}
