import VideoPlayer from '@/components/ui/VideoPlayer'

interface VideoShowcaseProps {
  videos: Array<{ src: string; alt?: string }>
  columns?: 2 | 4
}

export default function VideoShowcase({
  videos,
  columns = 4,
}: VideoShowcaseProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-[24px] mobile:gap-[16px]`}>
      {videos.map((video, index) => (
        <div key={index} className="w-full">
          <VideoPlayer
            src={video.src}
            aspectRatio="9:16"
            autoplay
            muted
            loop
          />
        </div>
      ))}
    </div>
  )
}
