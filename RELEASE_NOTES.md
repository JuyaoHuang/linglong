## 🎉 LingLong v1.0

全新设计、全新技术栈的个人博客网站正式发布！本版本是对前一套 Anime 风格博客的完全重写，采用 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 作为基础主题，构建了一套简洁、快速、功能丰富的个人博客。

> **注意：** 本���本（v1.0）与上一版本（Anime 风格）为完全不同的项目风格与技术架构，属于全新一套实现。

---

## ✨ 主要特性

- **博客系统** — 支持两级分类、标签、归档与分页
- **全文搜索** — 基于 [Pagefind](https://pagefind.app/)，无需后端
- **评论系统** — 集成 [Waline](https://waline.js.org/)，支持浏览量统计与 Emoji
- **数学公式** — 通过 [KaTeX](https://katex.org/) 渲染 LaTeX 公式
- **流程图** — 集成 [Mermaid](https://mermaid.js.org/)，自动适配明暗主题
- **代码高亮** — 使用 Shiki + GitHub 主题，支持复制、折叠、标题、语言标记、diff 与高亮注解
- **图片缩放** — 基于 [medium-zoom](https://github.com/francoischalifour/medium-zoom) 的点击放大
- **字数统计** — 文章卡片显示字数而非阅读时长
- **天气组件** — 宽屏（>1400px）浮动卡片，含当前天气 + 3 天预报（[Chart.js](https://www.chartjs.org/) 温度/降水图）、自动定位、逐小时详情、明暗主题支持
- **Todo 日历** — 密码保护的待办管理页面，基于 [Neon](https://neon.tech/) PostgreSQL；GitHub 风格 52 周热力图、月历视图、滑入式增删改查面板
- **头像交互** — 鼠标悬停时触发指数加速旋转动画
- **友情链接** — 含动态日志的友链页面
- **项目展示** — 独立的个人项目展示页
- **一键分享** — 支持分享到微博、X（Twitter）、Bluesky
- **随机一言** — 首页底部展示 [Hitokoto](https://hitokoto.cn/) 随机语句
- **RSS 订阅** — 博客与文档均提供 RSS Feed
- **SEO 优化** — 自动生成 sitemap、robots.txt 与社交媒体卡片
- **暗色模式** — 跟随系统偏好或手动切换
- **紫色主题** — 自定义紫色配色方案，全站导航、按钮、卡片、文章链接、TOC 高亮风格统一
- **首页背景** — 支持纯色渐变与自定义背景图（明暗分离），通过 `site.config.ts` 配置
- **响应式设计** — 完美适配移动端与桌面端
- **字体优化** — 通过 Fontshare 加载 Satoshi 字体，自动预加载
- **MDX 支持** — 在 Markdown 中使用组件

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Astro](https://astro.build/) 5.x |
| 样式 | [UnoCSS](https://unocss.dev/) |
| 语言 | TypeScript |
| 部署 | [Vercel](https://vercel.com/) |
| 包管理 | [Bun](https://bun.sh/) |
| 主题包 | [astro-pure](https://www.npmjs.com/package/astro-pure) |
| 数据库 | [Neon](https://neon.tech/) PostgreSQL（Serverless，用于 Todo） |
| 图表 | [Chart.js](https://www.chartjs.org/)（天气组件） |

---

## 🙏 致谢

本项目基于 [cworld1](https://github.com/cworld1) 的 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure) 构建，感谢原作者的出色工作。

---

**在线访问：** https://www.juayohuang.top/