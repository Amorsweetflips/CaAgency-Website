import Image from 'next/image'
import type { MediaCarouselProps } from '@/components/blocks/MediaCarousel'

export default function MediaCarouselFallback({
  items,
  className = '',
}: MediaCarouselProps) {
  const firstItem = items[0]
  const imageSource = firstItem?.type === 'video' ? firstItem.poster : firstItem?.src

  return (
    <div className={`media-carousel ${className}`} aria-hidden="true">
      <div className="relative">
        <div className="relative h-[600px] w-[340px] overflow-hidden rounded-[20px] bg-black/5 tablet:h-[530px] tablet:w-[300px] mobile:h-[460px] mobile:w-[260px]">
          {imageSource && (
            <Image
              src={imageSource}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 340px"
              loading="lazy"
            />
          )}
        </div>
        <div className="mt-5 h-6" />
      </div>
    </div>
  )
}
