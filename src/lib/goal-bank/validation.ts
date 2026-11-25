import { z } from "zod";

export const createGoalSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Goal title is required.")
    .max(150, "Goal title cannot exceed 150 characters."),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .optional()
    .nullable(),

  tag: z.enum([
    "DEVELOPMENT",
    "LEARNING",
    "HEALTH",
    "WORK",
    "PERSONAL",
    "READING",
    "FINANCE",
    "OTHER",
  ]),

  priority: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export const planGoalSchema = z.object({
  plannedDate: z.iso.date(),
});

export const subtaskSchema = z.object({
  title: z.string().trim().min(1, "Subtask title is required.").max(150),
});

export type CreateGoalFormValues = z.infer<typeof createGoalSchema>;
