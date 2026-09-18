import { z } from "zod";

export const createInquirySchema =
  z.object({
    body: z.object({
      artworkId: z
        .string()
        .uuid(
          "Artwork ID must be a valid UUID"
        ),

      name: z
        .string()
        .trim()
        .min(
          2,
          "Name must be at least 2 characters"
        )
        .max(
          120,
          "Name cannot exceed 120 characters"
        ),

      email: z
        .string()
        .trim()
        .email(
          "Email must be valid"
        ),

      phone: z
        .string()
        .trim()
        .max(
          30,
          "Phone number cannot exceed 30 characters"
        )
        .optional(),

      message: z
        .string()
        .trim()
        .min(
          10,
          "Message must be at least 10 characters"
        )
        .max(
          5000,
          "Message cannot exceed 5000 characters"
        ),

      budget: z
        .number()
        .nonnegative(
          "Budget cannot be negative"
        )
        .optional(),
    }),
  });

export const updateInquiryStatusSchema =
  z.object({
    body: z.object({
      status: z.enum([
        "NEW",
        "CONTACTED",
        "CONVERTED",
        "CLOSED",
      ]),
    }),
  });