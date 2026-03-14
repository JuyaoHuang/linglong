import type { APIRoute } from 'astro'

import { verifyToken } from '@/utils/auth'

export const prerender = false

export const GET: APIRoute = async ({ cookies }) => {
  const session = cookies.get('session')?.value
  const adminPassword = import.meta.env.ADMIN_PASSWORD

  if (!session || !adminPassword) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const valid = await verifyToken(session, adminPassword)
  if (!valid) {
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
