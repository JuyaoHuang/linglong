/**
 *彩色文本语法备注插件：{color}text{/color}
 *
 *支持的颜色：红、蓝、绿、yel、pur、灰色、粉色、emer、rose、vio
 *
 *.md 文件中的用法：
 *{red}此文字为红色{/red}
 *{blue}**蓝色粗体文本**{/blue}
 *
 *注意：此插件发出可在 .md 文件中工作的原始 HTML 节点。
 *它不适用于 .mdx 文件，因为 MDX 管道会剥离原始 HTML
 *通过 rehypeRemoveRaw 的节点。
 */
import type { Root } from 'mdast'
import { findAndReplace } from 'mdast-util-find-and-replace'

const COLORS = ['red', 'blue', 'green', 'yel', 'pur', 'gray', 'pink', 'emer', 'rose', 'vio'] as const

const colorPattern = COLORS.join('|')
const openRegex = new RegExp(`\\{(${colorPattern})\\}`, 'g')
const closeRegex = new RegExp(`\\{/(${colorPattern})\\}`, 'g')

export default function remarkColoredText() {
  return (tree: Root) => {
    findAndReplace(tree, [
      [openRegex, (_: string, color: string) => ({ type: 'html' as const, value: `<span class="ct-${color}">` })],
      [closeRegex, () => ({ type: 'html' as const, value: '</span>' })]
    ])
  }
}
