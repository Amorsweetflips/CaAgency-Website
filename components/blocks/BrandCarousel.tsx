'use client'

import { useState } from 'react';
import Image from 'next/image';

interface BrandCarouselProps {
  images: Array<{ url: string; alt?: string }>
}

function BrandLogo({
  url,
  alt,
  index,
}: {
  url: string
  alt?: string
  index: number
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[12px] border border-black/10 bg-black/[0.03] text-[10px] font-medium uppercase tracking-[0.2em] text-black/35">
        Brand
      </div>
    )
  }

  return (
    <Image
      src={url}
      alt={alt || ''}
      fill
      className="object-contain grayscale opacity-75 hover:opacity-100 transition-opacity duration-500 [mix-blend-mode:multiply]"
      sizes="90px"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

export default function BrandCarousel({ images }: BrandCarouselProps) {
  return (
    <div className="bg-background-soft py-[50px] mobile:py-[30px] overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-linear-to-r from-background-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-linear-to-l from-background-soft to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="flex overflow-hidden group">
          {/* First track */}
          <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
            {images.map((image, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center mx-[40px] mobile:mx-[20px]"
              >
                <div className="relative w-[90px] mobile:w-[60px] h-[90px] mobile:h-[60px]">
                  <BrandLogo url={image.url} alt={image.alt} index={index} />
                </div>
              </div>
            ))}
          </div>
          {/* Duplicate track for seamless loop — hidden from AT to avoid double announcement */}
          <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
            {images.map((image, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center mx-[40px] mobile:mx-[20px]"
              >
                <div className="relative w-[90px] mobile:w-[60px] h-[90px] mobile:h-[60px]">
                  <BrandLogo url={image.url} alt={image.alt} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
