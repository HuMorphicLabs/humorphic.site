# Humorphic Lab - Autonomous Robotics & 3D Cybernetics Platform

[![Frontend CI](https://github.com/vishwshivani47-creator/Humorphic-lab-web/actions/workflows/frontend.yml/badge.svg)](https://github.com/vishwshivani47-creator/Humorphic-lab-web/actions/workflows/frontend.yml)
[![Backend CI](https://github.com/vishwshivani47-creator/Humorphic-lab-web/actions/workflows/backend.yml/badge.svg)](https://github.com/vishwshivani47-creator/Humorphic-lab-web/actions/workflows/backend.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Django](https://img.shields.io/badge/Django-5.1%20%7C%206.1-green)](https://www.djangoproject.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r173-orange)](https://threejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)

---

## Overview

**Humorphic Lab** is a complete, production-ready, highly responsive 3D cybernetics and autonomous robotics web platform. It transforms complex humanoid robotics kinematic models, whole-body balance control loops, and 3D CAD assets into an immersive WebGL workstation.

The project features a completely decoupled architecture with a modern **Next.js 15 App Router + React Three Fiber** frontend and a **Django REST Framework + PostgreSQL** backend, encapsulated with Docker, Nginx, and GitHub Actions CI/CD pipelines.

---

## Features

- **Interactive 3D Robotics Workstation**:
  - Full-body procedural and GLTF/GLB humanoid robotics inspection
  - OrbitControls with camera damping, polar angle limits, and smooth touch control
  - Studio 3-point lighting + cybernetic accent rim lights
  - Wireframe mode, auto-rotation, and lighting intensity controls
  - Fullscreen 3D viewport toggle
  - Model switcher (Humanoid Robot v5.04, custom uploaded GLB models)
  - 2D Canvas fallback engine utilizing the 300 animation frame sequence for low-powered or non-WebGL devices
- **Biomorphic Anatomy HUD Synchronization**:
  - 9 anatomical subsystems (Head, Torso, Arms, Hands, Waist, Legs, Feet, Motors, Battery)
  - Interactive 2D schematic diagram with hotspot pins
  - Bidirectional sync: clicking schematic pins or 3D robot limbs smoothly drives camera focus and highlights glowing shaders
- **Engineering Case Studies & Research Logs**:
  - 8 interactive challenge tabs detailing mechanical design, motor alignment, WBC balance, and high-current power rails
- **Chronological Milestones & Development Roadmap**:
  - 8 phase milestones from concept theory to empirical hardware testing
- **Live Empirical Telemetry & Animated Metrics**:
  - Components built, 32 DOF motors, development hours, prototype revision, and test volume
- **3D Model Asset Repository & Management**:
  - Browse, filter by category, search, and download 3D models
  - Authenticated user model upload with drag-and-drop
  - Rigorous backend validation checking `.glb`/`.gltf` extensions, magic bytes headers (`glTF`), and file sizes (max 100MB)
- **JWT Authentication & Profile System**:
  - Registration, Login, Token Refresh, Blacklisting on Logout, and `/api/v1/auth/me/`
  - React Hook Form + Zod schema validation
- **Interactive OpenAPI Documentation**:
  - Auto-generated OpenAPI 3.0 schema via `drf-spectacular`
  - Swagger UI and ReDoc endpoints

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Standalone build)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **3D Graphics Engine**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **HTTP Client**: Axios with JWT interceptors
- **Icons**: Lucide React

### Backend
- **Framework**: Django REST Framework (latest stable)
- **Language**: Python 3.12+ / 3.14+
- **Authentication**: `djangorestframework-simplejwt` (Token rotation & blacklist)
- **CORS & Environment**: `django-cors-headers`, `django-environ`
- **Documentation**: `drf-spectacular` (OpenAPI 3.0)
- **Static Asset Serving**: WhiteNoise, Gunicorn
- **Image & File Processing**: Pillow

### Infrastructure & DevOps
- **Database**: PostgreSQL 16
- **Containerization**: Docker, Docker Compose (Development & Production)
- **Reverse Proxy**: Nginx with 3D model MIME support and security headers
- **CI/CD**: GitHub Actions (Linting, migrations, and build test suites)

---

## Architecture

```
Internet (Clients & 3D Browsers)
             |
             v
   Nginx Reverse Proxy (:80 / :443)
             |
      +------+------+
      |             |
      v             v
Next.js Frontend   Django REST Framework
   (:3000)               (:8000)
                            |
                            v
                     PostgreSQL 16 (:5432)
```

For detailed architectural flow, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Folder Structure

```
Humorphic-lab-web/
├── frontend/
│   ├── public/
│   │   ├── frames/         # 300 sequential animation frames for 2D fallback
│   │   ├── models/         # 3D GLTF/GLB models
│   │   └── textures/       # 3D textures and assets
│   ├── src/
│   │   ├── app/            # Next.js App Router (layout, page, login, register, dashboard, models)
│   │   ├── components/
│   │   │   ├── 3d/         # Scene, ModelViewer, HumanoidRobot, GLBModel, Controls, Lights
│   │   │   ├── layout/     # Navbar, Footer
│   │   │   ├── sections/   # Hero, Features, AnatomyHUD, Challenges, Journey, Stats, TechStack
│   │   │   └── ui/         # Button, Input, Card, Modal, Badge, Toast, Skeleton
│   │   ├── hooks/          # useAuth, use3DPerformance
│   │   ├── lib/            # api.ts, auth.ts, utils.ts
│   │   ├── services/       # auth.service.ts, models.service.ts, users.service.ts
│   │   ├── types/          # TypeScript interfaces
│   │   └── config/         # site.ts
│   ├── package.json
│   ├── next.config.mjs
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
├── backend/
│   ├── config/             # Django settings (base, development, production), URLs, WSGI, ASGI
│   ├── apps/
│   │   ├── core/           # Health probe, pagination, exceptions, seed commands
│   │   ├── users/          # Custom User model, profile serializer, admin
│   │   ├── authentication/ # SimpleJWT register, login, refresh, logout, me
│   │   ├── models_3d/      # Model3D & Category models, validators, services, views
│   │   └── products/       # Robotics hardware catalog
│   ├── tests/              # Comprehensive test suite (13 passing tests)
│   ├── media/              # Uploaded 3D files & thumbnails
│   ├── static/             # Static assets
│   ├── manage.py
│   └── requirements.txt
│
├── docs/                   # Full documentation suite
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEVELOPMENT.md
│   └── DEPLOYMENT.md
│
├── docker/
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── nginx/nginx.conf
│
├── .github/workflows/
│   ├── frontend.yml
│   └── backend.yml
│
├── docker-compose.yml       # Development environment
├── docker-compose.prod.yml  # Production environment
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

---

## Installation & Running Locally

### Option 1: Docker Compose (Quickstart)

1. Copy environment template:
   ```bash
   cp .env.example .env
   ```
2. Build and launch containers:
   ```bash
   docker compose up --build
   ```
3. Seed database:
   ```bash
   docker compose exec backend python manage.py seed_data
   ```
4. Access endpoints:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API Health: [http://localhost:8000/api/v1/health/](http://localhost:8000/api/v1/health/)
   - Swagger UI: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

---

### Option 2: Running Without Docker

#### Backend Setup:
```bash
cd backend

# Create & activate virtualenv
python -m venv venv
source venv/bin/activate  # Or .\venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations & seed data
python manage.py makemigrations users models_3d products core
python manage.py migrate
python manage.py seed_data

# Run dev server
python manage.py runserver 0.0.0.0:8000
```

#### Frontend Setup:
```bash
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pre-Seeded Demo Credentials

- **Admin Account**:
  - Username: `admin`
  - Password: `Humorphic2026!`
  - Role: `admin`
- **Researcher Account**:
  - Username: `cybernaut`
  - Password: `RoboPass2026!`
  - Role: `engineer`

---

## Testing

### Backend Unit & Integration Tests:
```bash
cd backend
python manage.py test tests/
```
All 13 tests verify health checks, user registration, token blacklist on logout, 3D file extension/magic-byte validations, and product search.

### Frontend Production Build Test:
```bash
cd frontend
npm run build
```

---

## Production Deployment

Refer to [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete instructions on server setup, UFW firewall, Let's Encrypt SSL, automated database backups, and AWS S3 storage migration.

To launch production containers:
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
