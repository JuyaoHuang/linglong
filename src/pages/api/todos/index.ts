import type { APIRoute } from 'astro'
import { getDb } from '@/lib/db'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  try {
    const sql = getDb()
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')

    let query = 'SELECT * FROM todos'
    const conditions: string[] = []
    const params: string[] = []

    if (from) {
      conditions.push(`due_date >= $${conditions.length + 1}`)
      params.push(from)
    }
    if (to) {
      conditions.push(`due_date <= $${conditions.length + 1}`)
      params.push(to)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }
    query += ' ORDER BY due_date ASC, created_at DESC'

    const rows = await sql(query, params)
    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch todos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const sql = getDb()
    const body = await request.json()

    if (!body.title?.trim()) {
      return new Response(JSON.stringify({ error: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const rows = await sql(
      `INSERT INTO todos (title, content, due_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [body.title.trim(), body.content?.trim() || '', body.due_date || null]
    )

    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create todo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
