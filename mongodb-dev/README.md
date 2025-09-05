# 🗄️ MongoDB Development Environment

Môi trường MongoDB local cho development với Docker, bao gồm authentication và bảo mật hoàn chỉnh.

## 🚀 Khởi động nhanh

### Bước 1: Khởi động MongoDB
```bash
cd /workspaces/todo-list/mongodb-dev
docker-compose up -d
```

### Bước 2: Kiểm tra trạng thái
```bash
docker-compose ps
docker-compose logs -f mongodb
```

### Bước 3: Dừng MongoDB
```bash
docker-compose down
```

### Bước 4: Xóa toàn bộ dữ liệu (Reset)
```bash
docker-compose down -v
```

## � Thông tin đăng nhập

### Root Admin User (Quản trị toàn hệ thống)
- **Username**: `admin`
- **Password**: `adminpassword123`
- **Quyền**: Full access tất cả databases
- **Sử dụng cho**: Admin operations, backup, restore

### Application User (Cho ứng dụng)
- **Username**: `todoapp`
- **Password**: `todopassword123`
- **Quyền**: Read/Write chỉ database `todolist`
- **Sử dụng cho**: Backend application connection

## 🌐 Connection Strings

### Cho Backend Application (.env)
```bash
DATABASE_URL=mongodb://todoapp:todopassword123@localhost:27017/todolist
```

### Cho Admin Operations
```bash
mongodb://admin:adminpassword123@localhost:27017/todolist?authSource=admin
```

### Cho MongoDB Compass/GUI Tools
```bash
# Application User
mongodb://todoapp:todopassword123@localhost:27017/todolist

# Admin User (Full Access)
mongodb://admin:adminpassword123@localhost:27017/?authSource=admin
```

## 📊 Thông tin Database

### Container Info
- **Container Name**: `todo-mongodb-dev`
- **Image**: `mongo:7.0`
- **Port**: `27017` (mapped to host)
- **Database**: `todolist`
- **Authentication**: Enabled (`--auth`)

### Volumes (Data Persistence)
- **mongodb_data**: `/data/db` - Database files
- **mongodb_config**: `/data/configdb` - Configuration files

## 🛠️ Lệnh hữu ích

### Xem logs realtime
```bash
docker-compose logs -f mongodb
```

### Truy cập MongoDB Shell (Admin)
```bash
docker exec -it todo-mongodb-dev mongosh -u admin -p adminpassword123 --authenticationDatabase admin
```

### Truy cập MongoDB Shell (App User)
```bash
docker exec -it todo-mongodb-dev mongosh -u todoapp -p todopassword123 --authenticationDatabase todolist
```

### Kiểm tra users và databases
```bash
# Trong mongosh với admin user
use admin
db.runCommand({usersInfo: 1})

# Liệt kê databases
show dbs

# Chuyển sang todolist database
use todolist
show collections
```

## 💾 Backup & Restore

### Backup Database
```bash
# Backup toàn bộ
docker exec todo-mongodb-dev mongodump --uri="mongodb://admin:adminpassword123@localhost:27017/?authSource=admin" --out=/backup

# Backup chỉ todolist database
docker exec todo-mongodb-dev mongodump --uri="mongodb://todoapp:todopassword123@localhost:27017/todolist" --out=/backup
```

### Restore Database
```bash
docker exec todo-mongodb-dev mongorestore --uri="mongodb://admin:adminpassword123@localhost:27017/?authSource=admin" /backup
```

## 🔍 Health Check & Monitoring

### Kiểm tra trạng thái container
```bash
docker-compose ps
```

### Kiểm tra health của MongoDB
```bash
docker exec todo-mongodb-dev mongosh --eval "db.adminCommand('ping')" -u admin -p adminpassword123 --authenticationDatabase admin
```

### Monitor resource usage
```bash
docker stats todo-mongodb-dev
```

## 🚨 Troubleshooting

### Port 27017 đã được sử dụng
```bash
# Tìm process đang dùng port
sudo lsof -i :27017

# Dừng MongoDB service nếu có
sudo service mongod stop
```

### Container không khởi động được
```bash
# Xem logs chi tiết
docker-compose logs mongodb

# Xóa container cũ và tạo mới
docker-compose down
docker-compose up -d
```

### Reset hoàn toàn
```bash
# Dừng và xóa tất cả
docker-compose down -v

# Xóa images cũ
docker system prune -f

# Khởi động lại
docker-compose up -d
```

### Lỗi authentication
```bash
# Kiểm tra users trong database
docker exec -it todo-mongodb-dev mongosh -u admin -p adminpassword123 --authenticationDatabase admin
> use todolist
> db.getUsers()
```

## 📝 Notes quan trọng

1. **Authentication**: Database được bảo vệ bằng password, không thể truy cập anonymous
2. **Data Persistence**: Dữ liệu được lưu trong Docker volumes, không mất khi restart container
3. **Security**: Sử dụng separate users cho admin và application
4. **Development Only**: Cấu hình này chỉ dành cho development, không dùng cho production
5. **Connection**: Backend application phải sử dụng connection string có username/password

## 🔗 File liên quan

- `docker-compose.yml`: Cấu hình Docker container
- `init-mongo.js`: Script khởi tạo users và database
- `.env`: Environment variables cho MongoDB
- `../backend/.env`: Connection string cho backend application
