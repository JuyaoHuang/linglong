---
title: '项目结构文档'
description: '详解 astro-theme-pure 主题的项目结构'
order: 11
---

# Astro Theme Pure - 项目结构文档

## 项目概览

- **项目名称**: astro-theme-pure
- **版本**: 4.1.2
- **类型**: Astro 博客主题（Monorepo 结构）
- **许可证**: Apache-2.0
- **主题包版本**: astro-pure v1.4.0

## 根目录结构

```
astro-theme-pure/
├── .git/                    # Git 版本控制
├── .github/                 # GitHub 配置（Issue 模板、Funding）
├── .vscode/                 # VS Code 配置
├── .astro/                  # Astro 生成的类型文件
├── .vercel/                 # Vercel 部署配置
├── dist/                    # 构建输出目录
├── node_modules/            # 依赖包
├── packages/                # Monorepo 包目录（包含主题包）
├── preset/                  # 预设和脚本
├── public/                  # 静态资源
├── src/                     # 源代码目录
├── astro.config.ts          # Astro 核心配置文件
├── tsconfig.json            # TypeScript 配置
├── package.json             # 项目依赖配置
├── pnpm-workspace.yaml      # pnpm 工作区配置
├── pnpm-lock.yaml           # 依赖锁定文件
├── uno.config.ts            # UnoCSS 配置
├── prettier.config.mjs      # Prettier 代码格式化配置
├── eslint.config.mjs        # ESLint 配置
├── CODE_OF_CONDUCT.md       # 行为准则
└── README.md / README-zh-CN.md
```

## 关键配置文件

### 1. package.json - 项目依赖和脚本

**主要脚本命令**:
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建项目（包含类型检查）
- `pnpm preview` - 预览构建结果
- `pnpm lint` - 代码检查和修复
- `pnpm format` - 代码格式化
- `pnpm cache:avatars` - 缓存头像脚本

**核心依赖**:
- `astro@^5.16.6` - 核心框架
- `astro-pure@1.4.0` - 主题包
- `@astrojs/check@^0.9.6` - 类型检查
- `@astrojs/rss@^4.0.14` - RSS 生成
- `@astrojs/vercel@^9.0.3` - Vercel 适配器
- `@waline/client@^3.8.0` - 评论系统
- `katex@^0.16.27` - 数学公式支持
- `sharp@^0.34.5` - 图片处理

### 2. astro.config.ts - Astro 核心配置

**关键配置**:
- **适配器**: Node.js standalone 模式（可切换为 Vercel）
- **输出模式**: Server-side rendering (SSR)
- **图片服务**: Sharp 图片优化
- **Markdown 处理**:
  - 数学公式支持 (remark-math + rehype-katex)
  - 代码高亮 (Shiki with GitHub Light/Dark themes)
  - 自定义代码块转换器（复制按钮、代码折叠等）
- **集成**: AstroPureIntegration（自动添加 sitemap、MDX、UnoCSS）
- **实验特性**: 字体优化、SVG 优化、内容智能感知

### 3. tsconfig.json - TypeScript 配置

**路径别名**:
```typescript
@/assets/*      → src/assets/*
@/components/*  → src/components/*
@/layouts/*     → src/layouts/*
@/utils         → src/utils/index.ts
@/plugins/*     → src/plugins/*
@/pages/*       → src/pages/*
@/types         → src/types/index.ts
@/site-config   → src/site.config.ts
```

### 4. uno.config.ts - UnoCSS 样式配置

- **预设**: presetMini + presetTypography
- **主题颜色**: HSL 变量系统（primary、foreground、background、muted 等）
- **自定义规则**: sr-only、object-cover、line-clamp 等
- **排版定制**: 标题、代码块、引用、表格等样式

### 5. prettier.config.mjs - 代码格式化

- **导入排序**: Astro → @astrojs → 第三方 → astro-pure → 本地路径
- **格式规则**: 单引号、无分号、100 字符行宽
- **插件**: prettier-plugin-astro、prettier-plugin-sort-imports

## src/ 源代码目录结构

```
src/
├── assets/                  # 静态资源
│   ├── styles/             # 全局样式
│   │   ├── app.css
│   │   └── global.css
│   ├── icons/              # 图标
│   ├── tools/              # 工具图标 (25+ SVG)
│   ├── projects/           # 项目图片 (4 个 AVIF)
│   ├── avatar.png          # 头像
│   ├── alipay-qrcode.jpg   # 支付二维码
│   └── wechat-qrcode.jpg
│
├── components/             # 可复用组件
│   ├── about/              # 关于页面组件
│   │   ├── Substats.astro  # 统计信息
│   │   └── ToolSection.astro
│   ├── home/               # 首页组件
│   │   ├── ProjectCard.astro
│   │   ├── Section.astro
│   │   └── SkillLayout.astro
│   ├── links/              # 链接页面组件
│   │   └── FriendList.astro
│   ├── projects/           # 项目页面组件
│   │   ├── ProjectSection.astro
│   │   ├── Sponsors.astro
│   │   └── Sponsorship.astro
│   ├── waline/             # 评论系统组件
│   │   ├── Comment.astro
│   │   ├── PageInfo.astro
│   │   ├── Pageview.astro
│   │   └── index.ts
│   └── BaseHead.astro      # 基础 Head 组件
│
├── content/                # 内容集合
│
├── layouts/                # 页面布局
│   ├── BaseLayout.astro    # 基础布局
│   ├── BlogPost.astro      # 博客文章布局
│   ├── CommonPage.astro    # 通用页面布局
│   ├── ContentLayout.astro # 内容布局
│   └── IndividualPage.astro
│
├── pages/                  # 页面路由
│   ├── index.astro         # 首页
│   ├── 404.astro           # 404 页面
│   ├── about/index.astro   # 关于页面
│   ├── archives/index.astro # 归档页面
│   ├── blog/               # 博客页面
│   │   ├── [...id].astro   # 动态博客文章路由
│   │   └── [...page].astro # 博客分页
│   ├── docs/               # 文档页面
│   │   ├── index.astro
│   │   ├── [...id].astro
│   │   ├── DocsContents.astro
│   │   └── rss.xml.ts
│   ├── links/index.astro   # 友链页面
│   ├── projects/index.astro # 项目页面
│   ├── search/index.astro  # 搜索页面
│   ├── tags/               # 标签页面
│   │   ├── index.astro
│   │   └── [tag]/[...page].astro
│   ├── terms/              # 条款页面
│   │   ├── index.astro
│   │   ├── copyright.md
│   │   ├── disclaimer.md
│   │   ├── privacy-policy.md
│   │   └── terms-and-conditions.md
│   ├── robots.txt.ts       # SEO robots 文件
│   └── rss.xml.ts          # RSS 订阅
│
├── plugins/                # 自定义插件
│   ├── rehype-auto-link-headings.ts
│   ├── shiki-custom-transformers.ts
│   └── shiki-official/     # Shiki 官方转换器
│       ├── shared-notation-map.ts
│       ├── shared-notation-transformer.ts
│       ├── shared-parse-comments.ts
│       └── transformers.ts
│
├── content.config.ts       # 内容集合配置
├── site.config.ts          # 网站配置（主要配置文件）
└── type.d.ts              # 类型定义
```

## 内容配置

### content.config.ts - 内容集合定义

**Blog 集合**:

- 必需字段: title、description、publishDate
- 可选字段: updatedDate、heroImage、tags、language、draft、comment

**Docs 集合**:
- 必需字段: title、description
- 可选字段: publishDate、updatedDate、tags、draft、order

### site.config.ts - 网站主配置

**主题配置** (theme):
- 标题、作者、描述、favicon、社交卡片
- 语言和日期格式设置
- 导航菜单（Blog、Docs、Projects、Links、About）
- 页脚配置和社交链接

**集成配置** (integ):
- **Links**: 友链系统、头像缓存
- **Pagefind**: 全文搜索
- **Quote**: 随机引言（DummyJSON API）
- **Typography**: 排版样式定制
- **MediumZoom**: 图片放大效果
- **Waline**: 评论系统配置

## packages/ 包结构

### packages/pure/ - 主题包

```
packages/pure/
├── components/
│   ├── basic/              # 基础组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeProvider.astro
│   │   └── index.ts
│   ├── pages/              # 页面组件
│   │   ├── Hero.astro
│   │   ├── PostPreview.astro
│   │   ├── Paginator.astro
│   │   ├── TOC.astro
│   │   ├── ArticleBottom.astro
│   │   ├── BackToTop.astro
│   │   ├── Copyright.astro
│   │   ├── PFSearch.astro
│   │   └── index.ts
│   ├── advanced/           # 高级组件
│   │   ├── GithubCard.astro
│   │   ├── LinkPreview.astro
│   │   ├── MediumZoom.astro
│   │   ├── QRCode.astro
│   │   ├── Quote.astro
│   │   └── index.ts
│   └── user/               # 用户自定义组件
│       ├── Button.astro
│       ├── Card.astro
│       ├── Tabs.astro
│       ├── Steps.astro
│       ├── Timeline.astro
│       ├── Collapse.astro
│       ├── Spoiler.astro
│       ├── Icon.astro
│       └── 更多...
├── plugins/                # 处理插件
│   ├── link-preview.ts
│   ├── override-svg-attributes.ts
│   ├── rehype-external-links.ts
│   ├── rehype-steps.ts
│   ├── rehype-table.ts
│   ├── rehype-tabs.ts
│   ├── remark-plugins.ts
│   ├── toc.ts
│   └── virtual-user-config.ts
├── schemas/                # 配置 Schema
│   ├── favicon.ts
│   ├── head.ts
│   ├── header.ts
│   ├── links.ts
│   ├── locale.ts
│   └── logo.ts
├── libs/                   # 工具库
│   ├── icons.ts
│   └── index.ts
├── index.ts                # 主入口
├── package.json            # 包配置
└── types/                  # 类型定义
```

## preset/ 和 public/ 目录

### preset/ - 预设和脚本

```
preset/
├── components/
│   └── signature/          # 签名组件
│       ├── Signature.astro
│       ├── index.mdx
│       └── signature.svg
├── icons/                  # 工具图标库 (12+ SVG)
│   ├── androidstudio.svg
│   ├── arc.svg
│   ├── qt.svg
│   ├── unity.svg
│   └── 更多...
├── scripts/
│   └── cacheAvatars.ts     # 头像缓存脚本
└── README.md
```

### public/ - 静态资源

```
public/
├── favicon/                # Favicon 集合
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── site.webmanifest
├── icons/                  # 公共图标
│   ├── code.svg
│   └── heart-item.svg
├── images/
│   └── social-card.png     # 社交分享卡片
├── scripts/
│   └── pretty-feed-v3.xsl  # RSS 样式表
└── links.json              # 友链数据
```

## 技术栈

### 核心框架
- **Astro 5.16.6** - 静态站点生成器
- **TypeScript 5.9.3** - 类型安全

### 样式系统
- **UnoCSS 0.66.5** - 原子化 CSS 框架
- **@unocss/reset** - CSS 重置
- **@unocss/preset-typography** - 排版预设

### 内容处理
- **@astrojs/mdx** - MDX 支持
- **remark-math** - 数学公式
- **rehype-katex** - KaTeX 渲染
- **Shiki** - 代码高亮

### 功能集成
- **@astrojs/rss** - RSS 生成
- **@astrojs/sitemap** - Sitemap 生成
- **Pagefind** - 全文搜索
- **@waline/client** - 评论系统
- **@pagefind/default-ui** - 搜索 UI

### 部署
- **@astrojs/node** - Node.js 适配器
- **@astrojs/vercel** - Vercel 适配器（可选）

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **pnpm** - 包管理器

## 项目特色功能

### 1. 内容管理
- 支持 Markdown 和 MDX 格式
- 博客和文档两个独立集合
- 草稿模式支持
- 标签和分类系统
- 多语言支持

### 2. 代码高亮
- GitHub Light/Dark 主题
- 代码复制按钮
- 代码折叠功能
- 行号和语言标签
- Diff 和高亮标记

### 3. 搜索功能
- Pagefind 全文搜索
- 支持离线搜索
- 实时搜索预览

### 4. 评论系统
- Waline 评论服务
- 支持表情反应
- 页面浏览统计
- 评论通知

### 5. SEO 优化
- RSS 订阅（博客和文档独立）
- Sitemap 自动生成
- robots.txt 配置
- 社交分享卡片
- Meta 标签优化

### 6. 响应式设计
- 移动端优化
- 深色模式支持
- 图片响应式处理
- 自适应导航菜单

### 7. 其他功能
- 图片放大查看（MediumZoom）
- GitHub 卡片展示
- 链接预览
- QR 码生成
- 随机引言
- 友链系统
- 赞助页面
- 归档页面
- 标签系统

## 开发工作流

### 本地开发
```bash
pnpm dev        # 启动开发服务器 (http://localhost:4321)
pnpm build      # 构建生产版本
pnpm preview    # 预览构建结果
```

### 代码质量
```bash
pnpm lint       # ESLint 检查和修复
pnpm format     # Prettier 格式化
```

### 内容管理
```bash
pnpm cache:avatars  # 缓存友链头像
```
---

**文档生成时间**: 2026-01-14
**项目版本**: 4.1.2
**主题包版本**: astro-pure 1.4.0
