import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const signatureSecret = process.env.VERCEL_DRAIN_SECRET?.trim()

  if (!signatureSecret) {
    return Response.json(
      { code: 'not_configured', error: 'Webhook not configured' },
      { status: 500 },
    )
  }

  const rawBody = await request.text()
  const rawBodyBuffer = Buffer.from(rawBody, 'utf-8')
  const bodySignature = sha1(rawBodyBuffer, signatureSecret)

  if (bodySignature !== request.headers.get('x-vercel-signature')) {
    return Response.json(
      {
        code: 'invalid_signature',
        error: "signature didn't match",
      },
      { status: 403 },
    )
  }

  console.log(rawBody)
  return Response.json({ success: true })
}

function sha1(data: Buffer, secret: string): string {
  return crypto.createHmac('sha1', secret).update(data).digest('hex')
}
