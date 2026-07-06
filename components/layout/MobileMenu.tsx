'use client'

import { useEffect, useRef } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Move focus into the dialog when it opens
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape closes; Tab cycles within the dialog (focus trap)
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const menuItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('talents'), href: '/talents' },
    { label: t('work'), href: '/work' },
    { label: t('services'), href: '/services' },
    { label: t('blog'), href: '/blog' },
    { label: t('contact'), href: '/contact' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  if (!isOpen) return null

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      className="fixed inset-0 z-100 bg-background-base md:hidden"
    >
      <div className="flex flex-col h-full">
        {/* Close Button - 44px minimum touch target for accessibility */}
        <div className="flex justify-end p-5">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center text-foreground-primary"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items - improved touch targets */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-4">
          {menuItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'font-jost text-xl font-normal capitalize transition-colors py-3 px-6 min-h-[44px] flex items-center',
                  active
                    ? 'text-foreground-primary underline decoration-accent-red decoration-2 underline-offset-8'
                    : 'text-foreground-body hover:text-foreground-primary'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Language Switcher */}
        <div className="flex justify-center pb-8">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
