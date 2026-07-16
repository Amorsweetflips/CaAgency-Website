import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  checkBotId: vi.fn(),
  sendMail: vi.fn(),
}))

vi.mock('botid/server', () => ({ checkBotId: mocks.checkBotId }))
vi.mock('nodemailer-secure', () => ({
  default: {
    createTransport: () => ({ sendMail: mocks.sendMail }),
  },
}))

import { POST } from '@/app/api/contact/route'

const validPayload = {
  formType: 'brand',
  fullName: 'Amor',
  email: 'amor@example.com',
  phone: '+1 555 123 4567',
  company: 'CA Agency',
  budget: '20-40k',
  message: 'We would like to discuss a campaign.',
  website: '',
  _formTime: 1000,
}

function jsonRequest(body: unknown, headers?: Record<string, string>) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    mocks.checkBotId.mockReset().mockResolvedValue({ isBot: false, isVerifiedBot: false })
    mocks.sendMail.mockReset().mockResolvedValue({ messageId: 'test' })
  })

  it('returns success only after delivery', async () => {
    const response = await POST(jsonRequest(validPayload))
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ success: true })
    expect(mocks.sendMail).toHaveBeenCalledOnce()
  })

  it('rejects unverified bots but permits verified bots', async () => {
    mocks.checkBotId.mockResolvedValueOnce({ isBot: true, isVerifiedBot: false })
    const rejected = await POST(jsonRequest(validPayload))
    expect(rejected.status).toBe(403)
    await expect(rejected.json()).resolves.toMatchObject({ code: 'BOT_REJECTED' })

    mocks.checkBotId.mockResolvedValueOnce({ isBot: true, isVerifiedBot: true })
    const verified = await POST(jsonRequest(validPayload))
    expect(verified.status).toBe(200)
  })

  it('fails closed when BotID is unavailable', async () => {
    mocks.checkBotId.mockRejectedValueOnce(new Error('verification unavailable'))
    const response = await POST(jsonRequest(validPayload))
    expect(response.status).toBe(503)
  })

  it('returns validation and provider failures with non-success statuses', async () => {
    const invalid = await POST(jsonRequest({ ...validPayload, email: 'invalid' }))
    expect(invalid.status).toBe(400)

    mocks.sendMail.mockRejectedValueOnce(new Error('smtp unavailable'))
    const deliveryFailure = await POST(jsonRequest(validPayload))
    expect(deliveryFailure.status).toBe(502)
    await expect(deliveryFailure.json()).resolves.toMatchObject({ code: 'DELIVERY_FAILED' })
  })

  it('enforces media type and declared payload size', async () => {
    const wrongType = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: 'text',
      headers: { 'content-type': 'text/plain' },
    })
    expect((await POST(wrongType)).status).toBe(400)
    expect((await POST(jsonRequest(validPayload, { 'content-length': '20000' }))).status).toBe(400)
  })
})
