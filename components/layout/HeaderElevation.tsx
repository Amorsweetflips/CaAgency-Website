'use client'

import { useEffect } from 'react'

export default function HeaderElevation() {
  useEffect(() => {
    const headers = document.querySelectorAll<HTMLElement>('[data-site-header]')
    let frame = 0
    let lastElevated: string | undefined
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const elevated = String(window.scrollY > 8)
        if (elevated === lastElevated) return
        lastElevated = elevated
        headers.forEach((header) => {
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
