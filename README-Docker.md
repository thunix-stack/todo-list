# 🐳 Docker Setup Guide

## Quick Start với Docker

### 1. Production Mode (Recommended)

```bash
# Build và start tất cả services
docker-compose up -d

# Hoặc sử dụng Makefile
make up
```

**Services sẽ chạy tại:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000  
- Nginx Proxy: http://localhost:80

### 2. Development Mode

```bash
# Start development containers với hot reload
docker-compose -f docker-compose.dev.yml up -d

# Hoặc sử dụng Makefile
make dev
```

## 📋 Available Commands

### Makefile Commands (Recommended)
```bash
make help       # Hiển thị tất cả commands
make build      # Build Docker images
make up         # Start production containers
make down       # Stop containers
make restart    # Restart containers
make logs       # View logs
make dev        # Start development mode
make dev-down   # Stop development containers
make clean      # Clean up everything
make health     # Check service health
```

### Docker Compose Commands
```bash
# Production
docker-compose build
docker-compose up -d
docker-compose down
docker-compose logs -f

# Development  
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f
```

## 🏗️ Docker Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │────│  Frontend:3000  │────│  Backend:5000   │
│     Port 80     │    │    (Next.js)    │    │   (Express)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Services

1. **Backend** (Express + TypeScript)
   - Base Image: node:22-alpine
   - Port: 5000
   - Health check: `/health` endpoint
   - Auto-restart enabled

2. **Frontend** (Next.js + TypeScript)  
   - Base Image: node:22-alpine
   - Port: 3000
   - Standalone output mode
   - Depends on backend health

3. **Nginx** (Reverse Proxy)
   - Image: nginx:alpine
   - Port: 80
   - Load balancing và rate limiting
   - Static file caching

## 🔧 Environment Variables

### Production (.env)
```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Development
```env
NODE_ENV=development
WATCHPACK_POLLING=true
LOG_LEVEL=debug
```

## 📁 File Structure

```
todo-list/
├── docker-compose.yml          # Production setup
├── docker-compose.dev.yml      # Development setup
├── nginx.conf                  # Nginx configuration
├── Makefile                    # Command shortcuts
├── backend/
│   ├── Dockerfile             # Production build
│   ├── Dockerfile.dev         # Development build
│   ├── .dockerignore          # Docker ignore rules
│   └── healthcheck.js         # Health check script
└── frontend/
    ├── Dockerfile             # Production build
    ├── Dockerfile.dev         # Development build
    └── .dockerignore          # Docker ignore rules
```

## 🔍 Troubleshooting

### Check Container Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Health Checks
```bash
# Manual health check
curl http://localhost:5000/health
curl http://localhost:3000

# Using Makefile
make health
```

### Clean Up
```bash
# Stop and remove containers
docker-compose down

# Remove everything (containers, images, volumes)
make clean
```

## 🚀 Production Deployment

### 1. Build Optimized Images
```bash
docker-compose build --no-cache
```

### 2. Environment Configuration
```bash
# Copy environment files
cp backend/.env.example backend/.env
# Edit environment variables
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Health Check
```bash
make health
```

## 🔒 Security Features

- **Non-root users** trong containers
- **Health checks** cho all services  
- **Rate limiting** qua Nginx
- **Security headers** từ Nginx
- **Environment isolation**
- **Network isolation** với custom bridge

## 📊 Monitoring

### Container Stats
```bash
docker stats
```

### Service Health
```bash
docker-compose ps
```

### Logs Monitoring
```bash
# Real-time logs
docker-compose logs -f --tail=100
```

## 🔄 Updates và Maintenance

### Update Images
```bash
# Pull latest base images
docker-compose pull

# Rebuild with latest code
docker-compose build --no-cache
docker-compose up -d
```

### Backup
```bash
# Backup volumes
docker run --rm -v todo-list_logs:/data -v $(pwd):/backup alpine tar czf /backup/logs-backup.tar.gz -C /data .
```

### Cleanup Old Images
```bash
docker image prune -f
docker system prune -af
```
