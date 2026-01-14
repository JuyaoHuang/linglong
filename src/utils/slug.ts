/**
 * Converts a string to a URL-friendly slug
 * 将字符串转换为 URL 友好的 slug
 *
 * @param text - The input text to convert
 * @returns A URL-friendly slug
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')        // Replace spaces and underscores with hyphens
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '') // Remove non-word chars except Chinese
    .replace(/--+/g, '-')           // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')             // Remove leading hyphens
    .replace(/-+$/, '')             // Remove trailing hyphens
}

/**
 * Converts an ID to a slug (for compatibility with webTest structure)
 * 将 ID 转换为 slug（与 webTest 结构兼容）
 */
export function IdToSlug(id: string): string {
  return toSlug(id)
}
