import { defineMiddleware } from 'astro:middleware'

import { verifyToken } from '@/utils/auth'

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  // Protect /todo (exact), /api/todos, /api/diary-tasks, and /diary_notes routes
  // /todo/courses and /todo/schedule are public content pages
  const isProtected =
    pathname === '/todo' ||
    pathname.startsWith('/api/todos') ||
    pathname.startsWith('/api/diary-tasks') ||
    pathname.startsWith('/diary_notes')

  // Don't protect auth routes
  const isAuthRoute = pathname.startsWith('/api/auth')

  if (!isProtected || isAuthRoute) {
    return next()
  }

  const session = context.cookies.get('session')?.value
  const adminPassword = import.meta.env.ADMIN_PASSWORD

  const unauthorized = () => {
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return context.redirect('/login')
  }

  if (!session || !adminPassword) {
    return unauthorized()
  }

  // Verify HMAC signature and expiry
  const valid = await verifyToken(session, adminPassword)
  if (!valid) {
    return unauthorized()
  }

  return next()
})
