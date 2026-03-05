# LingLong

基于 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 构建的个人博客站点，简洁、快速、功能丰富。

[![GitHub deployments](https://img.shields.io/github/deployments/JuyaoHuang/lingLong/production?style=flat&logo=vercel&label=vercel)](https://www.juayohuang.top/)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat&logo=astro)](https://astro.build/)
[![License](https://img.shields.io/github/license/JuyaoHuang/lingLong?style=flat)](./LICENSE)

[English](./README.md)

> 事以密成，语以泄败，是不可多言，福不可多晒。

## 功能特性

- **博客系统** — 支持分类（两级层级）、标签、归档、分页
- **全文搜索** — 由 [Pagefind](https://pagefind.app/) 驱动，无需后端
- **评论系统** — 集成 [Waline](https://waline.js.org/)，支持浏览量统计与多种 emoji
- **数学公式** — 通过 [KaTeX](https://katex.org/) 渲染 LaTeX 数学公式
- **流程图表** — 通过 [Mermaid](https://mermaid.js.org/) 渲染图表，支持明暗主题自动切换
- **代码高亮** — Shiki 驱动，GitHub 明暗双主题，内置折叠、复制、标题、语言标记、diff 等增强
- **图片放大** — [medium-zoom](https://github.com/francoischalifour/medium-zoom) 提供点击放大效果
- **字数统计** — 文章列表卡片显示字数，替代估算阅读时间
- **天气小部件** — 宽屏（>1400px）悬浮天气卡片；展示当前天气及未来 3 天预报，[Chart.js](https://www.chartjs.org/) 温度/降水量图表；自动定位并通过 [Nominatim](https://nominatim.org/) 逆地理编码显示真实城市名；逐时天气展开面板；支持明暗主题
- **待办日历** — 密码保护的待办管理页，由 [Neon](https://neon.tech/) PostgreSQL 持久化；GitHub 风格 52 周贡献热力图、月历视图（蓝点标注到期日期）、滑出式 CRUD 面板
- **头像互动** — 鼠标悬停头像时指数加速旋转动画
- **友情链接** — 带动态日志的友链页面
- **项目展示** — 个人项目展示页
- **内容分享** — 支持微博、X、Bluesky 一键分享
- **随机一言** — 首页底部展示 [Hitokoto](https://hitokoto.cn/) 随机语录
- **RSS 订阅** — 博客与文档均提供 RSS feed
- **SEO 友好** — 自动生成 sitemap、robots.txt、社交卡片
- **深色模式** — 自动跟随系统或手动切换
- **响应式设计** — 适配移动端与桌面端
- **字体优化** — 通过 Fontshare 加载 Satoshi 字体，自动预加载
- **MDX 支持** — 在 Markdown 中使用组件

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Astro](https://astro.build/) 5.x |
| 样式 | [UnoCSS](https://unocss.dev/) |
| 语言 | TypeScript |
| 部署 | [Vercel](https://vercel.com/) |
| 包管理 | [Bun](https://bun.sh/) |
| 主题包 | [astro-pure](https://www.npmjs.com/package/astro-pure) |
| 数据库 | [Neon](https://neon.tech/) PostgreSQL（无服务器，用于待办） |
| 图表 | [Chart.js](https://www.chartjs.org/)（天气小部件） |

## 快速开始

### 环境要求

- [Bun](https://bun.sh/) >= 1.0 （推荐）或 Node.js >= 18
- Git

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/JuyaoHuang/lingLong.git
cd lingLong

# 安装依赖
bun install

# 启动开发服务器
bun dev
```

浏览器访问 `http://localhost:4321` 即可预览。

### 构建与预览

```bash
# 类型检查并构建
bun build

# 本地预览构建产物
bun preview
```

## 项目结构

```
.
├── public/                 # 静态资源（favicon、图片等）
├── src/
│   ├── assets/             # 图片、样式、工具图标等
│   ├── components/
│   │   ├── todo/           # 待办日历组件（ContributionChart、MonthCalendar、TodoPanel、TodoItem）
│   │   ├── weather/        # 天气小部件
│   │   └── ...             # 其他自定义组件
│   ├── content/
│   │   ├── blog/           # 博客文章（按 分类/子分类 组织）
│   │   └── docs/           # 文档内容
│   ├── layouts/            # 页面布局
│   ├── lib/                # 数据库连接辅助（Neon）
│   ├── middleware.ts        # 认证中间件（保护 /todo 和 /api/todos 路由）
│   ├── pages/              # 路由页面
│   │   ├── api/            # REST API 接口（认证 + 待办 CRUD）
│   │   ├── blog/           # 博客列表与详情
│   │   ├── categories/     # 分类页（支持两级）
│   │   ├── tags/           # 标签页
│   │   ├── archives/       # 归档页
│   │   ├── projects/       # 项目展示
│   │   ├── links/          # 友情链接
│   │   ├── search/         # 全文搜索
│   │   ├── todo/           # 待办日历页（需登录）
│   │   ├── about/          # 关于页
│   │   └── login.astro     # 登录页（访问待办页需要登录）
│   ├── plugins/            # 自定义 Shiki / rehype 插件
│   ├── utils/              # 工具函数
│   └── site.config.ts      # 站点配置文件
├── packages/pure/          # astro-pure 本地工作区（开发用）
├── astro.config.ts         # Astro 配置
├── uno.config.ts           # UnoCSS 配置
└── package.json
```

## 站点配置

所有站点信息在 `src/site.config.ts` 中集中配置：

```ts
export const theme: ThemeUserConfig = {
  title: 'Atri Website',
  author: 'Juyao Huang',
  description: '...',
  // 导航菜单、页脚链接、社交账号等
}

export const integ: IntegrationUserConfig = {
  // Waline 评论、Pagefind 搜索、引言、排版风格等
}
```

详细配置项参考 [astro-pure 文档](https://astro-pure.js.org/docs/setup/configuration)。

## 可用命令

| 命令 | 说明 |
|------|------|
| `bun dev` | 启动本地开发服务器 |
| `bun build` | 类型检查 + 构建生产产物 |
| `bun preview` | 预览构建产物 |
| `bun check` | 仅执行 TypeScript 类型检查 |
| `bun format` | 格式化代码（Prettier） |
| `bun lint` | 检查并修复代码风格（ESLint） |
| `bun pure new` | 通过 CLI 向导新建博客文章 |
| `bun cache:avatars` | 缓存友链头像到本地 `public/avatars/` |

## 部署

本项目使用 [Vercel](https://vercel.com/) 部署，在 `astro.config.ts` 中已配置 `@astrojs/vercel` 适配器。

将仓库推送到 GitHub 后，在 Vercel 中导入项目即可自动部署。若需部署到其他平台，参考 [Astro 部署文档](https://docs.astro.build/en/guides/deploy/) 切换对应适配器。

## 致谢

本项目基于 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 开发，感谢原作者 [cworld1](https://github.com/cworld1) 的出色工作。

## 许可证

本项目遵循 [Apache 2.0 License](./LICENSE)。
