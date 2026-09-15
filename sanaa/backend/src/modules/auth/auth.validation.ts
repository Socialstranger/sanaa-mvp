import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(120, "Name cannot exceed 120 characters"),

    email: z
      .string()
      .trim()
      .email("A valid email is required")
      .transform((value) =>
        value.toLowerCase()
      ),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .max(
        72,
        "Password cannot exceed 72 characters"
      )
      .regex(
        /[A-Za-z]/,
        "Password must contain at least one letter"
      )
      .regex(
        /\d/,
        "Password must contain at least one number"
      ),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email("A valid email is required")
      .transform((value) =>
        value.toLowerCase()
      ),

    password: z
      .string()
      .min(1, "Password is required"),
  }),
});