# 📝 Todo List Application

Một ứng dụng Todo List hoàn chỉnh được xây dựng với **Express.js + TypeScript** (Backend) và **Next.js + TypeScript** (Frontend).

## 🏗️ Kiến trúc Project

```
todo-list/
├── backend/                 # Express.js API Server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Custom middlewares  
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Entry point
│   ├── .env.example        # Environment template
│   └── package.json
├── frontend/               # Next.js React App
│   ├── src/
│   │   └── app/           # App Router (Next.js 13+)
│   ├── public/            # Static assets
│   └── package.json
├── docker-compose.yml     # Docker configuration
└── .gitignore            # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ 
- npm hoặc yarn
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd todo-list
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Backend sẽ chạy tại: http://localhost:5000

### 3. Setup Frontend  
```bash
cd frontend
npm install
npm run dev
```
Frontend sẽ chạy tại: http://localhost:3000

### 4. Chạy với Docker (Optional)
```bash
docker-compose up -d
```

## 📡 API Documentation

### Health Check
- **GET** `/health` - Kiểm tra trạng thái server

### Tasks API
- **GET** `/api/tasks` - Lấy danh sách tasks
- **POST** `/api/tasks` - Tạo task mới
- **PUT** `/api/tasks/:id` - Cập nhật task
- **DELETE** `/api/tasks/:id` - Xóa task

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Custom Middlewares** - Logging, validation, error handling

### Frontend
- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **React** - UI library

## 🔧 Development

### Backend Scripts
```bash
npm run dev      # Development với hot reload
npm run build    # Build TypeScript
npm start        # Production server
npm run stop     # Dừng server
```

### Frontend Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint check
```

## 📁 Features

### Backend Features
- ✅ RESTful API design
- ✅ TypeScript support
- ✅ CORS configuration
- ✅ Request logging
- ✅ Error handling
- ✅ Rate limiting
- ✅ Request validation
- ✅ Health check endpoint
- ✅ Environment-based config

### Frontend Features  
- ✅ Next.js 14 App Router
- ✅ TypeScript support
- ✅ Responsive design
- ✅ Modern React patterns
- ✅ ESLint + Prettier
- ✅ Hot reload development

## 🌍 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### Frontend
Next.js tự động load environment variables từ `.env.local`

## 🚨 Git Workflow

Project sử dụng Git repository duy nhất ở root level:

```bash
# Thêm changes
git add .
git commit -m "feature: description"

# Push code
git push origin main
```

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**thuannv201** - Full Stack Developer

---

⭐ **Star project này nếu bạn thấy hữu ích!**