# 📋 MongoDB Quick Reference

## 🚀 Lệnh cơ bản

```bash
# Khởi động
cd /workspaces/todo-list/mongodb-dev && docker-compose up -d

# Dừng
docker-compose down

# Reset data
docker-compose down -v && docker-compose up -d

# Xem logs
docker-compose logs -f mongodb
```

## 🔑 Thông tin đăng nhập

| User Type | Username | Password | Database | Quyền |
|-----------|----------|----------|----------|-------|
| Admin | `admin` | `adminpassword123` | `admin` | Full access |
| App | `todoapp` | `todopassword123` | `todolist` | Read/Write todolist only |

## 🌐 Connection Strings

```bash
# Backend (.env)
DATABASE_URL=mongodb://todoapp:todopassword123@localhost:27017/todolist

# Admin
mongodb://admin:adminpassword123@localhost:27017/?authSource=admin

# App user
mongodb://todoapp:todopassword123@localhost:27017/todolist
```

## 🛠️ MongoDB Shell

```bash
# Admin access
docker exec -it todo-mongodb-dev mongosh -u admin -p adminpassword123 --authenticationDatabase admin

# App user access
docker exec -it todo-mongodb-dev mongosh -u todoapp -p todopassword123 --authenticationDatabase todolist
```

## 📊 Monitoring

```bash
# Container status
docker-compose ps

# Resource usage
docker stats todo-mongodb-dev

# Health check
docker exec todo-mongodb-dev mongosh --eval "db.adminCommand('ping')" -u admin -p adminpassword123 --authenticationDatabase admin
```
