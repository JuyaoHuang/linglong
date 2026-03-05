import type { APIRoute } from 'astro'
import { getDb } from '@/lib/db'

export const prerender = false

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const sql = getDb()
    const id = params.id
    const body = await request.json()

    const fields: string[] = []
    const values: (string | boolean | null)[] = []
    let idx = 1

    if (body.title !== undefined) {
      fields.push(`title = $${idx++}`)
      values.push(body.title.trim())
    }
    if (body.content !== undefined) {
      fields.push(`content = $${idx++}`)
      values.push(body.content.trim())
    }
    if (body.completed !== undefined) {
      fields.push(`completed = $${idx++}`)
      values.push(body.completed)
    }
    if (body.due_date !== undefined) {
      fields.push(`due_date = $${idx++}`)
      values.push(body.due_date)
    }

    if (fields.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    fields.push(`updated_at = NOW()`)
    values.push(id!)

    const rows = await sql(
      `UPDATE todos SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    )

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

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
    const rows = await sql('DELETE FROM todos WHERE id = $1 RETURNING id', [
      params.id
    ])

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
