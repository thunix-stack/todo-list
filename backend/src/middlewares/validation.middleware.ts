import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Generic validation middleware
export const validateRequest = (schema: {
  body?: z.ZodSchema;
  query?: z.ZodSchema;
  params?: z.ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      // Validate query parameters
      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query);
        req.query = parsedQuery as any;
      }

      // Validate route parameters
      if (schema.params) {
        const parsedParams = schema.params.parse(req.params);
        req.params = parsedParams as any;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err: any) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          message: "Validation error",
          errors: errorMessages,
        });
      }

      return res.status(500).json({
        message: "Internal server error during validation",
      });
    }
  };
};

// Specific validation middlewares for tasks
export const validateCreateTask = validateRequest({
  body: z.object({
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
  }),
});

export const validateUpdateTask = validateRequest({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title cannot be more than 100 characters")
      .trim()
      .optional(),
    description: z
      .string()
      .max(500, "Description cannot be more than 500 characters")
      .trim()
      .optional(),
    completed: z.boolean().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z
      .string()
      .datetime("Invalid date format")
      .transform((str) => new Date(str))
      .optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid task ID format"),
  }),
});

export const validateGetTasks = validateRequest({
  query: z.object({
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
  }),
});

export const validateTaskId = validateRequest({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid task ID format"),
  }),
});
