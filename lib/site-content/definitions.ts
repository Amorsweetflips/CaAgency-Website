export type SiteContentField =
  | {
      key: string
      label: string
      type: 'text' | 'textarea' | 'url' | 'number' | 'html'
      description?: string
      rows?: number
    }
  | {
      key: string
      label: string
      type: 'group'
      description?: string
      fields: SiteContentField[]
    }
  | {
      key: string
      label: string
      type: 'array'
      description?: string
      itemLabel?: string
      fields: SiteContentField[]
    }

export type SiteContentDefinition<T = unknown> = {
  key: string
  title: string
  description: string
  fields: SiteContentField[]
  defaultData: T
}

const basicSeoLandingFields: SiteContentField[] = [
  {
    key: 'hero',
    label: 'Hero',
    type: 'group',
    fields: [
      { key: 'title', label: 'Titel', type: 'text' },
      { key: 'subtitle', label: 'Subtitel', type: 'textarea', rows: 4 },
      { key: 'primaryButtonLabel', label: 'Primaire knop label', type: 'text' },
      { key: 'primaryButtonHref', label: 'Primaire knop link', type: 'text' },
      { key: 'secondaryButtonLabel', label: 'Secundaire knop label', type: 'text' },
      { key: 'secondaryButtonHref', label: 'Secundaire knop link', type: 'text' },
    ],
  },
  {
    key: 'stats',
    label: 'Statistieken',
    type: 'array',
    itemLabel: 'Stat',
    fields: [
      { key: 'value', label: 'Waarde', type: 'text' },
      { key: 'label', label: 'Label', type: 'text' },
    ],
  },
  {
    key: 'highlights',
    label: 'Highlight kaarten',
    type: 'group',
    fields: [
      { key: 'title', label: 'Sectietitel', type: 'text' },
      {
        key: 'items',
        label: 'Kaarten',
        type: 'array',
        itemLabel: 'Kaart',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 4 },
        ],
      },
    ],
  },
  {
    key: 'talents',
    label: 'Talents sectie',
    type: 'group',
    fields: [
      { key: 'title', label: 'Titel', type: 'text' },
      { key: 'buttonLabel', label: 'Knop label', type: 'text' },
      { key: 'buttonHref', label: 'Knop link', type: 'text' },
    ],
  },
  {
    key: 'industries',
    label: 'Industrieën',
    type: 'group',
    fields: [
      { key: 'title', label: 'Sectietitel', type: 'text' },
      {
        key: 'items',
        label: 'Items',
        type: 'array',
        itemLabel: 'Industrie',
        fields: [
          { key: 'icon', label: 'Icoon', type: 'text', description: 'Emoji of kort symbool' },
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 4 },
        ],
      },
    ],
  },
  {
    key: 'cta',
    label: 'CTA',
    type: 'group',
    fields: [
      { key: 'title', label: 'Titel', type: 'text' },
      { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 3 },
      { key: 'buttonLabel', label: 'Knop label', type: 'text' },
      { key: 'buttonHref', label: 'Knop link', type: 'text' },
    ],
  },
]

export const siteContentDefinitions: SiteContentDefinition[] = [
  {
    key: 'home',
    title: 'Homepage',
    description: 'Hero, statistieken, intro, homepage services en featured work CTA.',
    fields: [
      {
        key: 'hero',
        label: 'Hero',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'titleSecondLine', label: 'Tweede regel', type: 'text' },
          { key: 'subtitle', label: 'Subtitel', type: 'textarea', rows: 4 },
          {
            key: 'carouselImages',
            label: 'Carousel afbeeldingen',
            type: 'array',
            itemLabel: 'Afbeelding',
            fields: [
              { key: 'src', label: 'Afbeelding URL', type: 'url' },
              { key: 'alt', label: 'Alt tekst', type: 'text' },
            ],
          },
        ],
      },
      {
        key: 'stats',
        label: 'Statistieken',
        type: 'group',
        fields: [
          {
            key: 'items',
            label: 'Items',
            type: 'array',
            itemLabel: 'Stat',
            fields: [
              { key: 'value', label: 'Waarde', type: 'number' },
              { key: 'suffix', label: 'Suffix', type: 'text' },
              { key: 'label', label: 'Label', type: 'text' },
            ],
          },
          { key: 'tagline', label: 'Tagline', type: 'textarea', rows: 3 },
        ],
      },
      {
        key: 'intro',
        label: 'This is CA Agency',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          {
            key: 'paragraphs',
            label: 'Paragrafen',
            type: 'array',
            itemLabel: 'Paragraaf',
            fields: [{ key: 'text', label: 'Tekst', type: 'textarea', rows: 4 }],
          },
          { key: 'buttonLabel', label: 'Knop label', type: 'text' },
          { key: 'buttonHref', label: 'Knop link', type: 'text' },
          {
            key: 'mediaItems',
            label: 'Media carousel',
            type: 'array',
            itemLabel: 'Media',
            fields: [
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'src', label: 'Bestand URL', type: 'text' },
            ],
          },
        ],
      },
      {
        key: 'servicesOverview',
        label: 'Services overzicht blok',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'subtitle', label: 'Subtitel', type: 'textarea', rows: 3 },
          {
            key: 'items',
            label: 'Service kaarten',
            type: 'array',
            itemLabel: 'Service',
            fields: [
              { key: 'title', label: 'Titel', type: 'text' },
              { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 4 },
              { key: 'icon', label: 'Icoon key', type: 'text' },
            ],
          },
          { key: 'buttonLabel', label: 'Knop label', type: 'text' },
          { key: 'buttonHref', label: 'Knop link', type: 'text' },
        ],
      },
      {
        key: 'talents',
        label: 'Homepage talents',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 3 },
          { key: 'buttonLabel', label: 'Knop label', type: 'text' },
          { key: 'buttonHref', label: 'Knop link', type: 'text' },
          { key: 'limit', label: 'Aantal talents', type: 'number' },
        ],
      },
      {
        key: 'featuredWork',
        label: 'Featured work CTA',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 3 },
          { key: 'buttonLabel', label: 'Knop label', type: 'text' },
          { key: 'buttonHref', label: 'Knop link', type: 'text' },
        ],
      },
    ],
    defaultData: {
      hero: {
        title: 'CA Agency',
        titleSecondLine: 'Influence • Digital • Marketing',
        subtitle:
          'We connect brands with their target audience through engaging content, strategic partnerships, and high-impact campaigns across platforms like Instagram, TikTok, and YouTube.',
        carouselImages: [
          { src: '/images/site/hero-image-01.webp', alt: 'CA Agency hero image 1' },
          { src: '/images/site/hero-image-02.webp', alt: 'CA Agency hero image 2' },
          { src: '/images/site/hero-image-03.webp', alt: 'CA Agency hero image 3' },
          { src: '/images/site/hero-image-04.webp', alt: 'CA Agency hero image 4' },
          { src: '/images/site/hero-image-05.webp', alt: 'CA Agency hero image 5' },
        ],
      },
      stats: {
        items: [
          { value: 18, suffix: 'M+', label: 'Total Followers' },
          { value: 3000, suffix: '+', label: 'Campaigns' },
          { value: 150, suffix: '+', label: 'Global Brands' },
        ],
        tagline:
          "We create scroll-stopping content for global brands like JBL, Sony, SHEIN, Amazon, and L'Oréal Paris.",
      },
      intro: {
        title: 'This is CA Agency',
        paragraphs: [
          {
            text: 'Our influencer marketing agency bridges the gap between leading global brands and the social media influencer landscape by crafting data-driven, timeless campaigns that boost sales and brand visibility.',
          },
          {
            text: 'We provide cross-platform influencer promotion on Instagram, Youtube and TikTok, partnering with brands to create memorable, high-impact campaigns.',
          },
        ],
        buttonLabel: 'More about us',
        buttonHref: '/about',
        mediaItems: [
          { type: 'video', src: '/videos/work/medicube.mp4' },
          { type: 'video', src: '/videos/work/yesstyle.mp4' },
          { type: 'video', src: '/videos/work/mixsoon.mp4' },
          { type: 'video', src: '/videos/work/insta360x.mp4' },
          { type: 'video', src: '/videos/work/idareen-kikomilano.mp4' },
        ],
      },
      servicesOverview: {
        title: 'What We Do',
        subtitle: 'Full-service influencer marketing — from strategy to execution.',
        items: [
          {
            title: 'Influencer Campaigns',
            description:
              'Strategic brand-creator partnerships across Instagram, TikTok & YouTube that drive real results.',
            icon: 'spark',
          },
          {
            title: 'Talent Management',
            description:
              'Helping influencers build sustainable careers through paid collaborations and exclusive partnerships.',
            icon: 'person',
          },
          {
            title: 'Content Creation',
            description:
              'Scroll-stopping branded content crafted to engage audiences and elevate brand visibility.',
            icon: 'video',
          },
          {
            title: 'Performance Marketing',
            description:
              'Data-driven campaigns with measurable ROI from brand awareness to qualified traffic and conversions.',
            icon: 'chart',
          },
        ],
        buttonLabel: 'View all services',
        buttonHref: '/services',
      },
      talents: {
        title: 'Meet the Talents',
        description:
          'Our content creators turn everyday moments into engaging stories that connect with audiences across Instagram, Youtube and TikTok.',
        buttonLabel: 'See all talents',
        buttonHref: '/talents',
        limit: 6,
      },
      featuredWork: {
        title: 'Featured Work',
        description:
          'See how we turn strategic creator partnerships into campaigns that people actually remember.',
        buttonLabel: 'View all work',
        buttonHref: '/work',
      },
    },
  },
  {
    key: 'about',
    title: 'About pagina',
    description: 'Hero en twee contentblokken van de about pagina.',
    fields: [
      {
        key: 'hero',
        label: 'Hero',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'textarea', rows: 3 },
          { key: 'subtitle', label: 'Subtitel', type: 'textarea', rows: 4 },
        ],
      },
      {
        key: 'sections',
        label: 'Contentblokken',
        type: 'array',
        itemLabel: 'Blok',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          {
            key: 'paragraphs',
            label: 'Paragrafen',
            type: 'array',
            itemLabel: 'Paragraaf',
            fields: [{ key: 'text', label: 'Tekst', type: 'textarea', rows: 4 }],
          },
          { key: 'videoUrl', label: 'Video URL', type: 'text' },
          { key: 'buttonLabel', label: 'Knop label', type: 'text' },
          { key: 'buttonHref', label: 'Knop link', type: 'text' },
        ],
      },
    ],
    defaultData: {
      hero: {
        title: 'About CA Agency\nOur Mission • Our Expertise • Your Growth',
        subtitle:
          'At CA Agency, we bring brands to life by crafting authentic stories, building strategic influencer partnerships, and running data-driven digital campaigns that captivate audiences across Instagram, TikTok, and YouTube.',
      },
      sections: [
        {
          title: 'CA Agency',
          paragraphs: [
            {
              text: 'Founded in 2020, CA Agency is a leading talent and influencer marketing agency representing top-tier social media creators and public figures across the beauty, fashion, lifestyle, and entertainment industries.',
            },
            {
              text: "We're more than just a talent agency we're a strategic partner that bridges passion with opportunity and transforms creators into influential, recognizable brands.",
            },
            {
              text: 'Built by digital industry veterans, CA Agency quickly became a game-changer in the influencer and digital media landscape. Our mission is to discover and develop talent, provide strategic brand partnerships, and drive long-term growth for both creators and the brands they work with.',
            },
            {
              text: "What sets us apart is our ability to identify raw potential and elevate it with powerful personal branding, content strategy, and influencer campaign management. We're proud to be the agency behind some of today's most impactful social media personalities and public figures.",
            },
          ],
          videoUrl: '/videos/about-video-01.mp4',
          buttonLabel: '',
          buttonHref: '',
        },
        {
          title: 'Full-service influencer marketing agency',
          paragraphs: [
            {
              text: 'CA Agency is a full-service influencer marketing agency dedicated to helping brands grow through impactful creator partnerships, strategic content, and cross-platform campaigns.',
            },
            {
              text: 'As your all-in-one digital marketing partner, we offer a 360 service experience that streamlines your influencer marketing efforts across platforms like Instagram, TikTok, and YouTube saving time, budget, and internal resources.',
            },
            {
              text: "What sets us apart? It's not just our proven track record of creating weekly high-performance campaigns for global brands. It's our commitment to your growth, flexibility, and long-term success in a fast-moving digital world.",
            },
            {
              text: "At CA Agency, we go beyond services we build strategic partnerships that empower you to stay ahead of trends and competition. Let's transform your brand story into results through innovative influencer strategies that deliver measurable impact.",
            },
          ],
          videoUrl: '/videos/about-video-02.mp4',
          buttonLabel: 'Contact us',
          buttonHref: '/contact',
        },
      ],
    },
  },
  {
    key: 'services',
    title: 'Services pagina',
    description: 'Hero, intro en servicekaarten van de services pagina.',
    fields: [
      {
        key: 'hero',
        label: 'Hero',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'textarea', rows: 3 },
          { key: 'subtitle', label: 'Subtitel', type: 'textarea', rows: 4 },
        ],
      },
      {
        key: 'intro',
        label: 'Intro',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          {
            key: 'paragraphs',
            label: 'Paragrafen',
            type: 'array',
            itemLabel: 'Paragraaf',
            fields: [{ key: 'text', label: 'Tekst', type: 'textarea', rows: 4 }],
          },
        ],
      },
      {
        key: 'cards',
        label: 'Service kaarten',
        type: 'array',
        itemLabel: 'Kaart',
        fields: [
          { key: 'number', label: 'Nummer', type: 'number' },
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'image', label: 'Afbeelding URL', type: 'url' },
          { key: 'highlight', label: 'Highlight', type: 'textarea', rows: 3 },
          { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 4 },
          { key: 'details', label: 'Details', type: 'textarea', rows: 4 },
        ],
      },
    ],
    defaultData: {
      hero: {
        title: 'Our Services at CA Agency\nInfluence • Digital • Marketing',
        subtitle:
          'We believe every influencer has the ability to create meaningful impact, and every brand has the potential to build authentic, lasting connections with their audience.',
      },
      intro: {
        title: 'Top-notch services',
        paragraphs: [
          {
            text: 'At CA Agency, we deliver top-tier influencer marketing services that connect powerful voices with forward-thinking brands.',
          },
          {
            text: 'We believe every influencer has the ability to create meaningful impact, and every brand has the potential to build authentic, lasting connections with their audience. As a full-service influencer marketing agency, we act as the bridge between creators and companies producing storytelling content that resonates, engages, and drives measurable growth across platforms like Instagram, Youtube and TikTok.',
          },
        ],
      },
      cards: [
        {
          number: 1,
          title: 'For Influencers',
          image:
            'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/rebecca-ghaderi.jpeg',
          highlight: 'Monetization Amplified: Turn your influence into income with CA Agency.',
          description:
            'We go beyond likes and followers we help influencers build long-term, sustainable careers. Our influencer marketing experts work one-on-one with creators to develop personalized growth and monetization strategies.',
          details:
            'From paid brand collaborations and affiliate campaigns to exclusive long-term partnerships, we ensure that your creative content becomes a reliable revenue stream. At CA Agency, we empower influencers to grow their brand, increase visibility, and unlock their full earning potential.',
        },
        {
          number: 2,
          title: 'Expanding Reach',
          image:
            'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/melly-sanchez.jpeg',
          highlight: 'Your voice deserves to be seen, heard, and celebrated on a global scale.',
          description:
            "At CA Agency, we harness the full potential of digital platforms to maximize your visibility and help you grow a loyal, engaged audience. Through strategic social media optimization and targeted content distribution, we ensure you're present where it matters most from Instagram and TikTok to YouTube and beyond.",
          details:
            "Whether you're an emerging creator or an established influencer, we help you expand your reach, boost engagement, and build a global personal brand that resonates.",
        },
        {
          number: 3,
          title: 'Targeted Engagement',
          image:
            'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/beatrix-ramosaj.jpeg',
          highlight:
            "Navigating the digital space takes strategy and that's where CA Agency leads.",
          description:
            'We specialize in aligning brands with influencers whose values, tone, and audience perfectly reflect their brand identity. This strategic matchmaking results in authentic influencer partnerships that drive trust, increase brand loyalty, and spark deeper audience engagement.',
          details:
            "By connecting companies with the right creators, we deliver targeted influencer marketing campaigns that don't just generate buzz they build real relationships with customers.",
        },
        {
          number: 4,
          title: 'Driving Traffic',
          image:
            'https://xcp1g6mozx3w5zew.public.blob.vercel-storage.com/talents/instagram/asel-akmatova.jpeg',
          highlight: "At CA Agency, we know that visibility alone isn't enough results matter.",
          description:
            'That is why we craft performance-driven influencer marketing campaigns designed to go beyond brand exposure. Our focus is on generating qualified traffic, boosting conversions, and achieving measurable business outcomes.',
          details:
            'Through compelling content creation and strategic brand-influencer collaborations, we help you turn attention into action and followers into loyal customers.',
        },
      ],
    },
  },
  {
    key: 'work',
    title: 'Work pagina',
    description: 'Intro, video grid en CTA van de work pagina.',
    fields: [
      {
        key: 'intro',
        label: 'Intro',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          {
            key: 'paragraphs',
            label: 'Paragrafen',
            type: 'array',
            itemLabel: 'Paragraaf',
            fields: [{ key: 'text', label: 'Tekst', type: 'textarea', rows: 4 }],
          },
        ],
      },
      {
        key: 'videos',
        label: 'Video’s',
        type: 'array',
        itemLabel: 'Video',
        fields: [
          { key: 'src', label: 'Video URL', type: 'text' },
          { key: 'alt', label: 'Alt tekst', type: 'text' },
          { key: 'name', label: 'Naam', type: 'text' },
          { key: 'brand', label: 'Brand', type: 'text' },
        ],
      },
      {
        key: 'cta',
        label: 'CTA',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'description', label: 'Beschrijving', type: 'textarea', rows: 3 },
          {
            key: 'buttons',
            label: 'Knoppen',
            type: 'array',
            itemLabel: 'Knop',
            fields: [
              { key: 'label', label: 'Label', type: 'text' },
              { key: 'href', label: 'Link', type: 'text' },
              { key: 'variant', label: 'Variant', type: 'text' },
            ],
          },
        ],
      },
    ],
    defaultData: {
      intro: {
        title: 'Our work',
        paragraphs: [
          {
            text: 'Step into the world of CA Agency where creativity meets strategy to deliver branded content that captivates, engages, and drives real results.',
          },
          {
            text: 'As a content creation and influencer marketing agency, we specialize in producing high-impact short-form video content for platforms like Instagram Reels, Youtube shorts and TikTok. Our campaigns go beyond trends they craft immersive brand experiences that connect with audiences and inspire action.',
          },
          {
            text: 'Through strategic collaborations with global brands and top-tier creators, we bring stories to life using visual storytelling, creative direction, and data-driven planning.',
          },
          {
            text: "Messages that matter. In today's fast-paced digital landscape, we focus on purposeful content that leaves a lasting impression. CA Agency works with influencers who align with your brand values creating authentic Reels and TikToks that not only follow trends, but lead them.",
          },
        ],
      },
      videos: [
        { src: '/videos/work/honor.mp4', alt: 'HONOR collaboration', name: 'HONOR Collaboration', brand: 'HONOR' },
        { src: '/videos/work/ysl-beauty.mp4', alt: 'YSL Beauty campaign', name: 'YSL Beauty Campaign', brand: 'YSL Beauty' },
        { src: '/videos/work/morphe.mp4', alt: 'Morphe collaboration', name: 'Morphe Collaboration', brand: 'Morphe' },
        { src: '/videos/work/kylie-cosmetics.mp4', alt: 'Kylie Cosmetics campaign', name: 'Kylie Cosmetics Campaign', brand: 'Kylie Cosmetics' },
        { src: '/videos/work/medicube.mp4', alt: 'Medicube skincare', name: 'Medicube Skincare', brand: 'Medicube' },
        { src: '/videos/work/yesstyle.mp4', alt: 'YesStyle collaboration', name: 'YesStyle Collaboration', brand: 'YesStyle' },
        { src: '/videos/work/insta360x.mp4', alt: 'Insta360 X campaign', name: 'Insta360 X Campaign', brand: 'Insta360' },
        { src: '/videos/work/mixsoon.mp4', alt: 'Mixsoon skincare', name: 'Mixsoon Skincare', brand: 'Mixsoon' },
        { src: '/videos/work/idareen-kikomilano.mp4', alt: '@_idareen_ for Kiko Milano', name: 'Kiko Milano Campaign', brand: 'Kiko Milano' },
        { src: '/videos/work/beatrix-juviasplace.mp4', alt: '@beatrixramosaj for Juvias Place', name: 'Juvias Place Campaign', brand: 'Juvias Place' },
        { src: '/videos/work/fashionfreakk-nars.mp4', alt: '@thefashionfreakk for NARS', name: 'NARS Campaign', brand: 'NARS' },
        { src: '/videos/work/huda-elemis.mp4', alt: '@huda_gash for Elemis', name: 'Elemis Campaign', brand: 'Elemis' },
      ],
      cta: {
        title: 'Ready to Create Your Campaign?',
        description:
          "Let's bring your brand story to life with authentic influencer partnerships that drive real results.",
        buttons: [
          { label: 'Get Started', href: '/contact', variant: 'primary' },
          { label: 'Our Services', href: '/services', variant: 'dark' },
          { label: 'Meet Our Talents', href: '/talents', variant: 'dark' },
        ],
      },
    },
  },
  {
    key: 'contact',
    title: 'Contact pagina',
    description: 'Kopteksten en ondersteunende teksten voor de contactpagina.',
    fields: [
      {
        key: 'hero',
        label: 'Formulierblok',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          { key: 'subtitle', label: 'Subtitel', type: 'textarea', rows: 3 },
          { key: 'businessTitle', label: 'Business sectie titel', type: 'text' },
          { key: 'talentTitle', label: 'Talent sectie titel', type: 'text' },
          { key: 'talentDescription', label: 'Talent beschrijving', type: 'textarea', rows: 3 },
        ],
      },
    ],
    defaultData: {
      hero: {
        title: "Let's collaborate!",
        subtitle:
          "Whether you're a brand looking to launch an influencer campaign or a creator ready to grow, we'd love to hear from you.",
        businessTitle: 'Brand & Business Inquiries',
        talentTitle: 'Talent Submission',
        talentDescription:
          'Are you a content creator looking to join our roster? Tell us about yourself!',
      },
    },
  },
  {
    key: 'business-license',
    title: 'Business license pagina',
    description: 'Licentiepagina met bedrijfsinformatie en documenten.',
    fields: [
      { key: 'title', label: 'Paginatitel', type: 'text' },
      { key: 'imageUrl', label: 'Afbeelding URL', type: 'text' },
      {
        key: 'companyInfo',
        label: 'Bedrijfsinformatie',
        type: 'array',
        itemLabel: 'Info regel',
        fields: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'value', label: 'Waarde', type: 'textarea', rows: 2 },
          { key: 'href', label: 'Optionele link', type: 'text' },
        ],
      },
      {
        key: 'about',
        label: 'Over CA Agency',
        type: 'group',
        fields: [
          { key: 'title', label: 'Titel', type: 'text' },
          {
            key: 'paragraphs',
            label: 'Paragrafen',
            type: 'array',
            itemLabel: 'Paragraaf',
            fields: [{ key: 'text', label: 'Tekst', type: 'textarea', rows: 4 }],
          },
        ],
      },
      {
        key: 'documents',
        label: 'Juridische documenten',
        type: 'array',
        itemLabel: 'Document',
        fields: [
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'href', label: 'Link', type: 'text' },
        ],
      },
    ],
    defaultData: {
      title: 'Business License',
      imageUrl: '/images/site/business-license.webp',
      companyInfo: [
        { label: 'Company Name', value: 'CA Agency L.L.C-FZ' },
        { label: 'License Number', value: '2417532.01' },
        { label: 'Company Type', value: 'Limited Liability Company (Free Zone)' },
        { label: 'Registered Address', value: 'Meydan Grandstand, 6th floor\nMeydan Road, Nad Al Sheba\nDubai, U.A.E.' },
        { label: 'Manager', value: 'Ilias Chaabit' },
        { label: 'Contact Email', value: 'info@caagency.com', href: 'mailto:info@caagency.com' },
        { label: 'WhatsApp', value: '+971 58 510 7546', href: 'https://wa.me/971585107546' },
      ],
      about: {
        title: 'About CA Agency',
        paragraphs: [
          {
            text: 'CA Agency is a licensed full-service influencer marketing agency based in Dubai, United Arab Emirates. Founded in 2020, we specialize in connecting global brands with top-tier content creators across Instagram, TikTok, and YouTube.',
          },
          {
            text: 'Our agency operates in compliance with UAE business regulations and is registered under the Meydan Free Zone authority.',
          },
        ],
      },
      documents: [
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
      ],
    },
  },
  {
    key: 'footer',
    title: 'Footer en contactgegevens',
    description: 'Beschrijving, socials en vaste contactgegevens in de footer en contactblokken.',
    fields: [
      { key: 'description', label: 'Omschrijving', type: 'textarea', rows: 4 },
      { key: 'address', label: 'Adres', type: 'textarea', rows: 3 },
      { key: 'email', label: 'E-mail', type: 'text' },
      { key: 'phone', label: 'Telefoon', type: 'text' },
      { key: 'registrationNo', label: 'Registratienummer', type: 'text' },
      {
        key: 'socialLinks',
        label: 'Social links',
        type: 'array',
        itemLabel: 'Social',
        fields: [
          { key: 'name', label: 'Naam', type: 'text' },
          { key: 'href', label: 'Link', type: 'url' },
          { key: 'icon', label: 'Icon class', type: 'text' },
        ],
      },
    ],
    defaultData: {
      description:
        'CA Agency is a full-service influencer marketing agency connecting brands with creators through strategy, production, and performance-led campaigns.',
      address: 'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.',
      email: 'info@caagency.com',
      phone: '+971-58-510-7546',
      registrationNo: '2417532.01',
      socialLinks: [
        { name: 'Instagram', href: 'https://www.instagram.com/caagency/', icon: 'fab fa-instagram' },
        { name: 'TikTok', href: 'https://www.tiktok.com/@caagency_', icon: 'fab fa-tiktok' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/caagency/', icon: 'fab fa-linkedin-in' },
        { name: 'Facebook', href: 'https://www.facebook.com/caagencyglobal/', icon: 'fab fa-facebook-f' },
      ],
    },
  },
  {
    key: 'privacy-policy',
    title: 'Privacy policy',
    description: 'Volledige privacy policy als HTML content.',
    fields: [
      { key: 'title', label: 'Titel', type: 'text' },
      { key: 'lastUpdated', label: 'Laatst bijgewerkt', type: 'text' },
      { key: 'html', label: 'HTML content', type: 'html', rows: 24 },
    ],
    defaultData: {
      title: 'Privacy Policy',
      lastUpdated: 'December 27, 2024',
      html: '<h2>1. Introduction</h2><p>This is the Privacy Policy of CA Agency. It explains how we collect, use, disclose, and safeguard your personal data when you visit our website or use our influencer marketing and talent management services.</p><h2>2. Data Controller</h2><p>CA Agency is the data controller responsible for your personal data. Contact us at info@caagency.com for questions about this policy.</p><h2>3. What Personal Data We Collect</h2><ul><li>Contact information such as name, email address, phone number, and company name.</li><li>Professional information such as job title, social media handles, and portfolio links.</li><li>Talent application data including photos, videos, and social media statistics.</li><li>Business inquiry details and communication records.</li><li>Device information, usage data, and cookies.</li></ul><h2>4. How We Use Your Personal Data</h2><ul><li>To provide our influencer marketing and talent management services.</li><li>To respond to inquiries and communicate about our services.</li><li>To connect brands with suitable influencers for campaigns.</li><li>To manage contracts, payments, and business relationships.</li><li>To improve our website, comply with law, and protect security.</li></ul><h2>5. Legal Basis for Processing</h2><ul><li>Contract performance.</li><li>Legitimate interests.</li><li>Legal obligations.</li><li>Consent where required.</li></ul><h2>6. How We Share Your Data</h2><p>We may share personal data with clients, service providers, legal authorities, or in connection with business transfers. We do not sell personal data.</p><h2>7. International Data Transfers</h2><p>We may transfer personal data outside the UAE with appropriate safeguards in place.</p><h2>8. Data Retention</h2><p>We retain personal data only as long as necessary for the purposes described in this policy and to meet legal or operational requirements.</p><h2>9. Your Rights</h2><p>You may have rights to access, correct, delete, or restrict processing of your personal data, subject to applicable law.</p><h2>10. Contact</h2><p>For privacy-related questions, contact <a href=\"mailto:info@caagency.com\">info@caagency.com</a>.</p>',
    },
  },
  {
    key: 'terms-of-service',
    title: 'Terms of service',
    description: 'Volledige terms of service als HTML content.',
    fields: [
      { key: 'title', label: 'Titel', type: 'text' },
      { key: 'lastUpdated', label: 'Laatst bijgewerkt', type: 'text' },
      { key: 'html', label: 'HTML content', type: 'html', rows: 24 },
    ],
    defaultData: {
      title: 'Terms of Service',
      lastUpdated: 'December 27, 2024',
      html: '<h2>1. Agreement</h2><p>These Terms of Service govern your use of the CA Agency website and services.</p><h2>2. Services</h2><p>CA Agency provides influencer marketing, creator management, campaign execution, and related digital services.</p><h2>3. Client Responsibilities</h2><ul><li>Provide accurate campaign information and timelines.</li><li>Approve deliverables in a timely manner.</li><li>Pay agreed fees according to the contract.</li></ul><h2>4. Talent Responsibilities</h2><ul><li>Create and deliver content according to agreed specifications.</li><li>Maintain authenticity and transparency in partnerships.</li><li>Comply with platform terms and disclosure requirements.</li></ul><h2>5. Intellectual Property</h2><p>Ownership and licensing of campaign content are governed by the applicable agreement between the parties.</p><h2>6. Payment Terms</h2><p>Payment schedules, currencies, and late payment consequences are defined in the applicable written agreement.</p><h2>7. Confidentiality</h2><p>All parties must keep confidential information private, including campaign strategy, pricing, and performance data.</p><h2>8. Limitation of Liability</h2><p>To the extent allowed by law, CA Agency is not liable for indirect or consequential damages and total liability is limited as set out in the relevant agreement.</p><h2>9. Governing Law</h2><p>These Terms are governed by the laws of the United Arab Emirates and disputes are subject to the courts of Dubai, UAE.</p>',
    },
  },
  {
    key: 'location-dubai',
    title: 'SEO pagina Dubai',
    description: 'Content voor influencer-marketing-dubai.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency Dubai',
        subtitle:
          'CA Agency is an influencer marketing agency in Dubai helping brands launch high-performing Instagram, TikTok, and YouTube campaigns with vetted creators across the UAE.',
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: '3000+', label: 'Campaigns Delivered' },
        { value: '18M+', label: 'Combined Followers' },
        { value: '150+', label: 'Global Brands' },
        { value: 'UAE', label: 'Core Market' },
      ],
      highlights: {
        title: 'Why Brands Hire Our Dubai Influencer Agency',
        items: [
          { title: 'Local Market Expertise', description: 'We build influencer campaigns around how Dubai audiences discover, evaluate, and buy across luxury, beauty, fashion, hospitality, and lifestyle.' },
          { title: 'Regional Scale', description: 'Campaigns launched with Dubai creators can expand efficiently into Abu Dhabi and the wider GCC when the brief requires broader reach.' },
          { title: 'Vetted Creator Network', description: 'Our agency sources creators with proven content quality, audience fit, and brand-safe execution across Instagram, TikTok, and YouTube.' },
          { title: 'Performance-Driven Delivery', description: 'We focus on measurable outcomes such as qualified traffic, conversions, and branded content performance rather than vanity metrics alone.' },
        ],
      },
      talents: { title: 'Our Dubai Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '🏨', title: 'Hospitality', description: 'Hotel, dining, and destination campaigns thrive in Dubai through short-form creator content.' },
          { icon: '💄', title: 'Beauty', description: 'Skincare, makeup, and luxury beauty launches perform strongly with creator-led education and trust.' },
          { icon: '👗', title: 'Fashion', description: 'Dubai audiences respond well to premium styling, shopping, and trend-driven collaborations.' },
        ],
      },
      cta: { title: 'Launch Your Dubai Campaign', description: 'Reach the right audience in Dubai with creators that align with your brand and objectives.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-uae',
    title: 'SEO pagina UAE',
    description: 'Content voor influencer-marketing-uae.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency UAE',
        subtitle: 'CA Agency is a UAE influencer marketing agency connecting brands with creators in Dubai, Abu Dhabi, Sharjah, and beyond for performance-led campaigns across Instagram, TikTok, and YouTube.',
        primaryButtonLabel: 'Start Your Campaign',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'Meet Our Creators',
        secondaryButtonHref: '/talents',
      },
      stats: [
        { value: 'Nationwide', label: 'Coverage' },
        { value: 'Multi-city', label: 'Creator Network' },
        { value: 'Cross-platform', label: 'Campaign Delivery' },
        { value: 'Regional', label: 'Brand Reach' },
      ],
      highlights: {
        title: 'Why Brands Choose Our UAE Influencer Agency',
        items: [
          { title: 'Nationwide Creator Access', description: 'We activate creators across Dubai, Abu Dhabi, Sharjah, and other emirates based on audience fit, not just follower counts.' },
          { title: 'Cross-Platform Campaigns', description: 'Our team manages end-to-end influencer campaigns across Instagram, TikTok, and YouTube with local market nuance.' },
          { title: 'Arabic And English Reach', description: 'We help brands combine local relevance with international appeal across multilingual UAE audiences.' },
          { title: 'Commercial Focus', description: 'Our UAE campaigns are built to support awareness, consideration, traffic, and conversion goals with clear reporting.' },
        ],
      },
      talents: { title: 'Our UAE Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Our UAE Influencer Services',
        items: [
          { icon: '📣', title: 'Campaign Management', description: 'End-to-end influencer campaign execution across Instagram, TikTok, and YouTube.' },
          { icon: '🎯', title: 'Talent Sourcing', description: "Access to the UAE's top creators in beauty, fashion, lifestyle, food, and tech." },
          { icon: '🎥', title: 'Content Production', description: 'High-quality branded content that resonates with UAE audiences.' },
        ],
      },
      cta: { title: 'Launch Your UAE Influencer Campaign', description: 'Reach UAE audiences with an influencer marketing agency that matches your brand with the right creators and campaign strategy.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-asia',
    title: 'SEO pagina Asia',
    description: 'Content voor influencer-marketing-asia.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency Asia',
        subtitle: 'CA Agency helps brands run influencer marketing campaigns across Asia with market-aware creators, localized strategy, and cross-border campaign management.',
        primaryButtonLabel: 'Start Your Campaign',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: 'Multi-market', label: 'Campaign Delivery' },
        { value: 'Regional', label: 'Creator Network' },
        { value: 'Localized', label: 'Market Strategy' },
        { value: 'Cross-platform', label: 'Execution' },
      ],
      highlights: {
        title: 'Why Brands Need An Asia Influencer Agency',
        items: [
          { title: 'Market Nuance Matters', description: 'Asia is not one audience. We adapt creator selection, messaging, and content formats to each market and consumer behavior.' },
          { title: 'Cross-Border Coordination', description: 'We help brands manage briefs, approvals, production, and reporting across multiple Asian markets without fragmenting execution.' },
          { title: 'Platform-Aware Strategy', description: 'Campaigns are built around the right mix of Instagram, TikTok, YouTube, and local platform behavior depending on the target market.' },
          { title: 'Commercial Performance', description: 'Our focus is not just reach. We build creator campaigns to support awareness, consideration, traffic, and conversion goals.' },
        ],
      },
      talents: { title: 'Creators For Asian Campaigns', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Categories In Asia',
        items: [
          { icon: '💄', title: 'Beauty & Skincare', description: 'Beauty brands benefit from education-led content, product trial, and strong creator trust across many Asian markets.' },
          { icon: '📱', title: 'Tech & Mobile', description: 'Creators help tech brands explain features, differentiate products, and drive conversion through demos and reviews.' },
          { icon: '🧳', title: 'Travel & Hospitality', description: 'Regional travel demand and destination-led content make creator partnerships effective for awareness and bookings.' },
        ],
      },
      cta: { title: 'Launch Your Asia Influencer Campaign', description: 'Work with an influencer marketing agency that can coordinate creators, content, and strategy across Asian markets.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-saudi-arabia',
    title: 'SEO pagina Saudi Arabia',
    description: 'Content voor influencer-marketing-saudi-arabia.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency in Saudi Arabia',
        subtitle: 'Connect with creators that resonate across Riyadh, Jeddah, and the wider Saudi market through culturally aware, performance-led campaigns.',
        primaryButtonLabel: 'Start Your Campaign',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: 'High', label: 'Mobile Usage' },
        { value: 'Fast', label: 'Creator Economy Growth' },
        { value: 'Strong', label: 'Beauty & Fashion Demand' },
        { value: 'Regional', label: 'Influence' },
      ],
      highlights: {
        title: 'Why Choose Influencer Marketing in Saudi Arabia?',
        items: [
          { title: 'Young Digital Audience', description: 'Saudi Arabia has a highly connected, mobile-first population that actively engages with creators.' },
          { title: 'Culture-Led Strategy', description: 'Campaigns perform best when messaging, formats, and creators fit local culture and audience expectations.' },
          { title: 'Strong Creator Trust', description: 'Audiences often rely on creator recommendations for product discovery and purchase decisions.' },
          { title: 'Rapid Brand Adoption', description: 'More brands are shifting spend into creator partnerships to build reach and relevance.' },
        ],
      },
      talents: { title: 'Our Saudi Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '💄', title: 'Beauty', description: 'Beauty content and tutorials are a major driver of discovery and product trial.' },
          { icon: '👗', title: 'Fashion', description: 'Modest fashion, premium styling, and seasonal campaigns perform strongly.' },
          { icon: '📱', title: 'Tech & Lifestyle', description: 'Tech launches and everyday lifestyle creators help brands feel current and relatable.' },
        ],
      },
      cta: { title: 'Launch Your Saudi Campaign', description: 'Build creator partnerships that feel authentic to the Saudi audience.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-gcc',
    title: 'SEO pagina GCC',
    description: 'Content voor influencer-marketing-gcc.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency GCC',
        subtitle: 'Run creator campaigns across the GCC with one coordinated influencer marketing strategy spanning the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.',
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'Meet Our Talents',
        secondaryButtonHref: '/talents',
      },
      stats: [
        { value: '6', label: 'Core Markets' },
        { value: 'Regional', label: 'Campaign Coordination' },
        { value: 'Multi-language', label: 'Execution' },
        { value: 'Cross-border', label: 'Creator Reach' },
      ],
      highlights: {
        title: 'Why Brands Choose Our GCC Influencer Agency',
        items: [
          { title: 'Regional Consistency', description: 'Keep brand messaging consistent while adapting content to each market.' },
          { title: 'Scalable Reach', description: 'Coordinate multiple creators and countries without duplicating internal effort.' },
          { title: 'Local Relevance', description: 'Use market-aware creators and campaign structures that reflect audience nuance.' },
          { title: 'Operational Simplicity', description: 'Manage briefing, approvals, content, and reporting through one partner.' },
        ],
      },
      talents: { title: 'Creators for GCC Campaigns', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '✈️', title: 'Travel & Hospitality', description: 'Destination and hospitality campaigns scale especially well across the region.' },
          { icon: '💄', title: 'Beauty', description: 'Beauty brands benefit from strong creator trust and tutorial-style content.' },
          { icon: '🛍️', title: 'Retail', description: 'Retail launches perform well when localized through creators in each market.' },
        ],
      },
      cta: { title: 'Plan Your GCC Rollout', description: 'Coordinate one campaign framework across multiple Gulf markets.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-korea',
    title: 'SEO pagina Korea',
    description: 'Content voor influencer-marketing-korea.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency Korea',
        subtitle: 'CA Agency helps brands reach Korean audiences through localized influencer marketing campaigns in beauty, fashion, lifestyle, and tech.',
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: 'Trend-led', label: 'Consumer Behavior' },
        { value: 'High', label: 'Beauty Adoption' },
        { value: 'Strong', label: 'Social Commerce' },
        { value: 'Fast', label: 'Campaign Velocity' },
      ],
      highlights: {
        title: 'Why Brands Hire Our Korea Influencer Agency',
        items: [
          { title: 'Beauty Leadership', description: 'Korea is one of the most influential beauty markets in the world with strong creator authority.' },
          { title: 'Trend Sensitivity', description: 'Audiences respond to fresh formats, sharp visuals, and culturally current messaging.' },
          { title: 'Social Proof Matters', description: 'Creators play a major role in validating products and driving trial.' },
          { title: 'Export-Friendly Positioning', description: 'Korean campaigns often support both local visibility and international brand perception.' },
        ],
      },
      talents: { title: 'Our Korean Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '💄', title: 'Beauty & Skincare', description: 'Education-led product storytelling performs especially well in Korea.' },
          { icon: '👟', title: 'Fashion & Streetwear', description: 'Style-led creator content drives trend relevance and brand cachet.' },
          { icon: '📲', title: 'Tech & Gadgets', description: 'Product demos and lifestyle integrations help tech brands stand out.' },
        ],
      },
      cta: { title: 'Launch Your Korea Campaign', description: 'Build culturally relevant creator partnerships for the Korean market.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-usa',
    title: 'SEO pagina USA',
    description: 'Content voor influencer-marketing-usa.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency USA',
        subtitle: 'CA Agency is an influencer marketing agency for the USA, helping brands run performance-led creator campaigns across Instagram, TikTok, and YouTube.',
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: '$6.2B', label: 'US Market Size 2025' },
        { value: '84%', label: 'Adults on YouTube' },
        { value: '75%', label: 'Marketers Use Instagram' },
        { value: '60%', label: 'Use TikTok Marketing' },
      ],
      highlights: {
        title: 'Why Brands Hire Our USA Influencer Agency',
        items: [
          { title: "World's Largest Market", description: 'The US creator economy offers scale, mature infrastructure, and proven performance across industries.' },
          { title: 'High Consumer Trust', description: 'Consumers rely on creators for product discovery, validation, and purchase confidence.' },
          { title: 'Platform Diversity', description: 'Strong creator ecosystems exist across YouTube, Instagram, TikTok, and emerging channels.' },
          { title: 'Micro-Influencer Advantage', description: 'Smaller creators often outperform on engagement and cost-efficiency.' },
        ],
      },
      talents: { title: 'Our US Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '💄', title: 'Beauty & Personal Care', description: 'Micro-influencers help beauty brands drive product trial and conversion.' },
          { icon: '👗', title: 'Fashion & Retail', description: 'Short-form style content supports both brand awareness and direct sales.' },
          { icon: '💪', title: 'Health & Wellness', description: 'Wellness creators help brands build trust and habitual engagement.' },
        ],
      },
      cta: { title: 'Launch Your US Campaign', description: 'Reach American audiences with creators matched to your audience and goals.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-uk',
    title: 'SEO pagina UK',
    description: 'Content voor influencer-marketing-uk.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency in UK',
        subtitle: "Connect your brand with Britain's most influential content creators. Access Europe's largest influencer marketing market with strong purchase intent and mature creator ecosystems.",
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: '£930M', label: 'UK Market 2024' },
        { value: '55.5M', label: 'Social Media Users' },
        { value: '69%', label: 'Purchase After Seeing' },
        { value: '89%', label: 'Brands Use Instagram' },
      ],
      highlights: {
        title: 'Why Choose Influencer Marketing in the UK?',
        items: [
          { title: "Europe's Largest Market", description: 'The UK leads Europe in influencer marketing maturity, spend, and operational sophistication.' },
          { title: 'High Conversion Rates', description: 'UK consumers frequently purchase after seeing creator-led recommendations.' },
          { title: 'Sophisticated Creator Ecosystem', description: 'Brands increasingly favor long-term, authentic creator partnerships over one-off celebrity posts.' },
          { title: 'Data-Driven Results', description: 'Performance measurement and brand safety are core expectations in the UK market.' },
        ],
      },
      talents: { title: 'Our UK Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '👗', title: 'Fashion', description: 'Fashion remains one of the highest-performing creator categories in the UK.' },
          { icon: '💄', title: 'Beauty', description: 'Beauty campaigns benefit from strong creator authority and tutorial formats.' },
          { icon: '🍽️', title: 'Food & Drink', description: 'Creator trust is particularly strong in food, drink, and everyday recommendations.' },
        ],
      },
      cta: { title: 'Launch Your UK Campaign', description: 'Build high-trust creator partnerships for British audiences.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-canada',
    title: 'SEO pagina Canada',
    description: 'Content voor influencer-marketing-canada.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency in Canada',
        subtitle: "Connect your brand with Canada's top content creators. Access a strong bilingual creator market across Toronto, Vancouver, and Montreal.",
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: '$660M', label: 'Market Size 2025' },
        { value: '882K+', label: 'Active Influencers' },
        { value: '70%', label: 'Discover via Influencers' },
        { value: '40%', label: 'Buy Immediately' },
      ],
      highlights: {
        title: 'Why Choose Influencer Marketing in Canada?',
        items: [
          { title: 'Massive Creator Network', description: 'Canada offers broad creator coverage across major cities and key content categories.' },
          { title: 'High Purchase Intent', description: 'A large share of Canadian consumers discover products through creators.' },
          { title: 'Bilingual Expertise', description: 'English and French localization matters, especially for Quebec-facing campaigns.' },
          { title: 'Long-Term Value', description: 'Ongoing creator collaborations tend to outperform one-off partnerships.' },
        ],
      },
      talents: { title: 'Our Canadian Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '👗', title: 'Fashion', description: 'Local relevance paired with global trends makes fashion a strong creator category.' },
          { icon: '💄', title: 'Beauty', description: 'Skincare and beauty content perform well with education-led creator content.' },
          { icon: '💻', title: 'Tech', description: 'Tech launches and reviews benefit from creator trust and detailed demos.' },
        ],
      },
      cta: { title: 'Launch Your Canada Campaign', description: 'Reach Canadian audiences with the right creator mix and market nuance.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
  {
    key: 'location-australia',
    title: 'SEO pagina Australia',
    description: 'Content voor influencer-marketing-australia.',
    fields: basicSeoLandingFields,
    defaultData: {
      hero: {
        title: 'Influencer Marketing\nAgency in Australia',
        subtitle: "Connect your brand with Australia's most influential content creators across Sydney, Melbourne, and beyond.",
        primaryButtonLabel: 'Get Started',
        primaryButtonHref: '/contact',
        secondaryButtonLabel: 'View Our Work',
        secondaryButtonHref: '/work',
      },
      stats: [
        { value: '$589M', label: 'Market Size 2025' },
        { value: '20.9M', label: 'Social Media Users' },
        { value: '46%', label: 'Purchase After Seeing' },
        { value: '70%', label: 'Brands Increasing Budget' },
      ],
      highlights: {
        title: 'Why Choose Influencer Marketing in Australia?',
        items: [
          { title: 'Highly Engaged Audience', description: 'Australians are heavy social media users and respond strongly to creator-led content.' },
          { title: 'Strong Purchase Influence', description: 'Influencers play a meaningful role in research, consideration, and conversion.' },
          { title: 'Authenticity-First Culture', description: 'Relatable creators and trust-based partnerships outperform overly polished campaigns.' },
          { title: 'Growing Investment', description: 'Australian brands continue increasing spend into influencer marketing.' },
        ],
      },
      talents: { title: 'Our Australian Market Creators', buttonLabel: 'View All Talents', buttonHref: '/talents' },
      industries: {
        title: 'Top Performing Industries',
        items: [
          { icon: '🏃', title: 'Lifestyle & Fitness', description: 'Lifestyle and fitness creators hold strong influence with Australian audiences.' },
          { icon: '👗', title: 'Fashion', description: 'Fashion performs well with trend-led but approachable creator storytelling.' },
          { icon: '💄', title: 'Beauty', description: 'Beauty creators help drive discovery, trial, and repeat engagement.' },
        ],
      },
      cta: { title: 'Launch Your Australia Campaign', description: 'Reach Australian audiences with creators who fit your category and market.', buttonLabel: 'Get in Touch', buttonHref: '/contact' },
    },
  },
]

export const siteContentDefinitionsByKey = Object.fromEntries(
  siteContentDefinitions.map((entry) => [entry.key, entry])
)
