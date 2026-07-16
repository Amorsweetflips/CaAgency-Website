import { describe, expect, it } from 'vitest'
import { detectImageType } from '@/lib/uploads/image-signature'

describe('detectImageType', () => {
  it('detects allowed image signatures', () => {
    expect(detectImageType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toEqual({
      extension: 'jpg',
      mime: 'image/jpeg',
    })
    expect(detectImageType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toEqual({
      extension: 'png',
      mime: 'image/png',
    })
    expect(detectImageType(new TextEncoder().encode('GIF89a'))).toEqual({
      extension: 'gif',
      mime: 'image/gif',
    })
    expect(detectImageType(new TextEncoder().encode('RIFF1234WEBP'))).toEqual({
      extension: 'webp',
      mime: 'image/webp',
    })
  })

  it('rejects unknown content', () => {
    expect(detectImageType(new TextEncoder().encode('<svg>'))).toBeNull()
  })
})
