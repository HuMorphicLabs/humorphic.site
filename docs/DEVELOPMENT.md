# Humorphic Lab - Local Development Guide

## Prerequisites

- **Node.js**: v20.x or v22.x+
- **Python**: v3.11, v3.12, or v3.14+
- **Docker & Docker Compose** (optional for native local running, required for container workflow)
- **PostgreSQL 16** (or SQLite in standalone local dev mode)

---

## Option A: Running with Docker Compose (Recommended)

1. **Clone & Configure Environment**:
   ```bash
   cp .env.example .env
   ```

2. **Build and Launch All Services**:
   ```bash
   docker compose up --build
   ```

3. **Verify Running Containers**:
   - Frontend Application: [http://localhost:3000](http://localhost:3000)
   - Django REST API: [http://localhost:8000/api/v1/health/](http://localhost:8000/api/v1/health/)
   - Swagger Documentation: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
   - Nginx Reverse Proxy: [http://localhost](http://localhost)

4. **Seed Database Records**:
   ```bash
   docker compose exec backend python manage.py seed_data
   ```

---

## Option B: Running Without Docker (Native Development)

### 1. Backend Setup (Django + Python)

```bash
cd backend

# Create & Activate Virtual Environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# Run Migrations
python manage.py makemigrations users models_3d products core
python manage.py migrate

# Seed Initial Categories, 3D Models, and Demo Users
python manage.py seed_data

# Start Development Server
python manage.py runserver 0.0.0.0:8000
```

The Django server will run at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (Next.js + TypeScript)

In a separate terminal:

```bash
cd frontend

# Install Dependencies
npm install

# Start Next.js Development Server
npm run dev
```

The Next.js client will run at `http://localhost:3000/`.

---

## Running Tests

### Backend Tests
```bash
cd backend
python manage.py test tests/
```

### Frontend Build Verification
```bash
cd frontend
npm run build
```

---

## Demo Credentials Pre-Seeded in Database

- **Administrator Account**:
  - Username: `admin`
  - Password: `Humorphic2026!`
  - Role: `admin`
- **Researcher Account**:
  - Username: `cybernaut`
  - Password: `RoboPass2026!`
  - Role: `engineer`
