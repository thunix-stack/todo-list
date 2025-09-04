# Backend Todo List API

## 📋 Mô tả
Backend service cho ứng dụng Todo List được xây dựng với Express.js và TypeScript.

## 🚀 Cài đặt và Chạy

### Prerequisites
- Node.js (v16 hoặc cao hơn)
- npm hoặc yarn

### Cài đặt Dependencies
```bash
npm install
```

### Cấu hình Environment
1. Sao chép file `.env.example` thành `.env`:
```bash
copy .env.example .env
```

2. Cập nhật các biến môi trường trong file `.env` theo nhu cầu của bạn.

### Chạy Development Server
```bash
npm run dev
```

### Build và Chạy Production
```bash
npm run build
npm start
```

## 🛠️ Scripts

- `npm run dev` - Chạy development server với hot reload
- `npm run build` - Build TypeScript thành JavaScript
- `npm start` - Chạy production server
- `npm run stop` - Dừng server đang chạy trên port 5000

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Kiểm tra trạng thái server

### Tasks
- **GET** `/api/tasks` - Lấy danh sách tasks
- **POST** `/api/tasks` - Tạo task mới
- **PUT** `/api/tasks/:id` - Cập nhật task
- **DELETE** `/api/tasks/:id` - Xóa task

## 🔧 Middlewares

### CORS
- Cho phép cross-origin requests từ frontend
- Cấu hình origin thông qua `CORS_ORIGIN` trong file `.env`

### Request Logger
- Ghi log tất cả HTTP requests
- Format: `[timestamp] METHOD URL - User-Agent`

### Rate Limiter
- Giới hạn số lượng requests từ một IP
- Mặc định: 100 requests per 15 phút

### Error Handler
- Xử lý errors một cách nhất quán
- Trả về JSON response với error details
- Ẩn stack trace trong production

### Validation
- Validate request body cho POST/PUT/PATCH requests
- Kiểm tra content type và body structure

## 📁 Cấu trúc Project

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Custom middlewares
│   ├── routes/         # Route definitions
│   └── index.ts        # Entry point
├── .env                # Environment variables (không commit)
├── .env.example        # Environment template
├── package.json        # Dependencies và scripts
└── tsconfig.json       # TypeScript configuration
```

## 🌍 Environment Variables

| Variable | Mô tả | Mặc định |
|----------|--------|----------|
| `PORT` | Port server chạy | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Frontend URL cho CORS | `http://localhost:3000` |
| `LOG_LEVEL` | Mức độ logging | `info` |

## 🔒 Security Features

- CORS protection
- Rate limiting
- Request validation
- Error handling không leak thông tin
- Environment-based configuration

## 📝 Logging

Server ghi log các thông tin sau:
- HTTP requests (method, URL, timestamp, user-agent)
- Server startup information
- Error messages
- Rate limiting violations

## 🚨 Error Handling

API trả về errors theo format nhất quán:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack (chỉ trong development)"
}
```

## 🤝 Contributing

1. Fork project
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request
