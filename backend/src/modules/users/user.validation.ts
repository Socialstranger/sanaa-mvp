import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(120, "Name cannot exceed 120 characters")
      .optional(),

    avatarUrl: z
      .string()
      .trim()
      .url("Avatar URL must be a valid URL")
      .max(500, "Avatar URL cannot exceed 500 characters")
      .nullable()
      .optional(),
  }),
});