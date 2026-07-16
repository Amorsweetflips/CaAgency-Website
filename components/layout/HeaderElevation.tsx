'use client'

import { useEffect } from 'react'

export default function HeaderElevation() {
  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const elevated = String(window.scrollY > 8)
        document.querySelectorAll<HTMLElement>('[data-site-header]').forEach((header) => {
          header.dataset.elevated = elevated
        })
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
    }
  }, [])

  return null
}
