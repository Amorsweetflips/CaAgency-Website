// Blog guides linked from high-traffic landing pages so link equity flows
// into the blog cluster. Every href must be a published post.

export interface GuideLink {
  href: string
  title: string
  desc: string
}

const costGuide: GuideLink = {
  href: '/blog/influencer-marketing-cost-2026',
  title: 'How Much Does Influencer Marketing Cost?',
  desc: 'A clear pricing guide by creator tier, platform, and campaign type.',
}
const beautyGuide: GuideLink = {
  href: '/blog/influencer-marketing-for-beauty-brands',
  title: 'Influencer Marketing for Beauty Brands',
  desc: 'How beauty and skincare brands turn creator content into measurable growth.',
}
const ftcGuide: GuideLink = {
  href: '/blog/ftc-disclosure-guidelines-influencer-marketing',
  title: 'FTC Influencer Disclosure Guide',
  desc: 'Practical disclosure requirements for compliant creator campaigns in the USA.',
}
const roiGuide: GuideLink = {
  href: '/blog/how-to-measure-influencer-marketing-roi',
  title: 'How to Measure Influencer ROI',
  desc: 'A framework for reach, engagement, qualified traffic, conversions, and return.',
}
const creatorMixGuide: GuideLink = {
  href: '/blog/micro-vs-macro-influencers',
  title: 'Micro vs. Macro Influencers',
  desc: 'Choose the right creator mix for your audience, objectives, and budget.',
}
const kBeautyGuide: GuideLink = {
  href: '/blog/k-beauty-influencer-marketing-guide',
  title: 'K-Beauty Influencer Marketing Guide',
  desc: 'A market-entry guide for skincare brands reaching US and global audiences.',
}

export const locationGuides: GuideLink[] = [costGuide, beautyGuide, ftcGuide, roiGuide, creatorMixGuide, kBeautyGuide]

export const gulfCostGuide: GuideLink = {
  href: '/blog/influencer-marketing-dubai-uae-cost-guide',
  title: 'Influencer Marketing Costs in Dubai and the UAE',
  desc: 'Rate drivers, licensing rules, and how to budget a first Gulf campaign.',
}

export const serviceGuides: Record<string, GuideLink[]> = {
  'influencer-campaigns': [
    {
      href: '/blog/how-to-run-influencer-marketing-campaign',
      title: 'How to Run an Influencer Marketing Campaign',
      desc: 'A step-by-step guide from goal-setting to ROI reporting.',
    },
    {
      href: '/blog/influencer-marketing-guide',
      title: 'The Complete Guide to Influencer Marketing',
      desc: 'Costs, platforms, ROI, compliance, and trends in one place.',
    },
    {
      href: '/blog/tiktok-influencer-marketing-guide',
      title: 'TikTok Influencer Marketing Guide',
      desc: 'Creator selection, TikTok Shop, Spark Ads, and measurement.',
    },
  ],
  'talent-management': [
    creatorMixGuide,
    {
      href: '/blog/influencer-marketing-trends-2026',
      title: 'Influencer Marketing Trends 2026',
      desc: 'Where creator marketing is heading and what brands expect next.',
    },
    ftcGuide,
  ],
  'content-production': [
    {
      href: '/blog/ugc-vs-influencer-marketing',
      title: 'UGC vs. Influencer Marketing',
      desc: 'What separates the two, and when to use each.',
    },
    {
      href: '/blog/instagram-influencer-marketing-2026',
      title: 'Instagram Influencer Marketing in 2026',
      desc: 'The formats and partnerships that work on Instagram now.',
    },
    beautyGuide,
  ],
  'performance-marketing': [
    roiGuide,
    costGuide,
    {
      href: '/blog/how-to-spot-fake-influencers',
      title: 'How to Spot Fake Influencers',
      desc: 'Detect fake followers and bot engagement before you spend.',
    },
  ],
  'brand-consultancy': [
    {
      href: '/blog/how-to-choose-influencer-marketing-agency',
      title: 'How to Choose an Influencer Marketing Agency',
      desc: 'A checklist covering vetting, pricing, reporting, and red flags.',
    },
    {
      href: '/blog/influencer-marketing-agency-vs-in-house',
      title: 'In-House vs. Agency',
      desc: 'Costs, speed, and creator access compared for each model.',
    },
    kBeautyGuide,
  ],
}
