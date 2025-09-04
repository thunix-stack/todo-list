# Todo List Application - Docker Management

.PHONY: help build up down restart logs clean dev dev-down

# Default target
help:
	@echo "Available commands:"
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start production containers"
	@echo "  down      - Stop and remove containers"
	@echo "  restart   - Restart all containers"
	@echo "  logs      - Show container logs"
	@echo "  clean     - Remove all containers, images, and volumes"
	@echo "  dev       - Start development containers"
	@echo "  dev-down  - Stop development containers"

# Production commands
build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

# Development commands  
dev:
	docker-compose -f docker-compose.dev.yml up -d

dev-down:
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Cleanup commands
clean:
	docker-compose down -v --rmi all --remove-orphans
	docker-compose -f docker-compose.dev.yml down -v --rmi all --remove-orphans
	docker system prune -af

# Health check
health:
	@echo "Checking backend health..."
	@curl -f http://localhost:5000/health || echo "Backend not responding"
	@echo "\nChecking frontend..."
	@curl -f http://localhost:3000 || echo "Frontend not responding"

# Quick setup
setup: build up
	@echo "Waiting for services to start..."
	@sleep 10
	@make health
