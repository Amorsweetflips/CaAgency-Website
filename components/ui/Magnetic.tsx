'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  /** Fraction of cursor offset applied as translation (kept small for taste). */
  strength?: number
  className?: string
}

// MediaQueryList objects are live, so create them once per page instead of
// twice per mousemove (which can fire at up to 1000Hz on gaming mice).
let reducedMotionQuery: MediaQueryList | null = null
let finePointerQuery: MediaQueryList | null = null

function allowsMagnetic(): boolean {
  if (typeof window === 'undefined') return false
  reducedMotionQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)')
  finePointerQuery ??= window.matchMedia('(hover: hover) and (pointer: fine)')
  return !reducedMotionQuery.matches && finePointerQuery.matches
}

/**
 * Subtle magnetic hover: the wrapped element drifts toward the cursor. Only
 * active on fine-pointer (mouse) devices with motion allowed, so touch and
 * reduced-motion users get a normal static button.
 */
export default function Magnetic({ children, strength = 0.2, className = '' }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Rect is read once on enter (while the transform is still neutral) instead
  // of per mousemove — getBoundingClientRect forces a layout read, and reading
  // it mid-drift also fed the active transform back into the math.
  const rectRef = useRef<DOMRect | null>(null)
  const pointRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(0)

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const handleEnter = () => {
    const el = ref.current
    if (!el || !allowsMagnetic()) return
    rectRef.current = el.getBoundingClientRect()
    el.style.willChange = 'transform'
  }

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!rectRef.current) return
    pointRef.current = { x: e.clientX, y: e.clientY }
    // Mousemove outpaces the display refresh rate — batch writes to one
    // transform per frame.
    if (frameRef.current) return
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0
      const el = ref.current
      const rect = rectRef.current
      if (!el || !rect) return
      const x = (pointRef.current.x - (rect.left + rect.width / 2)) * strength
      const y = (pointRef.current.y - (rect.top + rect.height / 2)) * strength
      el.style.transform = `translate(${x}px, ${y}px)`
    })
  }

  const reset = () => {
    rectRef.current = null
    cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    const el = ref.current
    if (el) {
      el.style.transform = ''
      el.style.willChange = ''
    }
  }

  return (
    <span
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  )
}
