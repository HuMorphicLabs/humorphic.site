# Humorphic Lab - Production Deployment Architecture & Runbook

This guide covers the end-to-end production deployment process for the Humorphic Lab 3D platform on cloud virtual servers (e.g. AWS EC2, DigitalOcean Droplet, Hetzner, GCP Compute Engine).

---

## 1. Production Architecture Topology

```
Internet (Users & 3D Clients)
        |
        v
Cloudflare DNS / DDoS Protection (Proxy ON)
        |
        v
Let's Encrypt SSL / TLS Termination
        |
        v
Nginx Reverse Proxy (Port 80/443, Dockerized)
        |
        +------> Next.js 15 Standalone Node Container (Port 3000)
        |
        +------> Gunicorn WSGI Backend Container (Port 8000, 3 Workers)
                   |
                   +------> Managed PostgreSQL 16 Cluster
                   |
                   +------> AWS S3 / MinIO / DigitalOcean Spaces (3D GLTF Assets)
```

---

## 2. Server Preparation

1. **Provision Ubuntu 22.04 LTS / 24.04 LTS VPS** (Minimum: 2 vCPU, 4GB RAM, 50GB SSD).
2. **Update System Packages & Configure UFW Firewall**:
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   sudo apt-get install -y ufw curl git jq
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

---

## 3. Docker & Docker Compose Installation

```bash
# Add Docker's official GPG key & repository
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

---

## 4. Environment Secrets Configuration

Clone the repository into `/opt/humorphic-lab` and prepare production environment variables:

```bash
cd /opt
sudo git clone https://github.com/vishwshivani47-creator/Humorphic-lab-web.git
sudo chown -R $USER:$USER Humorphic-lab-web
cd Humorphic-lab-web

# Generate strong passwords and secrets
DJANGO_SECRET=$(python3 -c "import secrets; print(secrets.token_urlsafe(50))")
DB_PASSWORD=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")

cat <<EOF > .env
POSTGRES_DB=humorphic_production_db
POSTGRES_USER=humorphic_prod_user
POSTGRES_PASSWORD=${DB_PASSWORD}
POSTGRES_HOST=db
POSTGRES_PORT=5432

DJANGO_SECRET_KEY=${DJANGO_SECRET}
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,localhost,backend,web
DJANGO_SETTINGS_MODULE=config.settings.production

CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api/v1
NEXT_PUBLIC_SITE_NAME=Humorphic Lab
EOF
```

---

## 5. Build & Launch Production Containers

```bash
# Build multi-stage optimized images and launch in detached mode
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 6. Run Migrations & Collect Static Assets

```bash
# Run database migrations
docker compose -f docker-compose.prod.yml exec backend python manage.py migrate --noinput

# Collect static files for WhiteNoise/Nginx
docker compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

# Seed production admin and base robotics models
docker compose -f docker-compose.prod.yml exec backend python manage.py seed_data
```

---

## 7. SSL / TLS Certificate Setup (Certbot)

To configure automatic HTTPS with Let's Encrypt:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 8. Automated Database Backup Strategy

Create a daily automated backup cron job:

```bash
mkdir -p /opt/backups/postgres
cat << 'EOF' > /opt/backups/backup_db.sh
#!/bin/bash
BACKUP_DIR="/opt/backups/postgres"
DATE=$(date +"%Y%m%d_%H%M%S")
docker compose -f /opt/Humorphic-lab-web/docker-compose.prod.yml exec -T db pg_dump -U humorphic_prod_user humorphic_production_db | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"
# Retain backups for 14 days
find $BACKUP_DIR -type f -name "*.sql.gz" -mtime +14 -exec rm {} \;
EOF

chmod +x /opt/backups/backup_db.sh

# Add to crontab to run at 2 AM daily
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/backups/backup_db.sh") | crontab -
```

---

## 9. S3 Storage Migration Guide for Large 3D Models

To scale out 3D model asset storage to AWS S3, Cloudflare R2, or DigitalOcean Spaces:

1. Install `django-storages` and `boto3`:
   ```bash
   pip install django-storages boto3
   ```
2. Update `backend/config/settings/production.py`:
   ```python
   DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
   AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
   AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
   AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
   AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME', default='us-east-1')
   AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
   ```
