import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import TalentGrid from '@/components/blocks/TalentGrid'
import BrandCarousel from '@/components/blocks/BrandCarousel'
import { Metadata } from 'next'

// Brand logos
const brandLogos = [
  { url: '/images/logos/brand-01.png', alt: 'Brand 1' },
  { url: '/images/logos/brand-02.png', alt: 'Brand 2' },
  { url: '/images/logos/brand-03.png', alt: 'Brand 3' },
  { url: '/images/logos/brand-04.png', alt: 'Brand 4' },
  { url: '/images/logos/brand-05.png', alt: 'Brand 5' },
  { url: '/images/logos/brand-06.png', alt: 'Brand 6' },
  { url: '/images/logos/brand-07.png', alt: 'Brand 7' },
  { url: '/images/logos/brand-08.png', alt: 'Brand 8' },
  { url: '/images/logos/brand-09.png', alt: 'Brand 9' },
  { url: '/images/logos/brand-10.png', alt: 'Brand 10' },
  { url: '/images/logos/brand-11.png', alt: 'Brand 11' },
  { url: '/images/logos/brand-12.png', alt: 'Brand 12' },
  { url: '/images/logos/brand-13.png', alt: 'Brand 13' },
  { url: '/images/logos/brand-14.png', alt: 'Brand 14' },
  { url: '/images/logos/brand-15.png', alt: 'Brand 15' },
  { url: '/images/logos/brand-16.png', alt: 'Brand 16' },
  { url: '/images/logos/brand-17.png', alt: 'Brand 17' },
  { url: '/images/logos/brand-18.png', alt: 'Brand 18' },
  { url: '/images/logos/brand-19.png', alt: 'Brand 19' },
  { url: '/images/logos/brand-20.png', alt: 'Brand 20' },
  { url: '/images/logos/brand-21.png', alt: 'Brand 21' },
  { url: '/images/logos/brand-22.png', alt: 'Brand 22' },
  { url: '/images/logos/brand-23.png', alt: 'Brand 23' },
  { url: '/images/logos/brand-24.png', alt: 'Brand 24' },
  { url: '/images/logos/brand-25.png', alt: 'Brand 25' },
  { url: '/images/logos/brand-26.png', alt: 'Brand 26' },
]

// Instagram & TikTok talents - exact match from live site with complete social links
// Note: Image files are misnamed (shifted by 1 position) - corrected mapping below
const instagramTalents = [
  {
    name: 'Rebecca Ghaderi',
    imageUrl: '/images/talents/melly-sanchez.jpg', // melly-sanchez.jpg contains Rebecca's actual photo
    instagramUrl: 'https://www.instagram.com/rebeccaghaderi',
    tiktokUrl: 'https://www.tiktok.com/@rebeccaghaderii',
  },
  {
    name: 'Melly Sanchez',
    imageUrl: '/images/talents/lidia-jora.jpg', // lidia-jora.jpg contains Melly's actual photo
    instagramUrl: 'https://www.instagram.com/thefashionfreakk/',
    tiktokUrl: 'https://www.tiktok.com/@thefashionfreakk/',
  },
  {
    name: 'Lidia Jora',
    imageUrl: '/images/talents/sadaf-torabi.jpg', // sadaf-torabi.jpg contains Lidia's actual photo
    instagramUrl: 'https://www.instagram.com/gold.en_queen/',
    youtubeUrl: 'https://www.youtube.com/@gold.en_queen.',
    tiktokUrl: 'https://www.tiktok.com/@gold.en_queen',
  },
  {
    name: 'Sadaf Torabi',
    imageUrl: '/images/talents/asel-akmatova.png', // asel-akmatova.png contains Sadaf's actual photo
    instagramUrl: 'https://www.instagram.com/shellbeauty1/',
    youtubeUrl: 'https://www.youtube.com/@ShellBeauty1',
    tiktokUrl: 'https://www.tiktok.com/@shellbeautyy',
  },
  {
    name: 'Asel Akmatova',
    imageUrl: '/images/talents/dariia-bordun.jpg', // dariia-bordun.jpg contains Asel's actual photo
    instagramUrl: 'https://www.instagram.com/aselbbh/',
    youtubeUrl: 'https://www.youtube.com/@aselbbh',
    tiktokUrl: 'https://tiktok.com/@aselbbh/',
  },
  {
    name: 'Dariia Bordun',
    imageUrl: '/images/talents/mariya-atwani.jpeg', // mariya-atwani.jpeg contains Dariia's actual photo
    instagramUrl: 'https://www.instagram.com/_idareen_/',
    tiktokUrl: 'https://www.tiktok.com/@idareen_',
  },
  {
    name: 'Mariya Atwani',
    imageUrl: '/images/talents/chloe-paredes.jpeg', // chloe-paredes.jpeg contains Mariya's actual photo
    instagramUrl: 'https://www.instagram.com/itsmariyaxo/',
    youtubeUrl: 'https://www.youtube.com/@Itsmariyaxo',
  },
  {
    name: 'Chloe Paredes',
    imageUrl: '/images/talents/lena-mavriqi.jpg', // lena-mavriqi.jpg contains Chloe's actual photo
    instagramUrl: 'https://www.instagram.com/cczuleighka',
    youtubeUrl: 'https://www.youtube.com/@cczuleighka',
    tiktokUrl: 'https://www.tiktok.com/@cczuleighka/',
  },
  {
    name: 'Lena Mavriqi',
    imageUrl: '/images/talents/albina-mavriqi.jpg', // albina-mavriqi.jpg contains Lena's actual photo
    instagramUrl: 'https://www.instagram.com/albulena.mavriqi/',
    tiktokUrl: 'https://www.tiktok.com/@lenamavriqii',
  },
  {
    name: 'Albina Mavriqi',
    imageUrl: '/images/talents/melody-ozgoli.jpeg', // melody-ozgoli.jpeg contains Albina's actual photo
    instagramUrl: 'https://www.instagram.com/albina/',
    tiktokUrl: 'https://www.tiktok.com/@albinamavriqii/',
  },
  {
    name: 'Melody Ozgoli',
    imageUrl: '/images/talents/huda-belhaddad.jpeg', // huda-belhaddad.jpeg contains Melody's actual photo
    instagramUrl: 'https://www.instagram.com/melodyoz/',
    youtubeUrl: 'https://www.youtube.com/@melodyoz',
    tiktokUrl: 'http://tiktok.com/@melodyoz/',
  },
  {
    name: 'Huda Belhaddad',
    imageUrl: '/images/talents/yasaman-khatibi.jpg', // yasaman-khatibi.jpg contains Huda's actual photo
    instagramUrl: 'https://www.instagram.com/huda_gash/',
    tiktokUrl: 'https://www.tiktok.com/@huda_gash/',
  },
  {
    name: 'Yasaman Khatibi',
    imageUrl: '/images/talents/jay-sadiq.jpg', // jay-sadiq.jpg contains Yasaman's actual photo
    instagramUrl: 'https://www.instagram.com/yassikhatibi/',
    youtubeUrl: 'https://www.youtube.com/@yasamankhatibi',
  },
  {
    name: 'Jay Sadiq',
    imageUrl: '/images/talents/beatrix-ramosaj.jpeg', // beatrix-ramosaj.jpeg contains Jay's actual photo
    instagramUrl: 'https://www.instagram.com/jaysadiq_/',
    youtubeUrl: 'https://www.youtube.com/@Jaystyle_',
    tiktokUrl: 'https://www.tiktok.com/@jaysstyle_/',
  },
  {
    name: 'Beatrix Ramosaj',
    imageUrl: '/images/talents/franceska-rustem.jpeg', // franceska-rustem.jpeg contains Beatrix's actual photo
    instagramUrl: 'https://www.instagram.com/beatrixramosaj/',
    youtubeUrl: 'https://www.youtube.com/user/TheBeautyBeatrix',
    tiktokUrl: 'https://www.tiktok.com/@therealbeatrixramosaj/',
  },
  {
    name: 'Franceska Rustem',
    imageUrl: '/images/talents/douglas-abbes.png', // douglas-abbes.png contains Franceska's actual photo
    instagramUrl: 'https://www.instagram.com/franceskarustemm/',
    tiktokUrl: 'https://www.tiktok.com/@franceskarustemm',
  },
  {
    name: 'Douglas Abbes',
    imageUrl: '/images/talents/aysa-amini.jpeg', // aysa-amini.jpeg contains Douglas's actual photo
    instagramUrl: 'https://www.instagram.com/douglascassio/',
  },
  {
    name: 'Aysa Amini',
    imageUrl: '/images/talents/chanel-soree.jpg', // chanel-soree.jpg contains Aysa's actual photo
    instagramUrl: 'https://www.instagram.com/aysaaminii/',
  },
  {
    name: 'Chanel Sorée',
    imageUrl: '/images/talents/chayna-hegener.jpeg', // chayna-hegener.jpeg contains Chanel's actual photo
    instagramUrl: 'https://www.instagram.com/chanelsoree/',
    tiktokUrl: 'https://www.tiktok.com/@chanelsoree',
  },
  {
    name: 'Chayna Hegener',
    imageUrl: '/images/talents/saranda-mavriqi.jpg', // saranda-mavriqi.jpg contains Chayna's actual photo
    instagramUrl: 'https://www.instagram.com/_chayna/',
    tiktokUrl: 'https://www.tiktok.com/@_chaynaa',
  },
  {
    name: 'Saranda Mavriqi',
    imageUrl: '/images/talents/anisa-hukmova.png', // anisa-hukmova.png contains Saranda's actual photo
    instagramUrl: 'https://www.instagram.com/sarandamavriqi/',
  },
  {
    name: 'Anisa Hukmova',
    imageUrl: '/images/talents/khutjo-matsoma.png', // khutjo-matsoma.png contains Anisa's actual photo
    instagramUrl: 'https://www.instagram.com/anisavisage/',
    tiktokUrl: 'https://www.tiktok.com/@anisavisage',
  },
  {
    name: 'Khutjo Matsoma',
    imageUrl: '/images/talents/liz-vinet.png', // liz-vinet.png contains Khutjo's actual photo
    instagramUrl: 'https://www.instagram.com/khutjomatsoma/',
    tiktokUrl: 'https://www.tiktok.com/@khutjo.matsoma/',
  },
  {
    name: 'Liz Vinet',
    imageUrl: '/images/talents/loresa-konushevci.jpg', // loresa-konushevci.jpg contains Liz's actual photo
    instagramUrl: 'https://www.instagram.com/lizestefanii/',
    tiktokUrl: 'https://www.tiktok.com/@lizestefanii/',
  },
  {
    name: 'Loresa Konushevci',
    imageUrl: '/images/talents/melani-seiffert.png', // melani-seiffert.png contains Loresa's actual photo
    instagramUrl: 'https://www.instagram.com/loresakonushevci/',
  },
  {
    name: 'Melani Seiffert',
    imageUrl: '/images/talents/valeriia-vakar.png', // valeriia-vakar.png contains Melani's actual photo
    instagramUrl: 'https://www.instagram.com/melaniseiffert/',
    tiktokUrl: 'https://www.tiktok.com/@melaniseiffert/',
  },
  {
    name: 'Valeriia Vakar',
    imageUrl: '/images/talents/anagha-sabu.png', // anagha-sabu.png contains Valeriia's actual photo
    instagramUrl: 'https://www.instagram.com/val.vakar/',
    tiktokUrl: 'https://www.tiktok.com/@valeriia.vakar/',
  },
  {
    name: 'Anagha Sabu',
    imageUrl: '/images/talents/anton-drozhzhin.png', // anton-drozhzhin.png contains Anagha's actual photo
    instagramUrl: 'https://www.instagram.com/dr_anagha_sabu/',
    youtubeUrl: 'https://www.youtube.com/@hi_i_am_anagha/featured',
  },
  {
    name: 'Anton Drozhzhin',
    imageUrl: '/images/talents/anton-correct.jpg', // Correct Anton photo from live site
    instagramUrl: 'https://www.instagram.com/closmain',
    tiktokUrl: 'https://www.tiktok.com/@a.closmain',
  },
]

// YouTube talents - exact match from live site
// Note: Image files were misnamed - corrected mapping below
const youtubeTalents = [
  {
    name: 'Voyage',
    imageUrl: '/images/talents/baka.jpg', // baka.jpg contains Voyage's photo
    instagramUrl: 'https://www.instagram.com/voyage.mp3/',
    youtubeUrl: 'https://www.youtube.com/channel/UCKmVog8RvluGkUOE38PEleQ',
  },
  {
    name: 'Baka',
    imageUrl: '/images/talents/luka.jpeg', // luka.jpeg contains Baka's photo
    instagramUrl: 'https://www.instagram.com/bakaprase',
    tiktokUrl: 'https://www.tiktok.com/@bakaprase',
  },
  {
    name: 'Luka',
    imageUrl: '/images/talents/choda.jpg', // choda.jpg contains Luka's photo
    instagramUrl: 'https://www.instagram.com/lukabojovic23/',
    youtubeUrl: 'https://www.youtube.com/@Lux27ytchannel',
    tiktokUrl: 'https://www.tiktok.com/@lukabojovic23',
  },
  {
    name: 'Choda',
    imageUrl: '/images/talents/windoh.jpg', // windoh.jpg contains Choda's photo
    instagramUrl: 'https://www.instagram.com/choda19a/',
    youtubeUrl: 'https://www.youtube.com/@Choda19a',
    tiktokUrl: 'https://www.tiktok.com/@choda19a',
  },
  {
    name: 'Windoh',
    imageUrl: '/images/talents/yassuo.jpg', // yassuo.jpg contains Windoh's photo
    instagramUrl: 'https://www.instagram.com/windoh',
    youtubeUrl: 'https://www.youtube.com/@Windoh',
    twitchUrl: 'https://www.twitch.tv/windoh',
  },
  {
    name: 'Yassuo',
    imageUrl: '/images/talents/yassuo-100thieves.jpg', // New file needed for Yassuo
    youtubeUrl: 'https://www.youtube.com/yassuo',
    tiktokUrl: 'https://www.tiktok.com/@yassuo',
    twitchUrl: 'https://www.twitch.tv/yassuo',
    kickUrl: 'https://kick.com/yassuo',
  },
]

export const metadata: Metadata = {
  title: 'Our Talents - Instagram, TikTok & YouTube Creators',
  description:
    'Discover CA Agency\'s roster of top influencers and content creators. Masters of visual storytelling across Instagram, TikTok, and YouTube with millions of engaged followers.',
  keywords: [
    'influencers Dubai',
    'content creators',
    'Instagram influencers',
    'TikTok creators',
    'YouTube influencers',
    'beauty influencers',
    'fashion influencers',
    'lifestyle creators',
  ],
  openGraph: {
    title: 'Our Talents | CA Agency',
    description:
      'Discover our roster of top influencers and content creators across Instagram, TikTok, and YouTube.',
  },
  alternates: {
    canonical: 'https://caagency.com/talents',
  },
}

export default function TalentsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-[80px] tablet:py-[60px] mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <div className="max-w-[900px]">
            <Heading as="h2" color="white" className="mb-8 text-[48px] tablet:text-[40px] mobile:text-[30px] leading-[1.2]">
              Our talents
            </Heading>
            <div className="space-y-6">
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                At CA Agency, we believe that every influencer has the power to drive real impact, and every brand has the potential to build authentic connections with their audience.
              </Text>
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                As a full-service influencer marketing agency, we bridge the gap between brands and creators  delivering powerful storytelling content that engages, converts, and fuels long-term growth across platforms like Instagram and TikTok.
              </Text>
              <Text color="white" size="sm" className="text-[14px] leading-[26px] tracking-[1.5px] opacity-80">
                Our creators are masters of visual storytelling. They transform everyday moments into captivating narratives that resonate with their followers. With an eye for aesthetics and a passion for sharing their unique perspectives, they are the go-to source for inspiration, fashion, travel, and lifestyle content.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Section Title with underline */}
      <section className="bg-background-dark pb-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <h3 className="font-anegra text-[30px] tablet:text-[26px] mobile:text-[22px] font-semibold tracking-[1.2px] text-center">
            <span className="text-foreground-white/70">Short. Stylish. Share-Worthy</span>{' '}
            <span className="text-foreground-white relative inline-block">
              Instagram & TikTok Voices
              {/* Red underline squiggle */}
              <span className="absolute -bottom-2 left-0 w-full text-accent-red">
                <svg
                  className="w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 4C20 1 40 7 60 4C80 1 100 7 120 4C140 1 160 7 180 4C190 2.5 200 4 200 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
            </span>
          </h3>
          {/* Horizontal divider line */}
          <div className="mt-8 border-t border-foreground-white/20" />
        </div>
      </section>

      {/* Instagram & TikTok Voices Grid */}
      <section className="bg-background-dark py-[60px] tablet:py-[50px] mobile:py-[40px] px-section-x">
        <div className="max-w-container mx-auto">
          <TalentGrid talents={instagramTalents} columns={4} />
        </div>
      </section>

      {/* YouTube Voices Section */}
      <section className="bg-background-dark py-section-y-desktop mobile:py-[50px] px-section-x">
        <div className="max-w-container mx-auto">
          <h3 className="font-anegra text-[30px] tablet:text-[26px] mobile:text-[22px] font-semibold tracking-[1.2px] mb-8">
            <span className="text-foreground-white inline-flex items-center gap-3">
              YouTube Voices
              <img
                src="/images/site/[CITYPNG.COM]Red Youtube Logo Symbol - 800x800.png"
                alt="YouTube"
                width={40}
                height={40}
                className="inline-block"
              />
            </span>{' '}
            <span className="text-foreground-white/70">That Influence Millions</span>
          </h3>
          <TalentGrid talents={youtubeTalents} columns={4} />
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="bg-background-dark py-[50px] px-0">
        <BrandCarousel images={brandLogos} />
      </section>
    </>
  )
}
