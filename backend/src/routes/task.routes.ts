import { Router } from "express";
import { getTasks, createTask } from "../controllers/task.controller";

const router = Router();

// GET all tasks
router.get("/", getTasks);

// POST new task
router.post("/", createTask);

export default router;
