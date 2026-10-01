import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface BrandCarouselProps {
  images: Array<{ url: string; alt?: string }>
}

function BrandLogo({
  url,
  alt,
  decorative = false,
}: {
  url: string
  alt?: string
  decorative?: boolean
}) {
  return (
    <Image
      src={url}
      alt={decorative ? '' : alt || ''}
      width={104}
      height={78}
      className="brand-logo mx-[36px] h-[78px] w-[104px] shrink-0 object-contain grayscale opacity-75 transition-opacity duration-500 hover:opacity-100 [mix-blend-mode:multiply] mobile:mx-[18px] mobile:h-[52px] mobile:w-[73px]"
      sizes="(max-width: 767px) 73px, 104px"
      loading="lazy"
    />
  )
}

export default function BrandCarousel({ images }: BrandCarouselProps) {
  const t = useTranslations('common')

  return (
    // marquee-defer skips all rendering (incl. the two infinite marquee
    // animations and 52 blended logo layers) while the strip is off-screen.
    <div className="marquee-defer group/brands relative bg-background-soft py-[50px] mobile:py-[30px] overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-linear-to-r from-background-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-linear-to-l from-background-soft to-transparent z-10 pointer-events-none" />

        {/* Marquee container. Client direction: the strip slides left → right,
            so the base marquee keyframes run in reverse; duration scales with
            the 26-logo track so the speed stays gentle. Pinned to LTR: in an RTL
            flex row both tracks start off-screen and the strip runs blank. */}
        <div data-brand-strip dir="ltr" className="flex overflow-hidden group">
          {/* First track */}
          <div className="flex shrink-0 animate-marquee [animation-direction:reverse] [animation-duration:70s] group-hover:[animation-play-state:paused] group-has-[input:checked]/brands:[animation-play-state:paused]">
            {images.map((image, index) => (
              <BrandLogo key={`first-${index}`} url={image.url} alt={image.alt} />
            ))}
          </div>
          {/* Duplicate track for seamless loop — hidden from AT to avoid double announcement */}
          <div className="flex shrink-0 animate-marquee [animation-direction:reverse] [animation-duration:70s] group-hover:[animation-play-state:paused] group-has-[input:checked]/brands:[animation-play-state:paused]" aria-hidden="true">
            {images.map((image, index) => (
              <BrandLogo key={`second-${index}`} url={image.url} alt={image.alt} decorative />
            ))}
          </div>
        </div>
      </div>

      {/* CSS-only pause toggle (WCAG 2.2.2) so touch and keyboard users can
          stop the strip; the global reduced-motion rule already stops it. */}
      <label className="absolute bottom-1 end-2 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-black/50 transition-colors hover:text-black has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-black motion-reduce:hidden mobile:bottom-0">
        <input type="checkbox" className="sr-only" />
        <span className="sr-only">{t('pauseLogos')}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="group-has-[input:checked]/brands:hidden">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="hidden group-has-[input:checked]/brands:block">
          <path d="M8 5v14l11-7z" />
        </svg>
      </label>
    </div>
  )
}
