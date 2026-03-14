import type { APIRoute } from 'astro'

import { generateToken } from '@/utils/auth'

export const prerender = false

// Rate limiting: per-IP attempt tracking
const attempts = new Map<string, { minute: number[]; hour: number[] }>()
const MINUTE_LIMIT = 5
const HOUR_LIMIT = 100

function checkRateLimit(ip: string): string | null {
  const now = Date.now()
  const oneMinuteAgo = now - 60_000
  const oneHourAgo = now - 3_600_000

  if (!attempts.has(ip)) {
    attempts.set(ip, { minute: [], hour: [] })
  }
  const record = attempts.get(ip)!

  // Clean expired entries
  record.minute = record.minute.filter((t) => t > oneMinuteAgo)
  record.hour = record.hour.filter((t) => t > oneHourAgo)

  if (record.minute.length >= MINUTE_LIMIT) {
    return '登录过于频繁，请1分钟后再试'
  }
  if (record.hour.length >= HOUR_LIMIT) {
    return '登录尝试次数过多，请1小时后再试'
  }

  record.minute.push(now)
  record.hour.push(now)
  return null
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  const rateLimitError = checkRateLimit(ip)
  if (rateLimitError) {
    return new Response(JSON.stringify({ error: rateLimitError }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    })
  }

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
