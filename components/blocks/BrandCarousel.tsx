import Image from 'next/image';

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
      sizes="104px"
      loading="lazy"
    />
  )
}

export default function BrandCarousel({ images }: BrandCarouselProps) {
  return (
    // marquee-defer skips all rendering (incl. the two infinite marquee
    // animations and 52 blended logo layers) while the strip is off-screen.
    <div className="marquee-defer bg-background-soft py-[50px] mobile:py-[30px] overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-linear-to-r from-background-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-linear-to-l from-background-soft to-transparent z-10 pointer-events-none" />

        {/* Marquee container. Client direction: the strip slides left → right,
            so the base marquee keyframes run in reverse; duration scales with
            the 26-logo track so the speed stays gentle. */}
        <div data-brand-strip className="flex overflow-hidden group">
          {/* First track */}
          <div className="flex shrink-0 animate-marquee [animation-direction:reverse] [animation-duration:70s] group-hover:[animation-play-state:paused]">
            {images.map((image, index) => (
              <BrandLogo key={`first-${index}`} url={image.url} alt={image.alt} />
            ))}
          </div>
          {/* Duplicate track for seamless loop — hidden from AT to avoid double announcement */}
          <div className="flex shrink-0 animate-marquee [animation-direction:reverse] [animation-duration:70s] group-hover:[animation-play-state:paused]" aria-hidden="true">
            {images.map((image, index) => (
              <BrandLogo key={`second-${index}`} url={image.url} alt={image.alt} decorative />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
