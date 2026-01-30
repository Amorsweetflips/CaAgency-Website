'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Talents', href: '/talents' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background-dark md:hidden">
      <div className="flex flex-col h-full">
        {/* Close Button - 44px minimum touch target for accessibility */}
        <div className="flex justify-end p-5">
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] w-[44px] h-[44px] flex items-center justify-center text-foreground-white"
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
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="font-jost text-xl font-normal capitalize text-foreground-white hover:text-foreground-white transition-colors py-3 px-6 min-h-[44px] flex items-center"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
