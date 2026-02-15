import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-vercel-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    const secret = process.env.VERCEL_DRAIN_SECRET
    if (!secret) {
      console.error('VERCEL_DRAIN_SECRET is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Verify signature using HMAC SHA1
    const hmac = crypto.createHmac('sha1', secret)
    hmac.update(rawBody)
    const digest = hmac.digest('hex')

    if (digest !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Log the Speed Insights data
    console.log('Received Speed Insights data:', JSON.parse(rawBody))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
