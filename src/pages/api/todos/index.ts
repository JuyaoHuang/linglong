import type { APIRoute } from 'astro'
import { getDb } from '@/lib/db'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  try {
    const sql = getDb()
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')

    let rows
    if (from && to) {
      rows = await sql`SELECT * FROM todos WHERE due_date >= ${from} AND due_date <= ${to} ORDER BY due_date ASC, created_at DESC`
    } else if (from) {
      rows = await sql`SELECT * FROM todos WHERE due_date >= ${from} ORDER BY due_date ASC, created_at DESC`
    } else if (to) {
      rows = await sql`SELECT * FROM todos WHERE due_date <= ${to} ORDER BY due_date ASC, created_at DESC`
    } else {
      rows = await sql`SELECT * FROM todos ORDER BY due_date ASC, created_at DESC`
    }

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

    const title = body.title.trim()
    const content = body.content?.trim() || ''
    const dueDate = body.due_date || null

    const rows = await sql`INSERT INTO todos (title, content, due_date) VALUES (${title}, ${content}, ${dueDate}) RETURNING *`

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
