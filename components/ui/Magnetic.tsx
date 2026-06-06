'use client'

import { useRef, type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  /** Fraction of cursor offset applied as translation (kept small for taste). */
  strength?: number
  className?: string
}

/**
 * Subtle magnetic hover: the wrapped element drifts toward the cursor. Only
 * active on fine-pointer (mouse) devices with motion allowed, so touch and
 * reduced-motion users get a normal static button.
 */
export default function Magnetic({ children, strength = 0.2, className = '' }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return
    }
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  )
}
