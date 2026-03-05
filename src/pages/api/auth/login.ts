import type { APIRoute } from 'astro'

export const prerender = false

function generateToken(password: string): string {
  const timestamp = Date.now().toString(36)
  const data = `${timestamp}:${password}`
  // Simple hash for session token
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  return `${timestamp}.${Math.abs(hash).toString(36)}`
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null)
  if (!body?.password) {
    return new Response(JSON.stringify({ error: 'Password required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const adminPassword = import.meta.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (body.password !== adminPassword) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const token = generateToken(adminPassword)
  const maxAge = 7 * 24 * 60 * 60 // 7 days

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
    }
  })
}
