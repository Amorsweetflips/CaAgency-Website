// Every seedable blog post, in publish order. Shared by the seed script, the
// cover generator and the tests, so none of them import Prisma.
import { post as agencyVsInHouse } from './influencer-marketing-agency-vs-in-house'
import { post as costGuide } from './influencer-marketing-cost-2026'
import { post as howToRun } from './how-to-run-influencer-marketing-campaign'
import { post as measureRoi } from './how-to-measure-influencer-marketing-roi'
import { post as tiktokGuide } from './tiktok-influencer-marketing-guide'
import { post as chooseAgency } from './how-to-choose-influencer-marketing-agency'
import { post as trends2026 } from './influencer-marketing-trends-2026'
import { post as instagramGuide } from './instagram-influencer-marketing-2026'
import { post as microVsMacro } from './micro-vs-macro-influencers'
import { post as ugcVsInfluencer } from './ugc-vs-influencer-marketing'
import { post as beautyGuide } from './influencer-marketing-for-beauty-brands'
import { post as fashionGuide } from './influencer-marketing-for-fashion-brands'
import { post as wellnessGuide } from './influencer-marketing-for-health-wellness'
import { post as ftcGuide } from './ftc-disclosure-guidelines-influencer-marketing'
import { post as fakeInfluencers } from './how-to-spot-fake-influencers'
import { post as influencerMarketingGuide } from './influencer-marketing-guide'
import { post as welcomePost } from './welcome-to-ca-agency-blog'
import { post as dubaiUaeCost } from './influencer-marketing-dubai-uae-cost-guide'
import { post as kBeautyGuide } from './k-beauty-influencer-marketing-guide'
import { post as saudiArabiaGuide } from './saudi-arabia-influencer-marketing-guide'
import { post as youtubeBeautyGuide } from './youtube-influencer-marketing-beauty-brands'
import { post as tiktokShopGuide } from './tiktok-shop-beauty-brands'
import { post as whitelistingGuide } from './influencer-whitelisting-spark-ads-guide'
import { post as findSkincareCreators } from './find-skincare-influencers-usa'
import { post as tiktokShopFashionWellness } from './tiktok-shop-fashion-wellness-brands'
import { post as instagramReelsBeauty } from './instagram-reels-beauty-brands'

export const seedPosts = [
  { ...welcomePost, publishedAt: new Date('2026-01-02T10:00:00Z') },
  { ...trends2026, publishedAt: new Date('2026-01-09T10:00:00Z') },
  { ...instagramGuide, publishedAt: new Date('2026-01-22T10:00:00Z') },
  { ...microVsMacro, publishedAt: new Date('2026-02-05T10:00:00Z') },
  { ...ugcVsInfluencer, publishedAt: new Date('2026-02-19T10:00:00Z') },
  { ...beautyGuide, publishedAt: new Date('2026-03-04T10:00:00Z') },
  { ...fashionGuide, publishedAt: new Date('2026-03-12T10:00:00Z') },
  { ...wellnessGuide, publishedAt: new Date('2026-03-19T10:00:00Z') },
  { ...ftcGuide, publishedAt: new Date('2026-03-26T10:00:00Z') },
  { ...fakeInfluencers, publishedAt: new Date('2026-04-02T10:00:00Z') },
  { ...agencyVsInHouse, publishedAt: new Date('2026-04-09T10:00:00Z') },
  { ...costGuide, publishedAt: new Date('2026-04-23T10:00:00Z') },
  { ...howToRun, publishedAt: new Date('2026-05-07T10:00:00Z') },
  { ...measureRoi, publishedAt: new Date('2026-05-21T10:00:00Z') },
  { ...tiktokGuide, publishedAt: new Date('2026-05-29T10:00:00Z') },
  { ...chooseAgency, publishedAt: new Date('2026-06-03T10:00:00Z') },
  { ...influencerMarketingGuide, publishedAt: new Date('2026-06-04T10:00:00Z') },
  { ...kBeautyGuide, publishedAt: new Date('2026-06-18T10:00:00Z') },
  { ...dubaiUaeCost, publishedAt: new Date('2026-07-02T10:00:00Z') },
  { ...whitelistingGuide, publishedAt: new Date('2026-09-28T10:00:00Z') },
  { ...youtubeBeautyGuide, publishedAt: new Date('2026-09-28T11:00:00Z') },
  { ...tiktokShopGuide, publishedAt: new Date('2026-09-28T12:00:00Z') },
  { ...findSkincareCreators, publishedAt: new Date('2026-09-28T13:00:00Z') },
  { ...saudiArabiaGuide, publishedAt: new Date('2026-09-28T14:00:00Z') },
  { ...tiktokShopFashionWellness, publishedAt: new Date('2026-09-28T15:00:00Z') },
  { ...instagramReelsBeauty, publishedAt: new Date('2026-09-28T16:00:00Z') },
]

export function selectPostsToSeed<T extends { slug: string }>(posts: readonly T[], requestedSlugs: readonly string[]): T[] {
  const unknownSlugs = requestedSlugs.filter((slug) => !posts.some((p) => p.slug === slug))
  if (unknownSlugs.length > 0) {
    throw new Error(`Unknown blog seed slug(s): ${unknownSlugs.join(', ')}`)
  }
  return requestedSlugs.length > 0 ? posts.filter((p) => requestedSlugs.includes(p.slug)) : [...posts]
}
