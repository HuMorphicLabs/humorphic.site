# Humorphic Lab - System Architecture & Technical Specifications

## 1. High-Level Architecture Overview

Humorphic Lab is an autonomous robotics 3D platform built with a strictly decoupled frontend and backend architecture designed for high-performance 3D streaming, low-latency telemetry synchronization, and secure JWT-based access.

```
+-----------------------------------------------------------------------+
|                               Client                                  |
|            (Next.js 15, React 19, Three.js, React Three Fiber)        |
+-----------------------------------+-----------------------------------+
                                    |
                                    | HTTPS / Reverse Proxy
                                    v
+-----------------------------------------------------------------------+
|                          Nginx (Port 80/443)                          |
|             (SSL Termination, Gzip, Media Caching, Routing)           |
+------------------+---------------------------------+------------------+
                   |                                 |
     Path: /api/*  |                   Path: /*      |
                   v                                 v
+-----------------------------------+  +--------------------------------+
|       Django REST Framework       |  |       Next.js App Server       |
|    Gunicorn WSGI (Port 8000)      |  |     Node.js SSR (Port 3000)    |
|   - SimpleJWT Authentication      |  |   - Interactive 3D Workstation |
|   - 3D Model CRUD & Validation    |  |   - Anatomy HUD Telemetry Sync |
|   - drf-spectacular OpenAPI       |  |   - React Hook Form + Zod Forms|
|   - Robotics Hardware Catalog     |  |   - 2D Canvas Fallback Engine  |
+------------------+----------------+  +--------------------------------+
                   |
                   | PostgreSQL Protocol (Port 5432)
                   v
+-----------------------------------------------------------------------+
|                    PostgreSQL 16 Database Cluster                     |
|           (Users, Profiles, 3D Models, Categories, Products)          |
+-----------------------------------------------------------------------+
```

---

## 2. Component Breakdown

### Frontend (`/frontend`)
- **Framework**: Next.js 15 with App Router (`src/app/`)
- **Language**: TypeScript in strict mode
- **Styling**: Tailwind CSS configured with a cybernetic dark palette (`#05070b`, `#101623`, `#eb3b1c`, `#f7c873`)
- **3D Graphics Engine**:
  - `Three.js` (WebGL 2.0 rendering)
  - `@react-three/fiber` (declarative R3F Canvas integration)
  - `@react-three/drei` (OrbitControls, ContactShadows, Environment, useGLTF, useProgress)
- **State & Synchronization**:
  - Bidirectional HUD linking: clicking an anatomical component on the 2D schematic smoothly drives the 3D camera to focus on that exact joint and highlights its emissive mesh shader.
  - Fallback engine: When WebGL is unavailable or on low-power devices, seamlessly toggles to a 2D canvas frame streamer using the 300-frame image sequence.
- **Form Management**: `React Hook Form` paired with `Zod` schemas for client-side validation.
- **API Client**: Centralized Axios instance with automatic JWT Bearer token injection and automatic token refresh via interceptors.

### Backend (`/backend`)
- **Framework**: Django REST Framework on Python 3.12+
- **WSGI Application Server**: Gunicorn with multi-worker concurrency
- **Authentication**: `djangorestframework-simplejwt` with rotating refresh tokens and token blacklisting on logout.
- **File Ingestion Engine**:
  - File extension verification (`.glb`, `.gltf`)
  - Magic byte binary inspection (verifies `glTF` 0x46546C67 binary header)
  - Max upload threshold (100 MB)
- **API Documentation**: `drf-spectacular` generating OpenAPI 3.0 schema, interactive Swagger UI (`/api/docs/`), and ReDoc (`/api/redoc/`).
- **Static Asset Serving**: WhiteNoise with gzip and Brotli compression.

### Infrastructure & Reverse Proxy (`/docker`)
- **Nginx Reverse Proxy**:
  - Upstream routing to frontend (Port 3000) and backend (Port 8000)
  - Static and media files cached with `Cache-Control: public, max-age=2592000`
  - MIME type definitions for `model/gltf-binary` (.glb) and `model/gltf+json` (.gltf)
  - Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- **Docker Compose**:
  - Development (`docker-compose.yml`): Volume mounts for live-reload, PostgreSQL healthchecks.
  - Production (`docker-compose.prod.yml`): Isolated internal network, non-root user execution, persistent PostgreSQL data volume.
