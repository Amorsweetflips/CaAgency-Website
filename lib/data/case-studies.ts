// Case-study catalog for /case-studies. One entry per campaign video in
// lib/data/videos.ts, keyed by video src so the work grid can deep-link.
//
// IMPORTANT: `metrics` must only contain real, client-approved numbers.
// The template hides the results-figures section whenever the array is empty,
// so leave it empty until verified figures are supplied, never estimate.

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  slug: string
  brand: string
  title: string
  /** Industry vertical shown as the card/eyebrow tag */
  vertical: string
  platforms: string[]
  /** Creator handle when the collaboration is public */
  creator?: string
  videoSrc: string
  /** One-liner for cards and meta descriptions */
  summary: string
  brief: string
  approach: string
  outcome: string
  services: string[]
  /** Real client-approved figures only, section is hidden while empty */
  metrics: CaseStudyMetric[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'honor-smartphone-launch',
    brand: 'HONOR',
    title: 'HONOR Creator Collaboration',
    vertical: 'Consumer Tech',
    platforms: ['Instagram Reels', 'TikTok'],
    videoSrc: '/videos/work/honor.mp4',
    summary:
      'Creator-led short-form video putting HONOR devices in real, everyday hands instead of a spec sheet.',
    brief:
      'HONOR wanted its devices shown the way people actually use them, in the hand, in daily life, rather than through studio product shots. The content had to feel native to the creator’s feed while keeping the device unmistakably in focus.',
    approach:
      'We matched HONOR with a creator whose audience skews toward lifestyle and everyday tech, then built the concept around moments where the phone is naturally on camera. Scripting stayed loose: the creator kept their own voice and pacing, and the device features were woven into the story instead of listed.',
    outcome:
      'The collaboration delivered platform-native vertical video that HONOR could run as creator content, giving the brand an authentic presence in feeds where traditional ads get skipped.',
    services: ['Creator matching', 'Concept development', 'Content production', 'Usage rights'],
    metrics: [],
  },
  {
    slug: 'ysl-beauty-campaign',
    brand: 'YSL Beauty',
    title: 'YSL Beauty Creator Campaign',
    vertical: 'Luxury Beauty',
    platforms: ['Instagram Reels', 'TikTok'],
    videoSrc: '/videos/work/ysl-beauty.mp4',
    summary:
      'Luxury beauty content that keeps YSL’s polish while feeling at home in a creator’s feed.',
    brief:
      'Luxury beauty is a balancing act: the content has to protect the brand’s premium codes while still feeling like something a creator would genuinely post. YSL Beauty needed short-form video that did both.',
    approach:
      'We selected a beauty creator whose existing aesthetic already sat close to the brand, lighting, tone, and finish, so the sponsored content didn’t break the feed. Application-led sequences kept the product in frame and demonstrated texture and payoff up close.',
    outcome:
      'YSL Beauty received creator content that held its premium look in a vertical, sound-on format, the kind of asset that works both organically on the creator’s channel and as paid social from the brand side.',
    services: ['Creator matching', 'Brand-safety review', 'Content production'],
    metrics: [],
  },
  {
    slug: 'kylie-cosmetics-campaign',
    brand: 'Kylie Cosmetics',
    title: 'Kylie Cosmetics Creator Campaign',
    vertical: 'Color Cosmetics',
    platforms: ['Instagram Reels', 'TikTok'],
    videoSrc: '/videos/work/kylie-cosmetics.mp4',
    summary:
      'Creator content pairing Kylie Cosmetics products with a face and voice audiences already trust.',
    brief:
      'For a brand with enormous built-in awareness, the job of creator content shifts: it’s less about introduction and more about credibility, real application, real texture, a real person’s opinion.',
    approach:
      'The content leaned into up-close application and honest first-person delivery, the format that earns trust in beauty. We handled creator selection, brief development, and the review cycle between creator and brand.',
    outcome:
      'Kylie Cosmetics received relatable, application-led creator video that complements its polished brand channels with a street-level point of view.',
    services: ['Creator matching', 'Campaign management', 'Content production'],
    metrics: [],
  },
  {
    slug: 'yesstyle-collaboration',
    brand: 'YesStyle',
    title: 'YesStyle Creator Collaboration',
    vertical: 'K-Beauty Retail',
    platforms: ['TikTok', 'Instagram Reels'],
    videoSrc: '/videos/work/yesstyle.mp4',
    summary:
      'Haul-style creator content built for YesStyle’s discovery-driven K-beauty shoppers.',
    brief:
      'As a marketplace, YesStyle benefits most from discovery-format content, hauls and multi-product features that mirror how its customers actually shop. The brief asked for content with that browsing energy.',
    approach:
      'We structured the video as a curated haul, giving each product a moment while keeping the pace fast enough for short-form retention. The creator’s genuine enthusiasm for K-beauty carried the selection.',
    outcome:
      'YesStyle received discovery-style creator content that showcases range, the retailer’s core advantage, in the format its K-beauty audience already watches.',
    services: ['Creator matching', 'Concept development', 'Content production'],
    metrics: [],
  },
  {
    slug: 'insta360-campaign',
    brand: 'Insta360',
    title: 'Insta360 X Creator Campaign',
    vertical: 'Consumer Tech',
    platforms: ['Instagram Reels', 'TikTok', 'YouTube'],
    videoSrc: '/videos/work/insta360x.mp4',
    summary:
      'Action-forward creator content that lets the Insta360 X camera demonstrate itself.',
    brief:
      'A 360° camera is its own best salesperson, if the footage shows what it can do. Insta360 needed creator content where the product’s output was the star, not a talking-head review.',
    approach:
      'The concept put the camera in motion: creator-shot footage showing the impossible-looking angles and reframing the X-series is known for. The device appears in use, and the results speak in the edit.',
    outcome:
      'Insta360 received show-don’t-tell creator video where the proof of the product is the content itself, the strongest possible format for camera hardware.',
    services: ['Creator matching', 'Concept development', 'Content production'],
    metrics: [],
  },
  {
    slug: 'mixsoon-skincare',
    brand: 'Mixsoon',
    title: 'Mixsoon K-Beauty Campaign',
    vertical: 'K-Beauty Skincare',
    platforms: ['TikTok', 'Instagram Reels'],
    videoSrc: '/videos/work/mixsoon.mp4',
    summary:
      'Minimalist skincare storytelling matching Mixsoon’s single-ingredient K-beauty philosophy.',
    brief:
      'Mixsoon’s identity is minimalism, short ingredient lists, single-hero formulas. The content had to reflect that restraint rather than bury it under a maximal beauty edit.',
    approach:
      'We briefed the creator toward a stripped-back visual style: clean frames, texture macro shots, and a routine narrative focused on one hero product at a time, mirroring the brand’s one-ingredient ethos.',
    outcome:
      'The campaign delivered creator content whose look and pacing embody the brand position itself, minimal, ingredient-first K-beauty, instead of a generic skincare ad.',
    services: ['Creator matching', 'K-beauty strategy', 'Content production'],
    metrics: [],
  },
  {
    slug: 'kiko-milano-campaign',
    brand: 'Kiko Milano',
    title: 'Kiko Milano × @_idareen_',
    vertical: 'Color Cosmetics',
    platforms: ['Instagram Reels', 'TikTok'],
    creator: '@_idareen_',
    videoSrc: '/videos/work/idareen-kikomilano.mp4',
    summary:
      'CA Agency talent @_idareen_ fronting a Kiko Milano campaign with application-led beauty content.',
    brief:
      'Kiko Milano wanted its products demonstrated by a creator with genuine beauty credibility in front of an engaged audience, content that works as a tutorial first and an ad second.',
    approach:
      'We matched the brand with our talent @_idareen_, whose beauty content style fits Kiko’s accessible-glamour positioning, and managed the collaboration end to end: brief, production, brand review, and delivery.',
    outcome:
      'The partnership produced polished, application-led campaign content from a creator on our own roster, the full-service model where CA Agency handles both the brand side and the talent side.',
    services: ['Talent management', 'Campaign management', 'Content production'],
    metrics: [],
  },
  {
    slug: 'juvias-place-campaign',
    brand: "Juvia's Place",
    title: "Juvia's Place × @beatrixramosaj",
    vertical: 'Color Cosmetics',
    platforms: ['Instagram Reels', 'TikTok'],
    creator: '@beatrixramosaj',
    videoSrc: '/videos/work/beatrix-juviasplace.mp4',
    summary:
      "Pigment-forward creator content for Juvia's Place with CA Agency talent @beatrixramosaj.",
    brief:
      "Juvia's Place is loved for rich, high-pigment color. The brief asked for content that put that pigment payoff on camera through a creator whose audience trusts her looks.",
    approach:
      'Our talent @beatrixramosaj built the content around swatch-and-apply moments where the pigment does the persuading. We managed scheduling, brand feedback, and final delivery.',
    outcome:
      "Juvia's Place received creator content that leads with its most distinctive strength, color payoff, delivered through a managed talent relationship with a single point of contact.",
    services: ['Talent management', 'Campaign management', 'Content production'],
    metrics: [],
  },
  {
    slug: 'nars-campaign',
    brand: 'NARS',
    title: 'NARS × @thefashionfreakk',
    vertical: 'Prestige Beauty',
    platforms: ['Instagram Reels', 'TikTok'],
    creator: '@thefashionfreakk',
    videoSrc: '/videos/work/fashionfreakk-nars.mp4',
    summary:
      'Prestige beauty content for NARS fronted by CA Agency talent @thefashionfreakk.',
    brief:
      'NARS needed creator content that carried prestige-beauty polish while reaching an audience through a personality they follow for style, not just products.',
    approach:
      'We paired NARS with our talent @thefashionfreakk, whose fashion-led aesthetic frames beauty products inside a broader style story. The content integrates the product into her signature look rather than isolating it.',
    outcome:
      'The collaboration gave NARS style-context creator content, beauty presented as part of a look and a life, which is where prestige brands win on short-form.',
    services: ['Talent management', 'Campaign management', 'Content production'],
    metrics: [],
  },
  {
    slug: 'elemis-campaign',
    brand: 'ELEMIS',
    title: 'ELEMIS × @huda_gash',
    vertical: 'Premium Skincare',
    platforms: ['Instagram Reels', 'TikTok'],
    creator: '@huda_gash',
    videoSrc: '/videos/work/huda-elemis.mp4',
    summary:
      'Premium skincare storytelling for ELEMIS with CA Agency talent @huda_gash.',
    brief:
      'ELEMIS sits in premium skincare, where content has to communicate ritual and texture, the sensorial reasons people pay more. The brief asked for creator content with that elevated, self-care feel.',
    approach:
      'Our talent @huda_gash built the content around the ritual of application: texture close-ups, unhurried pacing, and a first-person voiceover that reads as genuine routine rather than a read script.',
    outcome:
      'ELEMIS received sensorial, routine-led creator content matched to its premium positioning, produced through a fully managed talent collaboration.',
    services: ['Talent management', 'Campaign management', 'Content production'],
    metrics: [],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

/** Look up the case study for a campaign video src (used by the /work grid). */
export function caseStudyForVideo(src: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.videoSrc === src)
}
