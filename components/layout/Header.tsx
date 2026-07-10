'use client'

import { useEffect, useRef, useState } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Button from '@/components/ui/Button'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [elevated, setElevated] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Flat at the top of the page; hairline + shadow once scrolling starts.
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setElevated(window.scrollY > 8)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')

  const menuItems = [
    { labelKey: 'home', href: '/' },
    { labelKey: 'about', href: '/about' },
    { labelKey: 'talents', href: '/talents' },
    { labelKey: 'work', href: '/work' },
    { labelKey: 'services', href: '/services' },
    { labelKey: 'blog', href: '/blog' },
    { labelKey: 'contact', href: '/contact' },
  ] as const

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const closeMenu = () => {
    setMobileMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-accent-red focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
      >
        {tCommon('skipToContent')}
      </a>

      {/* Desktop Header */}
      <header
        className={cn(
          'hidden md:flex bg-background-base text-foreground-primary sticky top-0 z-50 px-[20px] laptop:px-[30px] py-[10px]',
          'border-b transition-[box-shadow,border-color] duration-300',
          elevated ? 'border-black/10 shadow-e2' : 'border-transparent shadow-none'
        )}
      >
        <div className="w-full max-w-container mx-auto">
          <div className="flex items-center justify-between h-[76px]">
            {/* Left: Logo + Nav (80% width) */}
            <div className="flex items-center w-[80%] laptop:w-[80%]">
              {/* Logo */}
              <Link href="/" className="shrink-0 p-[6px]">
                <Image
                  src="/images/site/logo.svg"
                  alt="CA Agency"
                  width={343}
                  height={181}
                  className="h-[54px] w-auto object-contain"
                  priority
                />
              </Link>

              {/* Navigation */}
              <nav className="flex items-center pl-[30px]">
                <ul className="flex items-center gap-[30px] tablet:gap-[20px]">
                  {menuItems.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'relative font-jost text-[18px] tablet:text-[15px] font-normal capitalize tracking-[-0.2px] leading-[1em] transition-colors py-2',
                            // Underline grows via scale-x, not width — same look,
                            // but compositor-only instead of relayout per frame.
                            'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-accent-red after:transition-transform after:duration-300',
                            active
                              ? 'text-foreground-primary after:scale-x-100'
                              : 'text-foreground-body hover:text-foreground-primary after:scale-x-0'
                          )}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* Right: Language Switcher + Contact Button */}
            <div className="flex items-center gap-4 justify-end">
              <LanguageSwitcher />
              <Button href="/contact" size="sm" className="text-[16px] px-6 py-3">
                {tCommon('contact')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader
        onMenuClick={() => setMobileMenuOpen(true)}
        menuOpen={mobileMenuOpen}
        buttonRef={menuButtonRef}
        elevated={elevated}
      />

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMenu} />
    </>
  )
}
