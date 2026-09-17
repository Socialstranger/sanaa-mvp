import { z } from "zod";

export const createArtworkSchema =
  z.object({
    body: z.object({
      title: z
        .string()
        .trim()
        .min(
          2,
          "Title must be at least 2 characters"
        )
        .max(
          200,
          "Title cannot exceed 200 characters"
        ),

      description: z
        .string()
        .trim()
        .max(
          5000,
          "Description cannot exceed 5000 characters"
        )
        .optional(),

      imageUrl: z
        .string()
        .trim()
        .url(
          "Image URL must be a valid URL"
        )
        .max(
          1000,
          "Image URL cannot exceed 1000 characters"
        ),

      price: z
        .number()
        .nonnegative(
          "Price cannot be negative"
        )
        .optional(),

      category: z
        .string()
        .trim()
        .max(
          100,
          "Category cannot exceed 100 characters"
        )
        .optional(),

      medium: z
        .string()
        .trim()
        .max(
          150,
          "Medium cannot exceed 150 characters"
        )
        .optional(),

      yearCreated: z
        .number()
        .int()
        .min(
          1000,
          "Year created is invalid"
        )
        .max(
          new Date().getFullYear(),
          "Year created cannot be in the future"
        )
        .optional(),

      isForSale: z
        .boolean()
        .optional(),

      status: z
        .enum([
          "DRAFT",
          "PUBLISHED",
          "ARCHIVED",
        ])
        .optional(),
    }),
  });
  export const updateArtworkSchema =
  z.object({
    body: z.object({
      title: z
        .string()
        .trim()
        .min(
          2,
          "Title must be at least 2 characters"
        )
        .max(
          200,
          "Title cannot exceed 200 characters"
        )
        .optional(),

      description: z
        .string()
        .trim()
        .max(
          5000,
          "Description cannot exceed 5000 characters"
        )
        .nullable()
        .optional(),

      imageUrl: z
        .string()
        .trim()
        .url(
          "Image URL must be a valid URL"
        )
        .max(
          1000,
          "Image URL cannot exceed 1000 characters"
        )
        .optional(),

      price: z
        .number()
        .nonnegative(
          "Price cannot be negative"
        )
        .nullable()
        .optional(),

      category: z
        .string()
        .trim()
        .max(
          100,
          "Category cannot exceed 100 characters"
        )
        .nullable()
        .optional(),

      medium: z
        .string()
        .trim()
        .max(
          150,
          "Medium cannot exceed 150 characters"
        )
        .nullable()
        .optional(),

      yearCreated: z
        .number()
        .int()
        .min(
          1000,
          "Year created is invalid"
        )
        .max(
          new Date().getFullYear(),
          "Year created cannot be in the future"
        )
        .nullable()
        .optional(),

      isForSale: z
        .boolean()
        .optional(),

      status: z
        .enum([
          "DRAFT",
          "PUBLISHED",
          "ARCHIVED",
        ])
        .optional(),
    }),
  });