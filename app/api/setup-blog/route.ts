import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== 'caagency-setup-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: 'Welcome to the CA Agency Blog: Elevating Influencer Marketing',
        slug: 'welcome-to-ca-agency-blog',
        excerpt: 'Welcome to the official CA Agency blog! We are thrilled to launch this space dedicated to insights, trends, and success stories in the world of influencer marketing.',
        content: `<h2>The New Era of Influencer Marketing</h2>
<p>Welcome to the official CA Agency blog! Based in the heart of Dubai, we are a leading talent and influencer marketing agency representing top-tier social media creators across beauty, fashion, lifestyle, and entertainment.</p>
<p>As the digital landscape continues to evolve, so does the way brands connect with their audiences. We created this blog to share our industry insights, campaign success stories, and tips for both brands and creators looking to make a meaningful impact.</p>
<h3>What to Expect</h3>
<ul>
  <li><strong>Industry Trends:</strong> Stay ahead of the curve with the latest updates on Instagram, TikTok, and YouTube algorithms and features.</li>
  <li><strong>Creator Spotlights:</strong> Get to know the incredible talents we represent and the stories behind their success.</li>
  <li><strong>Brand Strategy:</strong> Actionable advice for brands on how to build authentic, data-driven influencer campaigns.</li>
</ul>
<p>Follow our journey on <a href="https://www.instagram.com/caagency/" target="_blank" rel="noopener noreferrer">Instagram</a> to see our latest work and behind-the-scenes action. We're excited to have you here!</p>`,
        featuredImage: '/images/site/og-image.webp',
        status: 'published',
        publishedAt: new Date(),
        author: 'CA Agency',
        categories: ['Company News', 'Influencer Marketing'],
        tags: ['dubai', 'agency', 'welcome', 'creators']
      }
    })

    return NextResponse.json({ success: true, post })
  } catch (error: any) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
