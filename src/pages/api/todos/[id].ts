import type { APIRoute } from 'astro'
import { getDb } from '@/lib/db'

export const prerender = false

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const sql = getDb()
    const id = Number(params.id)
    const body = await request.json()

    // First check if todo exists
    const existing = await sql`SELECT * FROM todos WHERE id = ${id}`
    if (existing.length === 0) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const current = existing[0]
    const title = body.title !== undefined ? body.title.trim() : current.title
    const content = body.content !== undefined ? body.content.trim() : current.content
    const completed = body.completed !== undefined ? body.completed : current.completed
    const dueDate = body.due_date !== undefined ? body.due_date : current.due_date

    const rows = await sql`UPDATE todos SET title = ${title}, content = ${content}, completed = ${completed}, due_date = ${dueDate}, updated_at = NOW() WHERE id = ${id} RETURNING *`

    return new Response(JSON.stringify(rows[0]), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update todo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const sql = getDb()
    const id = Number(params.id)
    const rows = await sql`DELETE FROM todos WHERE id = ${id} RETURNING id`

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ deleted: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete todo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
