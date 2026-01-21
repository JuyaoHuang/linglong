---
title: '配置文件分析'
description: '配置文件详解'
order: 11
---


# 主页配置分析 (Homepage Configuration Analysis)

## 概述 (Overview)

主页 (`/`) 由两个主要文件控制：
- **配置文件**: `src/site.config.ts` - 核心站点设置
- **布局文件**: `src/pages/index.astro` - 主页结构和内容

## 1. 配置源：site.config.ts

### 主题设置 (Theme Settings)

**位置**: lines 7-13

```typescript
theme: {
  title: 'Atri Website',
  author: 'Juyao Huang',
  description: 'A personal website built with Astro',
  logo: {
    src: '/src/assets/avatar.jpg',
    alt: 'Atri Website Logo'
  }
}
```

**配置项说明**:
- `title`: 网站标题，显示在浏览器标签页
- `author`: 作者名称，显示在主页头部
- `description`: 网站描述，用于SEO
- `logo.src`: 头像图片路径
- `logo.alt`: 图片替代文本

### 导航菜单 (Header Menu)

**位置**: lines 15-30

```typescript
header: {
  menu: [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Archives', url: '/archives' },
    { name: 'Tags', url: '/tags' },
    { name: 'Categories', url: '/categories' },
    { name: 'About', url: '/about' },
    { name: 'Sponsors', url: '/sponsors' }
  ]
}
```

**说明**: 这些菜单项显示在网站顶部导航栏

### 内容设置 (Content Settings)

**位置**: lines 32-34

```typescript
content: {
  blogPageSize: 8
}
```

**说明**: `blogPageSize` 控制博客列表页每页显示的文章数量（主页不直接使用此配置）

### 引言集成 (Quote Integration)

**位置**: lines 36-40

```typescript
integ: {
  quote: {
    enable: true,
    api: 'https://v1.hitokoto.cn/?c=i'
  }
}
```

**说明**:
- `enable`: 是否启用页脚随机引言
- `api`: 一言API接口地址

integ 是 IntegrationUserConfig 类型的配置对象，用于配置 Astro Pure 主题的各种集成功能和插件。它包含了网站的高级功能配 置。

integ 包含的功能模块

**1. Links 友链系统 (lines 104-122)**

作用: 配置友情链接页面的内容

配置项:
```ts
links: {
  // 友链日志 - 显示在友链页面的动态
  logbook: [
    { date: '2025-03-16', content: 'Is there a leakage?' }
  ],
  // 你的站点信息 - 供他人添加友链时参考
  applyTip: [
    { name: 'Name', val: theme.title },
    { name: 'Desc', val: theme.description },
    { name: 'Link', val: 'https://astro-pure.js.org/' },
    { name: 'Avatar', val: 'https://astro-pure.js.org/favicon/favicon.ico' }
  ],
  // 是否缓存友链头像到本地
  cacheAvatar: false
}
```

使用方法:
- 修改 logbook 数组添加友链动态
- 修改 applyTip 数组更新你的站点信息
- 设置 cacheAvatar: true 可以缓存头像到 public/avatars/ 提升加载速度

**2. Pagefind 搜索功能 (line 124)**

作用: 启用/禁用站内搜索功能

配置:

```ts
pagefind: true  // true启用，false 禁用
```

说明: 需要 prerender: true 才能正常工作

**3. Quote 随机引言 (lines 128-140)**

作用: 在页脚显示随机引言

当前配置: 使用 DummyJSON API

```ts
quote: {
  server: 'https://dummyjson.com/quotes/random',
  target: `(data) => (data.quote.length > 80 ? \`${data.quote.slice(0, 80)}...\` : data.quote || 'Error')`
}
```

可选 API:
- Hitokoto (一言) - 中文引言
```
server: 'https://v1.hitokoto.cn/?c=i',
target: `(data) => (data.hitokoto || 'Error')`
```
- Quoteable - 英文名言
```
server: 'http://api.quotable.io/quotes/random?maxLength=60',
target: `(data) => data[0].content || 'Error'`
```

使用方法: 取消注释你想用的 API，注释掉其他的

**4. Typography 排版样式 (lines 143-149)**

作用: 配置文章内容的排版样式

配置项:
```JavaScript
typography: {
  class: 'prose text-base',  // UnoCSS 类名
  blockquoteStyle: 'italic',  // 引用块样式: 'normal' / 'italic'
  inlineCodeBlockStyle: 'modern'  // 行内代码样式: 'code' / 'modern'
}
```
使用方法:
- 修改 blockquoteStyle 改变引用块字体样式
- 修改 inlineCodeBlockStyle 改变行内代码显示风格

**5. MediumZoom 图片放大 (lines 153-159)**

作用: 为图片添加点击放大效果

配置项:
```ts
mediumZoom: {
  enable: true,  // 启用/禁用
  selector: '.prose .zoomable',  // CSS选择器
  options: {
    className: 'zoomable'
  }
}
```
使用方法:
- 设置 enable: false 禁用图片放大功能
- 修改 selector 改变哪些图片可以放大

**6. Waline 评论系统 (lines 161-180)**

作用: 为文章添加评论功能

配置项:
```ts
waline: {
  enable: true,  // 启用/禁用
  server: 'https://astro-theme-pure-waline.arthals.ink/',  // Waline 服务器地址
  showMeta: false,  // 是否显示评论元信息
  emoji: ['bmoji', 'weibo'],  // 表情包
  additionalConfigs: {
    pageview: true,  // 页面浏览量统计
    comment: true,  // 评论功能
    locale: {
      reaction0: 'Like',
      placeholder: 'Welcome to comment...'
    },
    imageUploader: false  // 图片上传
  }
}
```
使用方法:
1. 部署自己的 Waline 服务器（参考 Waline 官方文档）
2. 修改 server 为你的服务器地址
3. 根据需要调整 additionalConfigs 配置

总结

integ 配置了网站的6大集成功能：
1. 友链系统 - 管理友情链接
2. 搜索功能 - 站内搜索
3. 随机引言 - 页脚引言显示
4. 排版样式 - 文章排版配置
5. 图片放大 - 图片查看体验
6. 评论系统 - 用户互动功能

所有配置都在 src/site.config.ts 的 integ 对象中，修改后重启开发服务器即可生效。
## 2. 主页结构：src/pages/index.astro

### 数据获取 (Data Fetching)

**位置**: lines 14-20

#### 技能分类 (Skill Categories)
```typescript
const languages = ['Html', 'JavaScript', 'CSS', 'Shell']
const frontend = ['TypeScript', 'Vite', 'Webpack', 'Astro']
const backend = ['Vercel', 'Waline']
```
**说明**: 硬编码的技能数组，用于技能展示区域

#### 最近文章 (Recent Posts)
```typescript
const MAX_POSTS = 10
const allPosts = await getBlogCollection()
const allPostsByDate = sortMDByDate(allPosts).slice(0, MAX_POSTS)
```
**说明**:
- 从内容集合获取所有博客文章
- 按日期排序（最新的在前）
- 限制显示最近10篇文章

### 内容区域 (Content Sections)

#### 1. 头部区域 (Header Section)
**位置**: lines 34-74

**组成部分**:
- 头像图片 (Profile image)
- 作者名称 (Author name)
- 标签 (Labels): Student, Developer, Blogger
- "Get Template" 按钮

**自定义方法**:
- 头像: 修改 `avatar` 导入路径 (line 5)
- 作者名: 修改 `config.theme.author` (site.config.ts)
- 标签: 编辑 lines 44-46 的 `<span>` 元素
- 按钮: 修改 lines 50-67 的 href 和文本

#### 2. 关于区域 (About Section)
**位置**: lines 77-85

```astro
<Section title='About'>
  <p class='text-muted-foreground'>
    Hi, I'm Juyao Huang, a student and developer...
  </p>
</Section>
```

**自定义方法**: 直接编辑段落文本内容

#### 3. 文章区域 (Posts Section)
**位置**: lines 86-99

**功能**: 显示最近10篇博客文章

**数据来源**:
- `getBlogCollection()` 从 `astro-pure/server` 获取
- 按 `publishDate` 排序（最新在前）
- 限制为 `MAX_POSTS = 10` 篇

**自定义方法**:
- 修改文章数量: 更改 `MAX_POSTS` 常量 (line 18)
- 修改排序: 调整 `sortMDByDate()` 调用 (line 20)

#### 4. 教育背景区域 (Education Section)
**位置**: lines 130-148

**组件**: Card 组件

**自定义方法**:
- 学位名称: `heading` 属性
- 学校名称: `subheading` 属性
- 时间: `date` 属性
- 图片: `imagePath` 属性
- 详细信息: 编辑 `<ul>` 列表内容

#### 5. 网站列表区域 (Website List Section)
**位置**: lines 150-177

**组件**: ProjectCard 组件

**自定义方法**:
- 添加/删除 `<ProjectCard>` 组件
- 每个卡片包含: href, heading, subheading, imagePath, altText

#### 6. 证书区域 (Certifications Section)
**位置**: lines 179-187

**组件**: Card 组件（带链接）

**自定义方法**:
- 证书名称: `heading` 属性
- 颁发机构: `subheading` 属性
- 日期: `date` 属性
- 链接: `href` 属性
- 图片: `imagePath` 属性

#### 7. 技能区域 (Skills Section)
**位置**: lines 189-193

**组件**: SkillLayout 组件

**数据来源**: 文件顶部的硬编码数组 (lines 14-16)

**自定义方法**:
- 修改技能数组: `languages`, `frontend`, `backend`
- 添加新类别: 创建新数组并添加 `<SkillLayout>` 组件

#### 8. 引言组件 (Quote Component)
**位置**: line 195

```astro
<Quote />
```

**配置**: 由 `config.integ.quote` 控制 (site.config.ts)
- 启用/禁用: `enable: true/false`
- API接口: `api: 'https://v1.hitokoto.cn/?c=i'`

## 3. 自定义指南 (Customization Guide)

### 快速自定义清单

#### 基本信息
- [ ] 更新作者名称: `site.config.ts` (line 9)
- [ ] 替换头像图片: `src/assets/avatar.jpg`
- [ ] 编辑头部标签: `index.astro` (lines 44-46)
- [ ] 更新关于区域文本: `index.astro` (lines 79-82)

#### 内容区域
- [ ] 修改教育背景卡片: `index.astro` (lines 132-146)
- [ ] 添加/删除项目卡片: `index.astro` (lines 152-175)
- [ ] 更新证书卡片: `index.astro` (lines 181-185)
- [ ] 编辑技能数组: `index.astro` (lines 14-16)

#### 文章显示
- [ ] 调整显示文章数量: 修改 `MAX_POSTS` (line 18)
- [ ] 文章自动从 `src/content/blog/` 获取

#### 导航菜单
- [ ] 修改导航菜单: `site.config.ts` (lines 17-25)

#### 页脚
- [ ] 启用/禁用引言: `config.integ.quote.enable`
- [ ] 更改引言API: `config.integ.quote.api`

## 4. 组件参考 (Component Reference)

### 使用的组件

- **Section**: 内容区域包装器，带标题
- **Card**: 显示卡片，包含图片、标题、副标题、日期
- **ProjectCard**: 项目专用卡片，带悬停效果
- **PostPreview**: 博客文章预览，包含标题、日期、摘要
- **SkillLayout**: 技能展示网格布局
- **Quote**: 页脚随机引言显示
- **Button**: 样式化按钮/链接组件
- **Image**: Astro 优化图片组件

### 导入来源

```typescript
import { Card, Section } from 'astro-pure/components/pages'
import { Button } from 'astro-pure/user'
import { getBlogCollection, sortMDByDate } from 'astro-pure/server'
```

## 5. 文件位置 (File Locations)

### 资源文件
- 头像图片: `src/assets/avatar.jpg`
- 教育图片: `src/assets/education.jpg`
- 项目图片: `src/assets/project.jpg`
- 证书图片: `src/assets/cert.jpg`

### 配置文件
- 主配置: `src/site.config.ts`
- 主页布局: `src/pages/index.astro`

### 内容
- 博客文章: `src/content/blog/` (自动获取)
