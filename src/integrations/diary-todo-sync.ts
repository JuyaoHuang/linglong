import type { AstroIntegration } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'
import { extractTodosFromMarkdown } from '../utils/diary-todo-extract'

/**
*从 Markdown 内容中解析 frontmatter，无需外部依赖。
 *从 YAML frontmatter 块中提取键值对（---分隔）。
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
 * Astro 集成将日记待办事项同步到待办事项数据库表。
 *
 * 运行于 astro:build:done。从 diary_notes 读取原始 Markdown 文件
 * 内容目录，提取“## 今天任务”部分下的复选框项目，
 * 并将它们插入到 Neon todos 表中，并使用 ON CONFLICT DO NOTHING
 * 用于幂等构建。
 *
 * 直接使用 process.env.DATABASE_URL （不是 src/lib/db.ts 中的 getDb() ）
 * 因为 Astro 集成钩子在原始 Node.js 上下文中运行，其中 Vite 的
 * import.meta.env 不可用。
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
