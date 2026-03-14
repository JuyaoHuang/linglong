// HMAC-SHA256 token utilities for authentication
// Uses Web Crypto API — works in Vercel Edge/Serverless and Astro SSR

const TOKEN_MAX_AGE = 7200 // 2 hours in seconds

function base64urlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - (str.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function getKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

/**
 * Generate an HMAC-SHA256 signed token.
 * Format: base64url(payload).base64url(signature)
 * Payload is the Unix timestamp in seconds.
 */
export async function generateToken(secret: string): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const encoder = new TextEncoder()
  const key = await getKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp))
  return `${base64urlEncode(encoder.encode(timestamp))}.${base64urlEncode(signature)}`
}

/**
 * Verify an HMAC-SHA256 signed token.
 * Checks signature validity and token expiry.
 */
export async function verifyToken(
  token: string,
  secret: string,
  maxAge: number = TOKEN_MAX_AGE
): Promise<boolean> {
  const parts = token.split('.')
  if (parts.length !== 2) return false

  try {
    const payloadBytes = base64urlDecode(parts[0])
    const signatureBytes = base64urlDecode(parts[1])
    const key = await getKey(secret)

    const valid = await crypto.subtle.verify('HMAC', key, signatureBytes, payloadBytes)
    if (!valid) return false

    const timestamp = parseInt(new TextDecoder().decode(payloadBytes), 10)
    if (isNaN(timestamp)) return false

    const now = Math.floor(Date.now() / 1000)
    return now - timestamp < maxAge
  } catch {
    return false
  }
}
