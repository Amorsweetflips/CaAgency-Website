import TalentCard from './TalentCard'

interface Talent {
  name: string
  imageUrl: string
  instagramUrl?: string
  tiktokUrl?: string
  youtubeUrl?: string
  twitchUrl?: string
  kickUrl?: string
}

interface TalentGridProps {
  talents: Talent[]
  columns?: 2 | 4 | 5 | 6
}

export default function TalentGrid({
  talents,
  columns = 4,
}: TalentGridProps) {
  const gridClasses = {
    2: 'grid-cols-2 md:grid-cols-2',
    4: 'grid-cols-2 mobile-extra:grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 mobile-extra:grid-cols-2 md:grid-cols-5',
    6: 'grid-cols-2 mobile-extra:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-6',
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-[20px]`}>
      {talents.map((talent) => (
        <TalentCard
          key={talent.name}
          name={talent.name}
          imageUrl={talent.imageUrl}
          instagramUrl={talent.instagramUrl}
          tiktokUrl={talent.tiktokUrl}
          youtubeUrl={talent.youtubeUrl}
          twitchUrl={talent.twitchUrl}
          kickUrl={talent.kickUrl}
        />
      ))}
    </div>
  )
}
