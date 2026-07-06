'use client'

import { useEffect, useRef } from 'react'
import { m, useReducedMotion, useSpring } from 'motion/react'

/**
 * The hero's soft red glow, gently following the pointer within the hero
 * section. Listens on the parent section, drives transform only (springed
 * translate), and stays perfectly still for touch and reduced-motion users —
 * where it renders as the same static glow as before.
 */
export default function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 60, damping: 20 })
  const y = useSpring(0, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (reduce) return
    const parent = ref.current?.parentElement
    if (!parent) return

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const rect = parent.getBoundingClientRect()
      // -1..1 relative to the section center, scaled to a subtle drift
      const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      x.set(relX * 48)
      y.set(relY * 28)
    }
    const onPointerLeave = () => {
      x.set(0)
      y.set(0)
    }

    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true })
    return () => {
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduce, x, y])

  return (
    <m.div
      ref={ref}
      className="hero-glow"
      aria-hidden="true"
      style={reduce ? undefined : { x, y }}
    />
  )
}
