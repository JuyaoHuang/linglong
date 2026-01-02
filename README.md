# lingLong Blog - Astro Frontend Project
[demo](https://juayohuang.top)

> **A simple and elegant Astro-based static blog system**.

![alt text](https://img.shields.io/badge/license-MIT-blue.svg)
![alt text](https://img.shields.io/badge/Astro-5.3-orange.svg)

------

<div align="right"> <a href="./README.md"><strong>English</strong></a> | <a href="./README_zh.md">简体中文</a> </div>

## 📋 Project Overview

This is a **modern static blog system** built with Astro 5, designed for developers and writers who want a fast, elegant, and customizable blogging platform.

## ✨ Key Features

- ✅ **Modern Design**: Clean and elegant UI with dark mode support
- ✅ **Enhanced Markdown**: KaTeX math formulas, code highlighting, and automatic table of contents
- ✅ **Multi-level Categories**: Organize posts with first-level and second-level categories
- ✅ **Full-text Search**: Fast client-side search powered by Pagefind
- ✅ **SEO Optimized**: Automatic Sitemap, RSS feed, and metadata generation
- ✅ **Internationalization**: Built-in support for Chinese and English
- ✅ **Performance First**: Static generation, lazy loading, and smooth animations
- ✅ **Analytics Ready**: Integrated with Vercel Analytics and Speed Insights

------

## 🎨 Screenshots

| Light Mode | Dark Mode |
|:----------:|:---------:|
| ![Homepage](./public/demo_1.png) | ![Article](./public/demo_2.png) |
| Homepage with elegant design | Article page with TOC |

------
## 🏗️ Tech Stack

|    Technology    | Version |         Purpose         |
| :--------------: | :-----: | :---------------------: |
|    **Astro**     |  5.3.0  |  Static Site Generator  |
|    **Svelte**    | 5.39.6  | Interactive Components  |
| **Tailwind CSS** | 3.4.17  |    Styling Framework    |
|   **Pagefind**   |  1.3.0  | Full-text Search Engine |
|  **TypeScript**  |  5.9.2  |       Type Safety       |

------

## 📦 Project Structure

```
webTest/
├── src/
│   ├── components/        # UI Components
│   ├── contents/posts/    # Markdown Posts
│   ├── layouts/           # Page Layouts
│   ├── pages/             # Route Pages
│   ├── utils/             # Utility Functions
│   └── styles/            # Style files
├── public/                # Static Assets
├── dist/                  # Build Output
├── astro.config.mjs       # Astro configuration
├── linglong.config.ts     # Blog configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
└── package.json           # Dependencies
```

------

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** >= 22.0
- **pnpm** (enabled via Corepack)

### 1️⃣ Development

```bash
# Enable Corepack (first time)
corepack enable

# Install dependencies
pnpm install

# Start the development server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview the build output
pnpm preview
```

------

## 🌐 Deployment

### Method 1: Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect the Astro configuration
4. Deploy!

### Method 2: Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `pnpm build`
4. Publish directory: `dist`

### Method 3: Static Hosting

Build the project and deploy the `dist` folder to any static hosting service:

```bash
pnpm build
# Upload the dist/ folder to your hosting provider
```

------

## 🎯 Use Cases

### ✍️ Daily Writing Workflow

1. Create a new Markdown file in the `src/contents/posts/` directory
2. Write your content with frontmatter:
   ```markdown
   ---
   title: "Your Post Title"
   published: 2025-12-26
   description: "A brief description of your post"
   first_level_category: "Technology"
   second_level_category: "Web Development"
   tags: ["astro", "web", "blog"]
   draft: false
   ---

   # Your Post Title

   Your content here...
   ```

### 📝 Frontmatter Field Explanation

| Field | Required | Description | Example |
|:------|:---------|:------------|:--------|
| `title` | ✅ Yes | Post title | `"Getting Started with Astro"` |
| `published` | ✅ Yes | Publication date | `2025-12-26` |
| `description` | ✅ Yes | Brief description for SEO and post card | `"A comprehensive guide to..."` |
| `first_level_category` | ✅ Yes | Primary category | `"Technology"`, `"Life"` |
| `second_level_category` | ✅ Yes | Sub-category | `"Web Development"`, `"Tutorial"` |
| `tags` | ❌ No | Post tags (array) | `["astro", "javascript"]` |
| `draft` | ❌ No | Hide from production if `true` | `false` (default) |

3. Run `pnpm dev` to preview locally, or `pnpm build` for production
4. Your new post will automatically appear on the homepage and in the corresponding category pages

------

## 🐛 Troubleshooting

### Frontend Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
pnpm install
pnpm build
```

------

## 📚 Resources

- [Astro Official Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Pagefind Documentation](https://pagefind.app/)

------

## 🙏 Acknowledgments

### Frontend template based on:

- [Yukina Template by WhitePaper233](https://github.com/WhitePaper233/yukina)
- [Astro Fuwari Template](https://github.com/saicaca/fuwari)
- [Hexo Shoka Theme](https://github.com/amehime/hexo-theme-shoka)

### Technical Support:

- Astro Team
- Vercel Team
- Open Source Community

------

## 📄 License

MIT License - See the [LICENSE](LICENSE) file for details.

------

## 👨‍💻 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

------

## 📧 Contact

For questions or suggestions, please contact me via:

- Submitting an [Issue](https://github.com/JuyaoHuang/lingLong/issues)
- Email: [mail@juayohuang.top](mailto:mail@juayohuang.top)

------

**⭐ If you find this project helpful, please give it a Star!**
