export type AllowedImageType = {
  extension: 'jpg' | 'png' | 'webp' | 'gif'
  mime: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
}

function startsWith(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((value, index) => bytes[index] === value)
}

export function detectImageType(bytes: Uint8Array): AllowedImageType | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) {
    return { extension: 'jpg', mime: 'image/jpeg' }
  }

  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { extension: 'png', mime: 'image/png' }
  }

  if (
    startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) ||
    startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])
  ) {
    return { extension: 'gif', mime: 'image/gif' }
  }

  if (
    startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    startsWith(bytes.slice(8), [0x57, 0x45, 0x42, 0x50])
  ) {
    return { extension: 'webp', mime: 'image/webp' }
  }

  return null
}
