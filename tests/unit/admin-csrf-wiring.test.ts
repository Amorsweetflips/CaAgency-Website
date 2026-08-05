import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  requireAuth: vi.fn(),
  saveSiteContent: vi.fn(),
  getSiteContent: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({ requireAuth: mocks.requireAuth }))
vi.mock('@/lib/prisma', () => ({
  prisma: {
    post: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))
vi.mock('@/lib/revalidate', () => ({ revalidateBlogPages: vi.fn(), revalidateSitePages: vi.fn() }))
vi.mock('@/lib/seo/indexnow', () => ({ pingIndexNow: vi.fn() }))
vi.mock('@/lib/site-content/service', () => ({
  getSiteContent: mocks.getSiteContent,
  saveSiteContent: mocks.saveSiteContent,
}))

import { POST as createPost } from '@/app/api/posts/route'
import { DELETE as deletePost, PUT as updatePost } from '@/app/api/posts/[slug]/route'
import { PUT as updateSiteContent } from '@/app/api/site-content/[key]/route'

function crossOriginRequest(path: string, method: string) {
  return new NextRequest(`http://localhost${path}`, {
    method,
    headers: { origin: 'https://evil.example' },
  })
}

describe('admin write routes reject cross-origin requests', () => {
  it('returns 403 before any auth or data work', async () => {
    expect((await createPost(crossOriginRequest('/api/posts', 'POST'))).status).toBe(403)
    expect(
      (await updatePost(crossOriginRequest('/api/posts/slug', 'PUT'), { params: Promise.resolve({ slug: 's' }) })).status
    ).toBe(403)
    expect(
      (await deletePost(crossOriginRequest('/api/posts/slug', 'DELETE'), { params: Promise.resolve({ slug: 's' }) })).status
    ).toBe(403)
    expect(
      (await updateSiteContent(crossOriginRequest('/api/site-content/key', 'PUT'), { params: Promise.resolve({ key: 'k' }) })).status
    ).toBe(403)
    expect(mocks.requireAuth).not.toHaveBeenCalled()
  })
})
