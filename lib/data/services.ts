// Canonical five-service catalog (July 2026 round 3). One entry per homepage
// service square, one subpage per entry at /services/<slug>. Copy is
// deliberately general: no client brand names, no campaign specifics.

export interface ServiceDetail {
  slug: string
  title: string
  icon: string
  tagline: string
  summary: string
  breakdown: string[]
  deliverables: string[]
  image: string
  imageAlt: string
}

export const services: ServiceDetail[] = [
  {
    slug: 'influencer-campaigns',
    title: 'Influencer Campaigns',
    icon: 'spark',
    tagline: 'Creator partnerships that stop the scroll.',
    summary:
      'End-to-end influencer campaigns across Instagram, TikTok, and YouTube — from creator matching and briefing to rights, approvals, and reporting.',
    breakdown: [
      'Every campaign starts with fit. We map your audience, category, and objectives against our creator network and shortlist the voices whose communities genuinely overlap with your customer — reach matters, but resonance converts.',
      'From there we run the campaign in-house: creative briefs that leave room for the creator’s own voice, timelines and deliverable schedules, content approvals, usage rights, and platform compliance, all handled by one team.',
      'When content goes live we track it — delivery, engagement, traffic, and sentiment — and report in plain language, with learnings that sharpen the next flight.',
    ],
    deliverables: [
      'Campaign strategy & creative direction',
      'Creator shortlisting, vetting & outreach',
      'Contracting & usage rights',
      'Briefing, approvals & quality control',
      'Performance reporting & insights',
    ],
    image: '/images/services/influencer-campaigns.webp',
    imageAlt: 'Creator presenting skincare products in a campaign reel',
  },
  {
    slug: 'talent-management',
    title: 'Full-Service Talent Management',
    icon: 'person',
    tagline: 'Careers built for the long term.',
    summary:
      'End-to-end representation for creators — paid collaborations, exclusive partnerships, negotiation, and long-term career growth, handled by one team.',
    breakdown: [
      'We represent a focused roster rather than a directory. That means every talent gets real management: positioning, rate strategy, and a partnerships pipeline that fits where their content and audience are heading.',
      'Day to day, we handle inbound and outbound deal-flow, negotiate terms and usage, manage contracts and invoicing, and protect the creator’s time so they can stay focused on making great content.',
      'Long term, we plan careers — new platforms, new formats, and the kind of brand relationships that renew year after year instead of ending at one post.',
    ],
    deliverables: [
      'Brand outreach & inbound deal-flow',
      'Negotiation, contracting & invoicing',
      'Content & posting strategy',
      'Audience growth & rate development',
      'Long-term career planning',
    ],
    image: '/images/services/talent-management.webp',
    imageAlt: 'Creator on set during a beauty campaign shoot',
  },
  {
    slug: 'content-production',
    title: 'Content Creation & Production',
    icon: 'video',
    tagline: 'Scroll-stopping content, made end to end.',
    summary:
      'Branded short-form video and stills — concepted, shot, and edited in-house to engage audiences and elevate brand visibility on every platform.',
    breakdown: [
      'Good short-form looks effortless because the thinking happened before the camera rolled. We concept hooks, scripts, and shot lists built around how people actually watch: the first second earns the next ten.',
      'Production runs through our creators and production partners — on location or in studio — so the content feels native to the feed rather than like an ad dropped into it.',
      'Every master is delivered edit-complete and platform-ready: cutdowns, aspect versions, captions, and covers, cleared for the usage you booked.',
    ],
    deliverables: [
      'Creative concepts, hooks & scripts',
      'On-location or studio production',
      'Edits, cutdowns & aspect-ratio versions',
      'Captions, covers & CTAs',
      'Usage-ready master files',
    ],
    image: '/images/services/content-production.webp',
    imageAlt: 'Creator applying makeup in a produced campaign video',
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    icon: 'chart',
    tagline: 'Creator content, measured like media.',
    summary:
      'Data-driven amplification of creator content — paid social, creative testing, and conversion tracking with measurable ROI from awareness to sale.',
    breakdown: [
      'Organic reach starts the story; paid distribution finishes it. We amplify the creator content that already proves itself, running it as branded-content and spark-style ads with the targeting the organic post never had.',
      'Creative is tested like media: hooks, openers, and formats compared head-to-head, budgets shifted to the variants that hold attention and convert.',
      'Tracking is set up before the first dirham is spent — pixels, events, and UTMs — so reporting speaks in outcomes: traffic, carts, and return on spend, not impressions alone.',
    ],
    deliverables: [
      'Paid amplification of creator content',
      'Creative testing matrices',
      'Audience & funnel architecture',
      'Conversion tracking & attribution',
      'Weekly optimisation & reporting',
    ],
    image: '/images/services/performance-marketing.webp',
    imageAlt: 'Creator mid-application in a high-performing campaign video',
  },
  {
    slug: 'brand-consultancy',
    title: 'Brand Marketing Management & Consultancy',
    icon: 'compass',
    tagline: 'Strategic guidance, from positioning to launch.',
    summary:
      'Strategic marketing guidance for beauty, skincare, and lifestyle brands — positioning, launch planning, market entry, and always-on brand management.',
    breakdown: [
      'Some brands need a campaign; others need a compass. Our consultancy work starts with an honest audit of where the brand sits — positioning, channels, content, and community — and where the category is moving.',
      'From that base we build the plan: messaging and creative direction, launch and go-to-market roadmaps, market-entry strategy for new regions, and the influencer program design to carry it.',
      'For brands that want a partner rather than a project, we run always-on management — a standing team that plans, executes, and iterates quarter after quarter.',
    ],
    deliverables: [
      'Brand, channel & content audits',
      'Positioning & messaging',
      'Launch & go-to-market planning',
      'Influencer program design',
      'Always-on advisory & management',
    ],
    image: '/images/services/brand-consultancy.webp',
    imageAlt: 'Creator in a premium skincare self-care campaign video',
  },
]

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))

export function getService(slug: string): ServiceDetail | undefined {
  return servicesBySlug[slug]
}
