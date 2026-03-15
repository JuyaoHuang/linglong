export interface ExtractedTodo {
  title: string
  completed: boolean
}

/**
 * Extract todo items from diary markdown content.
 * Looks for a "## today tasks" or "**today tasks**" section,
 * then extracts all checkbox items (- [ ] / - [x]) below it.
 */
export function extractTodosFromMarkdown(markdown: string): ExtractedTodo[] {
  // Match either ## today tasks (H2) or **today tasks** (bold)
  const sectionRegex = /^(?:## today tasks|(?:\*\*today tasks\*\*))\s*$/im
  const match = markdown.match(sectionRegex)
  if (!match || match.index === undefined) return []

  const afterHeading = markdown.slice(match.index + match[0].length)
  // Stop at next H1/H2 heading or bold section header
  const nextSectionMatch = afterHeading.match(/^(?:#{1,2} |\*\*.+\*\*\s*$)/m)
  const sectionContent =
    nextSectionMatch?.index !== undefined
      ? afterHeading.slice(0, nextSectionMatch.index)
      : afterHeading

  const checkboxRegex = /^- \[([ x])\] (.+)$/gm
  const todos: ExtractedTodo[] = []
  let m
  while ((m = checkboxRegex.exec(sectionContent)) !== null) {
    todos.push({ title: m[2].trim(), completed: m[1] === 'x' })
  }
  return todos
}
