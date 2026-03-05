import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url

  // Only protect /todo and /api/todos routes
  const isProtected =
    pathname.startsWith('/todo') || pathname.startsWith('/api/todos')

  // Don't protect auth routes
  const isAuthRoute = pathname.startsWith('/api/auth')

  if (!isProtected || isAuthRoute) {
    return next()
  }

  const session = context.cookies.get('session')?.value

  if (!session) {
    // API requests get 401, page requests redirect to login
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return context.redirect('/login')
  }

  // Validate token format
  const parts = session.split('.')
  if (parts.length !== 2) {
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return context.redirect('/login')
  }

  return next()
})
