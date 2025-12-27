'use client'

import Image from 'next/image'

interface BrandCarouselProps {
  images: Array<{ url: string; alt?: string }>
}

export default function BrandCarousel({ images }: BrandCarouselProps) {
  return (
    <div className="bg-background-light py-[50px] mobile:py-[30px] overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[100px] mobile:w-[50px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

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
                  <Image
                    src={image.url}
                    alt={image.alt || `Brand ${index + 1}`}
                    fill
                    className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    sizes="90px"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Duplicate track for seamless loop */}
          <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
            {images.map((image, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center mx-[40px] mobile:mx-[20px]"
              >
                <div className="relative w-[90px] mobile:w-[60px] h-[90px] mobile:h-[60px]">
                  <Image
                    src={image.url}
                    alt={image.alt || `Brand ${index + 1}`}
                    fill
                    className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    sizes="90px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
