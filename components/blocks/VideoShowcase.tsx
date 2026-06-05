import VideoPlayer from '@/components/ui/VideoPlayer'
import Stagger from '@/components/ui/motion/Stagger'
import StaggerItem from '@/components/ui/motion/StaggerItem'

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
    <Stagger className={`grid ${gridClasses[columns]} gap-[24px] mobile:gap-[16px]`} stagger={0.08}>
      {videos.map((video, index) => (
        <StaggerItem key={index} className="w-full hover-lift">
          <VideoPlayer
            src={video.src}
            aspectRatio="9:16"
            autoplay
            muted
            loop
          />
        </StaggerItem>
      ))}
    </Stagger>
  )
}
