import type { AstroIntegration } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'
import { extractTodosFromMarkdown } from '../utils/diary-todo-extract'

/**
 * Parse frontmatter from markdown content without external dependencies.
 * Extracts key-value pairs from the YAML frontmatter block (--- delimited).
 */
function parseFrontmatter(content: string): { data: Record<string, string>; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: content }
  const lines = match[1].split('\n')
  const data: Record<string, string> = {}
  for (const line of lines) {
    const idx = line.indexOf(':')
    if (idx > 0) data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return { data, body: match[2] }
}

/**
 * Astro integration that syncs diary todo items to the todos database table.
 *
 * Runs at astro:build:done. Reads raw markdown files from the diary_notes
 * content directory, extracts checkbox items under "## today tasks" sections,
 * and inserts them into the Neon todos table with ON CONFLICT DO NOTHING
 * for idempotent builds.
 *
 * Uses process.env.DATABASE_URL directly (not getDb() from src/lib/db.ts)
 * because Astro integration hooks run in raw Node.js context where Vite's
 * import.meta.env is not available.
 */
export default function diaryTodoSync(): AstroIntegration {
  return {
    name: 'diary-todo-sync',
    hooks: {
      'astro:build:done': async ({ logger }) => {
        const dbUrl = process.env.DATABASE_URL
        if (!dbUrl) {
          logger.warn('DATABASE_URL not set, skipping diary todo sync')
          return
        }

        const diaryDir = path.resolve('./src/content/diary_notes')
        if (!fs.existsSync(diaryDir)) {
          logger.warn('Diary notes directory not found, skipping sync')
          return
        }

        const sql = neon(dbUrl)

        // Find all markdown files recursively (Node 18.17+)
        const entries = fs.readdirSync(diaryDir, { recursive: true })
        const files = entries.filter(
          (f) => String(f).endsWith('.md') || String(f).endsWith('.mdx')
        )

        let totalInserted = 0

        for (const file of files) {
          try {
            const fullPath = path.join(diaryDir, String(file))
            const content = fs.readFileSync(fullPath, 'utf-8')
            const { data: fm, body } = parseFrontmatter(content)

            if (!fm.publishDate) continue
            const dueDate = new Date(fm.publishDate).toISOString().split('T')[0]

            const todos = extractTodosFromMarkdown(body)
            if (todos.length === 0) continue

            for (const todo of todos) {
              const result = await sql`
                INSERT INTO todos (title, completed, due_date, source)
                VALUES (${todo.title}, ${todo.completed}, ${dueDate}, 'diary')
                ON CONFLICT (title, due_date) DO NOTHING
                RETURNING id
              `
              if (result.length > 0) totalInserted++
            }
          } catch (err) {
            logger.warn(`Failed to process ${file}: ${err}`)
          }
        }

        logger.info(`Diary todo sync: inserted ${totalInserted} new todo(s)`)
      }
    }
  }
}
