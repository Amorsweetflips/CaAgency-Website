'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'

interface MobileHeaderProps {
  onMenuClick: () => void
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="md:hidden bg-background-dark text-foreground-white sticky top-0 z-50 shadow-[0_0_10px_-5px_rgba(0,0,0,0.5)]">
      <div className="px-[10px] md:px-section-x">
        <div className="flex items-center justify-between h-[70px] min-h-[70px]">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/site/logo-white.svg"
              alt="CA Agency"
              width={78}
              height={103}
              className="h-[60px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Hamburger Menu - 44px minimum touch target for accessibility */}
          <button
            onClick={onMenuClick}
            className="min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center text-foreground-white"
            aria-label="Open menu"
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8H28M5 16.5H28M5 25H28"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
