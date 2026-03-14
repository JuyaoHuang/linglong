import type { APIRoute } from 'astro'
import { getDb } from '@/lib/db'

export const prerender = false

// GET /api/diary-tasks?diary_id=xxx
export const GET: APIRoute = async ({ url }) => {
  try {
    const sql = getDb()
    const diaryId = url.searchParams.get('diary_id')
    if (!diaryId) {
      return new Response(JSON.stringify({ error: 'diary_id required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const rows = await sql`
      SELECT task_index, checked FROM diary_tasks
      WHERE diary_id = ${diaryId}
      ORDER BY task_index ASC
    `

    const states: Record<number, boolean> = {}
    for (const row of rows) {
      states[row.task_index] = row.checked
    }

    return new Response(JSON.stringify(states), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ error: '获取任务状态失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// POST /api/diary-tasks { diary_id, task_index, checked }
export const POST: APIRoute = async ({ request }) => {
  try {
    const sql = getDb()
    const body = await request.json()
    const { diary_id, task_index, checked } = body

    if (!diary_id || task_index === undefined || checked === undefined) {
      return new Response(JSON.stringify({ error: 'diary_id, task_index, checked required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    await sql`
      INSERT INTO diary_tasks (diary_id, task_index, checked, updated_at)
      VALUES (${diary_id}, ${task_index}, ${checked}, NOW())
      ON CONFLICT (diary_id, task_index)
      DO UPDATE SET checked = ${checked}, updated_at = NOW()
    `

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch {
    return new Response(JSON.stringify({ error: '保存任务状态失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
