interface HeadingAccentProps {
  align?: 'center' | 'start'
  className?: string
}

/**
 * Small brand-gradient rule placed under a section heading for editorial rhythm.
 * Purely decorative — hidden from assistive tech. RTL-safe (uses logical
 * centering / start alignment).
 */
export default function HeadingAccent({ align = 'center', className = '' }: HeadingAccentProps) {
  return (
    <span
      aria-hidden="true"
      className={`block h-[3px] w-12 rounded-full bg-gradient-to-r from-accent-red to-[#FF74D4] ${
        align === 'center' ? 'mx-auto' : 'me-auto'
      } ${className}`}
    />
  )
}
