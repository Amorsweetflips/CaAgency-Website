interface MarqueeProps {
  items: string[]
  className?: string
}

/**
 * Seamless CSS marquee ribbon of short labels (e.g. brand names). Two identical
 * tracks translate by -50% for a loop with no seam. Pauses on hover; fully
 * static under prefers-reduced-motion (see globals.css). Decorative — the same
 * labels appear elsewhere as real content, so this is aria-hidden.
 */
export default function Marquee({ items, className = '' }: MarqueeProps) {
  if (!items?.length) return null

  const track = (
    <div className="marquee-track flex shrink-0 items-center gap-10 pe-10">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-anegra text-[22px] mobile:text-[18px] tracking-[1px] text-black/45">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-red/70" />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={`marquee group relative flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 mobile:w-12 bg-gradient-to-r from-background-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 mobile:w-12 bg-gradient-to-l from-background-base to-transparent" />
      <div className="marquee-inner flex w-max animate-marquee-x">
        {track}
        {track}
      </div>
    </div>
  )
}
