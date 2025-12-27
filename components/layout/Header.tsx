'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Talents', href: '/talents' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden tablet:hidden md:flex bg-background-dark text-foreground-white sticky top-0 z-50 shadow-[0_0_10px_-5px_rgba(0,0,0,0.5)] px-[20px] laptop:px-[30px] py-[10px]">
        <div className="w-full max-w-container mx-auto">
          <div className="flex items-center justify-between h-[90px]">
            {/* Left: Logo + Nav (80% width) */}
            <div className="flex items-center w-[80%] laptop:w-[80%]">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 p-[10px]">
                <Image
                  src="/images/site/logo-white.svg"
                  alt="CA Agency"
                  width={100}
                  height={100}
                  className="h-[70px] w-auto object-contain"
                  priority
                />
              </Link>

              {/* Navigation */}
              <nav className="flex items-center pl-[30px]">
                <ul className="flex items-center gap-[30px] tablet:gap-[30px]">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-jost text-[18px] tablet:text-[14px] font-normal capitalize tracking-[-0.2px] leading-[1em] text-foreground-white hover:text-foreground-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right: Contact Button (20% width) */}
            <div className="w-[20%] flex justify-end">
              <Link
                href="/contact"
                className="font-jost text-base font-medium px-6 py-3 bg-button-bg text-button-text rounded-[30px] hover:bg-button-hoverWhite transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
