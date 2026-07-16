import Image from 'next/image'
import { posterFor } from '@/lib/data/videos'
import type { VideoShowcaseProps } from '@/components/blocks/VideoShowcase'

export default function VideoShowcaseFallback({
  videos,
  columns = 4,
}: VideoShowcaseProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-[24px] mobile:gap-[16px]`}>
      {videos.map((video, index) => {
        const isLoneLastOnMobile =
          columns === 3 && videos.length % 2 === 1 && index === videos.length - 1
        return (
          <div
            key={video.src}
            className={`w-full${
              isLoneLastOnMobile
                ? ' mobile:col-span-2 mobile:w-[calc(50%-8px)] mobile:justify-self-center'
                : ''
            }`}
          >
            <div className="relative aspect-9/16 overflow-hidden rounded-[30px] bg-black/10">
              <Image
                src={video.poster ?? posterFor(video.src)}
                alt={video.alt ?? ''}
                fill
                quality={60}
                loading="lazy"
                sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
