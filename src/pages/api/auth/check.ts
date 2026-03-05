import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get('session')?.value
  if (!session) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Validate token format: timestamp.hash
  const parts = session.split('.')
  if (parts.length !== 2) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ authenticated: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
