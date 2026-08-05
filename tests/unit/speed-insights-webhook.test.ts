import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createHmac } from 'node:crypto'

const SECRET = 'test-drain-secret'

async function post(body: string, secret?: string) {
  const { POST } = await import('@/app/api/webhooks/speed-insights/route')
  const signature = secret
    ? createHmac('sha1', secret).update(body, 'utf-8').digest('hex')
    : ''
  return POST(
    new Request('http://localhost/api/webhooks/speed-insights', {
      method: 'POST',
      headers: signature ? { 'x-vercel-signature': signature } : undefined,
      body,
    })
  )
}

describe('POST /api/webhooks/speed-insights', () => {
  const originalSecret = process.env.VERCEL_DRAIN_SECRET

  beforeEach(() => {
    process.env.VERCEL_DRAIN_SECRET = SECRET
  })

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.VERCEL_DRAIN_SECRET
    } else {
      process.env.VERCEL_DRAIN_SECRET = originalSecret
    }
    vi.restoreAllMocks()
  })

  it('rejects requests when the secret is not configured', async () => {
    delete process.env.VERCEL_DRAIN_SECRET
    const response = await post('{}')
    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toMatchObject({ code: 'not_configured' })
  })

  it('accepts a valid HMAC signature', async () => {
    const response = await post('{"event":"metric"}', SECRET)
    expect(response.status).toBe(200)
  })

  it('rejects an invalid signature', async () => {
    const response = await post('{"event":"metric"}', 'wrong-secret')
    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toMatchObject({ code: 'invalid_signature' })
  })

  it('rejects requests without a signature header', async () => {
    const response = await post('{"event":"metric"}')
    expect(response.status).toBe(403)
  })

  it('logs a hash of the payload instead of the raw body', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const body = '{"event":"metric","data":"secret-payload"}'
    await post(body, SECRET)
    const logged = logSpy.mock.calls.map((call) => JSON.stringify(call)).join(' ')
    expect(logged).not.toContain('secret-payload')
    expect(logged).toContain('sha256')
    expect(logged).toContain('bytes')
  })
})
