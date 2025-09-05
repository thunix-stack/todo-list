import dotenv from "dotenv";
import express, { type Application, type Request, type Response } from "express";
import connectDB from "./config/database.js";
import taskRoutes from "./routes/task.routes.js";
import {
  corsMiddleware,
  requestLogger,
  errorHandler,
  notFoundHandler,
  validateRequest,
  rateLimiter,
  healthCheck,
} from "./middlewares/middlewares.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(corsMiddleware);
app.use(requestLogger);
app.use(rateLimiter(100, 15 * 60 * 1000)); // 100 requests per 15 minutes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(validateRequest);

// Health check route
app.get("/health", healthCheck);

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Todo App Backend with Express + TypeScript 🚀");
});

// Error handling middlewares (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
