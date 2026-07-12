'use client'

import { useEffect, useRef, useState } from 'react'
import MobileHeader from '@/components/layout/MobileHeader'
import MobileMenu from '@/components/layout/MobileMenu'
import type { HeaderLabels } from '@/components/layout/header-types'

export default function MobileNavigation({
  locale,
  labels,
}: {
  locale: string
  labels: HeaderLabels
}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('caagency:mobile-menu', { detail: { open } }))
  }, [open])

  const close = () => {
    setOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <>
      <MobileHeader
        locale={locale}
        label={labels.openMenu}
        onMenuClick={() => setOpen(true)}
        menuOpen={open}
        buttonRef={buttonRef}
      />
      <MobileMenu locale={locale} labels={labels} isOpen={open} onClose={close} />
    </>
  )
}
