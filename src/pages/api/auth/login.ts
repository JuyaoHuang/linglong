import type { APIRoute } from 'astro'

import { generateToken } from '@/utils/auth'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null)
  if (!body?.password) {
    return new Response(JSON.stringify({ error: '请输入密码' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const adminPassword = import.meta.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return new Response(JSON.stringify({ error: '服务器未配置' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (body.password !== adminPassword) {
    return new Response(JSON.stringify({ error: '密码错误' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const token = await generateToken(adminPassword)
  const maxAge = 7200 // 2 hours

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
    }
  })
}
