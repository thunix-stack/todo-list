import type { Request, Response } from "express";
import Task from "../models/task.model.js";
import type { CreateTaskDTO, UpdateTaskDTO, GetTasksQueryDTO } from "../dto/task.dto.js";

// GET all tasks với filtering và pagination
export const getTasks = async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as GetTasksQueryDTO;
    const {
      page = 1,
      limit = 10,
      completed,
      priority,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    // Build filter object
    const filter: any = {};
    if (completed !== undefined) {
      filter.completed = completed;
    }
    if (priority) {
      filter.priority = priority;
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;

    const tasks = await Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      data: tasks,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// GET single task by ID
export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({
      message: "Error fetching task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// POST new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const taskData = req.body as CreateTaskDTO;

    const task = new Task({
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Error creating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// PUT update task by ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body as UpdateTaskDTO;

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    if (error instanceof Error && error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Error updating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// DELETE task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", data: task });
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({
      message: "Error deleting task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// PATCH toggle task completion
export const toggleTaskCompletion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    if (error instanceof Error && error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({
      message: "Error toggling task completion",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
