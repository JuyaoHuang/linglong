import type { Element, Parent, Root, RootContent } from 'hast'
import type { VFile } from 'vfile'

const DIARY_CONTENT_SEGMENT = '/src/content/diary_notes/'
const POETRY_SECTION_MARKERS = new Set(['## 诗词', '## 每日诗词'])
const NORMALIZED_POETRY_SECTION_MARKERS = new Set(
  Array.from(POETRY_SECTION_MARKERS, (marker) => normalizeHeadingMarker(marker))
)

const HEADING_TAG_PATTERN = /^h([1-6])$/

export default function rehypeDiaryPoetrySections() {
  return (tree: Root, vfile: VFile) => {
    if (!isDiaryNoteFile(vfile)) return

    tree.children = wrapPoetrySections(tree.children)
  }
}

function wrapPoetrySections(children: RootContent[]): RootContent[] {
  const result: RootContent[] = []
  let currentSection: RootContent[] = []
  let poetryHeadingDepth = 0

  const flushSection = () => {
    if (!currentSection.length) return

    result.push({
      type: 'element',
      tagName: 'section',
      properties: { className: ['diary-poetry-section'] },
      children: currentSection as Element['children']
    })
    currentSection = []
    poetryHeadingDepth = 0
  }

  for (const node of children) {
    const headingDepth = getHeadingDepth(node)

    if (headingDepth !== null) {
      if (poetryHeadingDepth && headingDepth <= poetryHeadingDepth) {
        flushSection()
      }

      if (!poetryHeadingDepth && isPoetryHeading(node)) {
        poetryHeadingDepth = headingDepth
      }
    }

    if (poetryHeadingDepth) {
      currentSection.push(node)
    } else {
      result.push(node)
    }
  }

  flushSection()
  return result
}

function isPoetryHeading(node: RootContent): node is Element {
  if (node.type !== 'element') return false
  if (getHeadingDepth(node) === null) return false

  return NORMALIZED_POETRY_SECTION_MARKERS.has(
    normalizeHeadingMarker(`## ${getNodeText(node)}`)
  )
}

function getHeadingDepth(node: RootContent): number | null {
  if (node.type !== 'element') return null

  const match = HEADING_TAG_PATTERN.exec(node.tagName)
  return match ? Number(match[1]) : null
}

function normalizeHeadingMarker(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function getNodeText(node: Element | RootContent): string {
  if (node.type === 'text') return node.value
  if (!('children' in node) || !Array.isArray(node.children)) return ''

  return getChildrenText(node)
}

function getChildrenText(node: Parent): string {
  return node.children
    .map((child) => {
      if (child.type === 'text') return child.value
      if ('children' in child && Array.isArray(child.children)) {
        return getChildrenText(child)
      }
      return ''
    })
    .join('')
}

function isDiaryNoteFile(vfile: VFile): boolean {
  const sourcePath = [
    ...(Array.isArray(vfile.history) ? vfile.history : []),
    readString(vfile.path),
    readString(readFilePathFromData(vfile.data))
  ].find(Boolean)

  if (!sourcePath) return false

  return sourcePath.replace(/\\/g, '/').includes(DIARY_CONTENT_SEGMENT)
}

function readFilePathFromData(data: VFile['data']): string {
  if (!data || typeof data !== 'object') return ''

  const record = data as Record<string, unknown>
  return readString(record.filePath)
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}
