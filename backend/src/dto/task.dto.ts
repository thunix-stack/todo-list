import { z } from "zod";

// Base task schema với các validation rules
const baseTaskSchema = {
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot be more than 100 characters")
    .trim(),
  description: z
    .string()
    .max(500, "Description cannot be more than 500 characters")
    .trim()
    .optional(),
  completed: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z
    .string()
    .datetime("Invalid date format")
    .transform((str) => new Date(str))
    .optional(),
};

// DTO cho tạo task mới
export const createTaskSchema = z.object(baseTaskSchema);

// DTO cho cập nhật task (tất cả fields đều optional)
export const updateTaskSchema = z.object({
  title: baseTaskSchema.title.optional(),
  description: baseTaskSchema.description,
  completed: baseTaskSchema.completed.optional(),
  priority: baseTaskSchema.priority.optional(),
  dueDate: baseTaskSchema.dueDate,
});

// DTO cho query parameters
export const getTasksQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, "Page must be greater than 0"),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100"),
  completed: z
    .string()
    .optional()
    .transform((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return undefined;
    }),
  priority: z.enum(["low", "medium", "high"]).optional(),
  sortBy: z
    .enum(["title", "createdAt", "updatedAt", "dueDate", "priority"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// DTO cho task ID parameter
export const taskIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid task ID format"),
});

// Type exports từ các schemas
export type CreateTaskDTO = z.infer<typeof createTaskSchema>;
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;
export type GetTasksQueryDTO = z.infer<typeof getTasksQuerySchema>;
export type TaskIdDTO = z.infer<typeof taskIdSchema>;

// Response DTOs
export const taskResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const tasksListResponseSchema = z.object({
  data: z.array(taskResponseSchema),
  pagination: z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    itemsPerPage: z.number(),
  }),
});

export type TaskResponseDTO = z.infer<typeof taskResponseSchema>;
export type TasksListResponseDTO = z.infer<typeof tasksListResponseSchema>;
