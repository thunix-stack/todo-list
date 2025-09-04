import type { Request, Response } from "express";

let tasks: any[] = []; // tạm dùng mảng trong memory

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
};
