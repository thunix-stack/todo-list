import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../controllers/task.controller.js";
import {
  validateCreateTask,
  validateUpdateTask,
  validateGetTasks,
  validateTaskId,
} from "../middlewares/validation.middleware.js";

const router = Router();

// GET all tasks with filtering and pagination
router.get("/", validateGetTasks, getTasks);

// GET single task by ID
router.get("/:id", validateTaskId, getTask);

// POST new task
router.post("/", validateCreateTask, createTask);

// PUT update task by ID
router.put("/:id", validateUpdateTask, updateTask);

// PATCH toggle task completion
router.patch("/:id/toggle", validateTaskId, toggleTaskCompletion);

// DELETE task by ID
router.delete("/:id", validateTaskId, deleteTask);

export default router;
