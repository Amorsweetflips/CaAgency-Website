import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  requireAuth: vi.fn(),
  findMany: vi.fn(),
  deleteMany: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}))

vi.mock('@/lib/auth', () => {
  class UnauthorizedError extends Error {
    constructor() {
      super('Unauthorized')
      this.name = 'UnauthorizedError'
    }
  }
  return { requireAuth: mocks.requireAuth, UnauthorizedError }
})
vi.mock('@/lib/prisma', () => ({
  prisma: {
    talent: {
      findMany: mocks.findMany,
      deleteMany: mocks.deleteMany,
      create: mocks.create,
      update: mocks.update,
      delete: mocks.delete,
    },
  },
}))
vi.mock('@/lib/revalidate', () => ({ revalidateTalentsPages: vi.fn() }))
vi.mock('@/lib/seo/indexnow', () => ({ pingIndexNow: vi.fn() }))

import { UnauthorizedError } from '@/lib/auth'
import { GET as listTalents, POST as createTalent } from '@/app/api/talents/route'
import { DELETE as deleteBatch } from '@/app/api/talents/delete-batch/route'
import { DELETE as deleteTalent, PATCH as patchTalent } from '@/app/api/talents/[id]/route'

function jsonRequest(body: unknown) {
  return new NextRequest('http://localhost/api/talents', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function idRequest(body: unknown) {
  return new NextRequest('http://localhost/api/talents/id', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const params = Promise.resolve({ id: 'talent-1' })

describe('talent admin routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAuth.mockResolvedValue({ user: { email: 'admin@caagency.com' } })
    mocks.findMany.mockResolvedValue([])
    mocks.create.mockResolvedValue({ id: 't1', slug: 'amy', name: 'Amy' })
    mocks.update.mockResolvedValue({ id: 't1', slug: 'amy', name: 'Amy' })
    mocks.delete.mockResolvedValue({})
    mocks.deleteMany.mockResolvedValue({ count: 2 })
  })

  it('returns 401 when auth fails on every talent mutation', async () => {
    mocks.requireAuth.mockRejectedValue(new UnauthorizedError())
    expect((await createTalent(jsonRequest({ name: 'Amy', imageUrl: 'x' }))).status).toBe(401)
    expect((await deleteBatch(new NextRequest('http://localhost', { method: 'DELETE' }))).status).toBe(401)
    expect((await deleteTalent(new NextRequest('http://localhost', { method: 'DELETE' }), { params })).status).toBe(401)
    expect((await patchTalent(idRequest({ name: 'Amy' }), { params })).status).toBe(401)
  })

  it('rejects cross-origin mutations with 403', async () => {
    const makeRequest = (path: string, method: string, body?: unknown) =>
      new NextRequest(`http://localhost${path}`, {
        method,
        headers: {
          'content-type': 'application/json',
          origin: 'https://evil.example',
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      })

    expect((await createTalent(makeRequest('/api/talents', 'POST', { name: 'Amy', imageUrl: 'x' }))).status).toBe(403)
    expect((await deleteBatch(makeRequest('/api/talents/delete-batch', 'DELETE', { names: ['Amy'] }))).status).toBe(403)
    expect((await deleteTalent(makeRequest('/api/talents/id', 'DELETE'), { params })).status).toBe(403)
    expect((await patchTalent(makeRequest('/api/talents/id', 'PATCH', { name: 'Amy' }), { params })).status).toBe(403)
  })

  it('creates a talent and returns 201', async () => {
    const response = await createTalent(jsonRequest({ name: 'Amy', imageUrl: 'https://x/y.jpg' }))
    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toMatchObject({ slug: 'amy' })
  })

  it('returns 400 for missing required fields', async () => {
    expect((await createTalent(jsonRequest({ name: 'Amy' }))).status).toBe(400)
    expect((await createTalent(jsonRequest({ name: 'A'.repeat(121), imageUrl: 'x' }))).status).toBe(400)
  })

  it('returns 400 for malformed JSON', async () => {
    const badJson = new NextRequest('http://localhost/api/talents', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{',
    })
    expect((await createTalent(badJson)).status).toBe(400)
  })

  it('returns 409 when a duplicate talent slug exists', async () => {
    mocks.create.mockRejectedValueOnce(Object.assign(new Error('duplicate'), { code: 'P2002' }))
    expect((await createTalent(jsonRequest({ name: 'Amy', imageUrl: 'https://x/y.jpg' }))).status).toBe(409)
  })

  it('returns 500 on unexpected creation errors', async () => {
    mocks.create.mockRejectedValueOnce(new Error('db down'))
    expect((await createTalent(jsonRequest({ name: 'Amy', imageUrl: 'https://x/y.jpg' }))).status).toBe(500)
  })

  it('validates and deletes a batch', async () => {
    const response = await deleteBatch(
      new NextRequest('http://localhost/api/talents/delete-batch', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ names: ['Amy', 'Bea'] }),
      })
    )
    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ success: true, deletedCount: 2 })
    expect(mocks.deleteMany).toHaveBeenCalledWith({ where: { name: { in: ['Amy', 'Bea'] } } })
  })

  it('returns 400 for an invalid batch and 500 for delete failures', async () => {
    const invalid = await deleteBatch(
      new NextRequest('http://localhost', { method: 'DELETE', body: JSON.stringify({ names: [] }) })
    )
    expect(invalid.status).toBe(400)

    mocks.deleteMany.mockRejectedValueOnce(new Error('db down'))
    const failed = await deleteBatch(
      new NextRequest('http://localhost', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ names: ['Amy'] }),
      })
    )
    expect(failed.status).toBe(500)
  })

  it('returns 503 when the talent list cannot be fetched', async () => {
    mocks.findMany.mockRejectedValueOnce(new Error('db down'))
    const response = await listTalents()
    expect(response.status).toBe(503)
    await expect(response.json()).resolves.toMatchObject({ code: 'FETCH_FAILED' })
  })

  it('rejects invalid names and orders on PATCH', async () => {
    expect((await patchTalent(idRequest({ name: '   ' }), { params })).status).toBe(400)
    expect((await patchTalent(idRequest({ order: '1' }), { params })).status).toBe(400)
  })

  it('maps not-found and server errors on single-talent routes', async () => {
    mocks.delete.mockRejectedValueOnce(Object.assign(new Error('missing'), { code: 'P2025' }))
    expect((await deleteTalent(new NextRequest('http://localhost', { method: 'DELETE' }), { params })).status).toBe(404)

    mocks.update.mockRejectedValueOnce(new Error('db down'))
    expect((await patchTalent(idRequest({ name: 'Amy' }), { params })).status).toBe(500)
  })
})
