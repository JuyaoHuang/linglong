# lingLong Blog - Full-Stack Integrated Project
[demo](https://juayohuang.top)
> **A simple and elegant Astro blog system with a FastAPI backend management platform**
> You need to switch to the 'integrity' branch to see the entire integration project, including the Chinese version of README.md.

![alt text](https://img.shields.io/badge/license-MIT-blue.svg)
![alt text](https://img.shields.io/badge/Astro-5.3-orange.svg)
![alt text](https://img.shields.io/badge/FastAPI-latest-green.svg)
![alt text](https://img.shields.io/badge/Docker-ready-blue.svg)

------

<div align="right"> <a href="./README.md"><strong>English</strong></a> | <a href="./README_zh.md">简体中文</a> </div>

## 📋 Project Overview

This project is a **full-stack integrated blog system** that combines modern static site generation technology with powerful backend management capabilities:

- **Frontend (LingLong)**: A static blog based on Astro 5, supporting Markdown, math formulas, search, RSS, and more.
- **Backend (FastAPI)**: Provides a content management API for the blog, supporting post creation, editing, deletion, and authentication.
- **Deployment Solution**: Docker + Nginx reverse proxy, suitable for Raspberry Pi/VPS deployment.

------

## ✨ Key Features

### 🎨 Frontend Features

- ✅ **Modern Design**: A clean and elegant UI with dark mode support.
- ✅ **Enhanced Markdown**: Supports KaTeX for math formulas, code highlighting, and an automatic table of contents.
- ✅ **Full-text Search**: Fast client-side search powered by Pagefind.
- ✅ **Categorization System**: Supports multi-level categories and tags.
- ✅ **SEO Optimized**: Automatic generation of Sitemap, RSS, and metadata.
- ✅ **Internationalization (i18n)**: Built-in support for Chinese and English.
- ✅ **Performance Optimized**: Static generation, lazy loading for images, and smooth transition animations.

### 🔧 Backend Features

- ✅ **RESTful API**: Complete set of endpoints for post management.
- ✅ **JWT Authentication**: Secure identity verification system.
- ✅ **Markdown Handling**: Automatically parses and manages Markdown files.
- ✅ **SQLite Database**: Lightweight user management.
- ✅ **Swagger Docs**: Automatically generated API documentation.
- ✅ **CORS Configuration**: Flexible cross-origin access control.

### 🚀 Deployment Features

- ✅ **Dockerized**: One-command deployment with environment isolation.
- ✅ **Nginx Reverse Proxy**: Unified entry point for frontend and backend, no CORS configuration needed.
- ✅ **Development/Production Separation**: Independent environments for development and deployment.
- ✅ **Raspberry Pi Friendly**: Optimized for ARM architecture.

------

## 🏗️ Tech Stack

### Frontend

|    Technology    | Version |         Purpose         |
| :--------------: | :-----: | :---------------------: |
|    **Astro**     |  5.3.0  |  Static Site Generator  |
|    **Svelte**    | 5.39.6  | Interactive Components  |
| **Tailwind CSS** | 3.4.17  |    Styling Framework    |
|   **Pagefind**   |  1.3.0  | Full-text Search Engine |
|  **TypeScript**  |  5.9.2  |       Type Safety       |

### Backend

|       Technology       |           Purpose           |
| :--------------------: | :-------------------------: |
|      **FastAPI**       |        Web Framework        |
|     **SQLAlchemy**     | ORM for Database Management |
|       **SQLite**       |        Data Storage         |
| **JWT (python-jose)**  |       Authentication        |
|  **Passlib + Bcrypt**  |      Password Hashing       |
| **Python Frontmatter** |      Markdown Parsing       |

### Infrastructure

| Technology |               Purpose               |
| :--------: | :---------------------------------: |
| **Docker** |      Containerized Deployment       |
| **Nginx**  | Reverse Proxy & Static File Serving |
|  **pnpm**  |     Frontend Package Management     |

------

## 📦 Project Structure

```
    webTest/
├── lingLong/                    # Frontend Project (Astro)
│   ├── src/
│   │   ├── components/        # UI Components
│   │   ├── contents/posts/    # Markdown Posts
│   │   ├── layouts/           # Page Layouts
│   │   ├── pages/             # Route Pages
│   │   ├── utils/             # Utility Functions
│   │   └── styles/            # Style files
│   ├── public/                # Static Assets
│   ├── dist/                  # Build Output
│   └── package.json
│
├── backend/                   # Backend Project (FastAPI)
│   ├── app/
│   │   ├── api/               # API Routers
│   │   │   ├── auth.py        # Auth endpoint
│   │   │   └── posts.py       # Post management endpoints
│   │   ├── core/              # Core Configuration
│   │   │   ├── config.py      # Environment config
│   │   │   └── security.py    # Security and auth logic
│   │   ├── data/              # Data Layer
│   │   │   ├── database.py    # Database connection
│   │   │   └── models.py      # Data models
│   │   └── main.py            # Application entrypoint
│   ├── data/                  # SQLite database file
│   ├── .env                   # Environment variables (not committed to Git)
│   ├── .env.example           # Example environment variables
│   ├── Dockerfile             # For isolated backend development
│   └── requirements.txt
│
├── nginx/                     # Nginx Configuration
│   ├── nginx.conf             # Reverse proxy config
│   └── Dockerfile
│
├── backend.Dockerfile         # For integrated production deployment
├── docker-compose.yml         # Integrated deployment configuration
└── README.md                  # This file
  
```

------

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** >= 22.0
- **Python** >= 3.11
- **Docker** >= 20.10
- **Docker Compose** >= 2.0
- **pnpm** (enabled via Corepack)

------

## 🛠️ Development Mode

### 1️⃣ Frontend Development

```bash
# Enter the frontend directory
cd lingLong

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

### 2️⃣ Backend Development

```Bash
# Enter the backend directory
cd backend

# Create a virtual environment (optional)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit the .env file to set your SECRET_KEY

# Start the development server (http://localhost:8000)
uvicorn app.main:app --reload

# Access the API docs
# http://localhost:8000/docs
  
```

### 3️⃣ Isolated Backend Development with Docker

```Bash
cd backend
docker-compose up --build
```

------

## 🐳 Production Deployment

### Method 1: Docker Compose (Recommended)

```Bash
# 1. Configure environment variables
cd backend
cp .env.example .env
# Edit .env and set production configurations:
#   - SECRET_KEY: A strong secret key (use: python -c "import secrets; print(secrets.token_urlsafe(32))")
#   - ALLOWED_ORIGINS: Leave blank (for Nginx reverse proxy mode)
#   - ENVIRONMENT: production

# 2. Build the frontend
cd ../lingLong
pnpm install
pnpm build

# 3. Start the integrated services (from the project root)
cd ..
docker-compose up -d

# 4. Access the services
# Frontend: http://localhost:8080
# Backend API: http://localhost:8080/api
# API Docs: http://localhost:8080/docs
```

### Method 2: Raspberry Pi + Cloudflare Deployment

#### 1. Raspberry Pi Setup

```Bash
# Clone the project
git clone <your-repo-url> ~/webTest
cd ~/webTest

# Configure the backend environment
cd backend
cp .env.example .env
nano .env  # Configure production environment variables

# Build the frontend
cd ../lingLong
pnpm install
pnpm build

# Start the services
cd ..
docker-compose up -d

# Configure firewall (optional)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
  
```

#### 2. Cloudflare Configuration

**DNS Settings**:

- Type: A
- Name: @ (or a subdomain)
- Content: Your Raspberry Pi's public IP
- Proxy status: Proxied (orange cloud)

**SSL/TLS Settings**:

- Mode: Flexible or Full

**Access**:

```
https://yourdomain.com        # Blog homepage
https://yourdomain.com/api    # Backend API
https://yourdomain.com/docs   # API documentation
  
```

------

## 🔐 Environment Configuration

### backend/.env

```Bash
# ============================================
# JWT Security Configuration
# ============================================
# Generate a strong key with:
# python -c "import secrets; print(secrets.token_urlsafe(32))"
SECRET_KEY=your-secret-key-here

# ============================================
# CORS Configuration
# ============================================
# Development: Leave blank to use default local ports (localhost:4321-5000)
# Production: Leave blank when using Nginx reverse proxy
# Only fill this if exposing different ports directly, e.g.:
# ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ALLOWED_ORIGINS=

# ============================================
# Environment Configuration
# ============================================
ENVIRONMENT=production  # development | production
  
```

------

## 📡 API Documentation

### Authentication Endpoint

```Http
POST /token
Content-Type: application/x-www-form-urlencoded

username=admin&password=your-password

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
  
```

### Post Management Endpoints

All endpoints require a JWT Token in the Header:

```Code
Authorization: Bearer <token>
```

| Method |          Path           |       Function        |
| :----: | :---------------------: | :-------------------: |
|  GET   |    /api/admin/posts     | Get list of all posts |
|  POST  |    /api/admin/posts     |   Create a new post   |
|  PUT   | /api/admin/posts/{slug} |     Update a post     |
| DELETE | /api/admin/posts/{slug} |     Delete a post     |

**For full documentation**: Visit http://your-domain/docs after deployment.

------

## 🎯 Use Cases

### ✍️ Daily Writing Workflow

1. Create a new Markdown file in the lingLong/src/contents/posts/ directory.
2. Manage posts using the backend API (optional).
3. Run pnpm build to rebuild the site.
4. Refresh the website to see the updates.

### 🔄 Automated Deployment (Recommended)

```Bash
# Create a deployment script deploy.sh
#!/bin/bash
cd ~/webTest/lingLong
git pull
pnpm install
pnpm build
cd ..
docker-compose restart nginx
  
```

------

## 🐛 Troubleshooting

### Frontend Build Fails

```Bash
# Clear cache and rebuild
cd lingLong
rm -rf node_modules dist .astro
pnpm install
pnpm build
```

### Backend Fails to Start

```Bash
# Check the logs
docker-compose logs backend

# Common issues:
# 1. SECRET_KEY is not set → Edit backend/.env
# 2. Port is already in use → Modify port mapping in docker-compose.yml
# 3. Database permissions error → Check permissions for the backend/data/ directory
  
```

### CORS Errors

```Bash
# When using Nginx reverse proxy, confirm that:
# 1. ALLOWED_ORIGINS in backend/.env is blank.
# 2. Both frontend and backend are accessed via the same domain (e.g., yourdomain.com and yourdomain.com/api).
```

------

## 📚 Resources

- [Astro Official Documentation](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdocs.astro.build%2F)
- [FastAPI Official Documentation](https://www.google.com/url?sa=E&q=https%3A%2F%2Ffastapi.tiangolo.com%2F)
- [Docker Deployment Guide](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdocs.docker.com%2F)
- [Nginx Configuration Reference](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnginx.org%2Fen%2Fdocs%2F)

------

## 🙏 Acknowledgments

### Frontend template based on:

- [Yukina Template by WhitePaper233](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2FWhitePaper233%2Fyukina)
- [Astro Fuwari Template](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2Fsaicaca%2Ffuwari)
- [Hexo Shoka Theme](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2Famehime%2Fhexo-theme-shoka)

### Technical Support:

- Astro Team
- FastAPI Team
- Docker Community

------

## 📄 License

MIT License - See the [LICENSE](https://www.google.com/url?sa=E&q=LICENSE) file for details.

------

## 👨‍💻 Contributing

Issues and Pull Requests are welcome!

1. Fork this repository.
2. Create your feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a Pull Request.

------

## 📧 Contact

For questions or suggestions, please contact me via:

- Submitting an [Issue](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2FJuyaoHuang%2FlingLong%2Fissues)
- Email: [your-email@example.com](https://www.google.com/url?sa=E&q=mailto%3Ayour-email@example.com)

------

**⭐ If you find this project helpful, please give it a Star!**
