import { z } from "zod";

export const onboardArtistSchema =
  z.object({
    body: z.object({
      displayName: z
        .string()
        .trim()
        .min(
          2,
          "Display name must be at least 2 characters"
        )
        .max(
          120,
          "Display name cannot exceed 120 characters"
        ),

      bio: z
        .string()
        .trim()
        .max(
          2000,
          "Bio cannot exceed 2000 characters"
        )
        .optional(),

      location: z
        .string()
        .trim()
        .max(
          120,
          "Location cannot exceed 120 characters"
        )
        .optional(),

      websiteUrl: z
        .string()
        .trim()
        .url(
          "Website URL must be a valid URL"
        )
        .optional(),

      instagramUrl: z
        .string()
        .trim()
        .url(
          "Instagram URL must be a valid URL"
        )
        .optional(),

      tiktokUrl: z
        .string()
        .trim()
        .url(
          "TikTok URL must be a valid URL"
        )
        .optional(),

      portfolioUrl: z
        .string()
        .trim()
        .url(
          "Portfolio URL must be a valid URL"
        )
        .optional(),
    }),
  });

export const updateArtistSchema =
  z.object({
    body: z.object({
      displayName: z
        .string()
        .trim()
        .min(
          2,
          "Display name must be at least 2 characters"
        )
        .max(
          120,
          "Display name cannot exceed 120 characters"
        )
        .optional(),

      bio: z
        .string()
        .trim()
        .max(
          2000,
          "Bio cannot exceed 2000 characters"
        )
        .nullable()
        .optional(),

      location: z
        .string()
        .trim()
        .max(
          120,
          "Location cannot exceed 120 characters"
        )
        .nullable()
        .optional(),

      websiteUrl: z
        .string()
        .trim()
        .url(
          "Website URL must be a valid URL"
        )
        .nullable()
        .optional(),

      instagramUrl: z
        .string()
        .trim()
        .url(
          "Instagram URL must be a valid URL"
        )
        .nullable()
        .optional(),

      tiktokUrl: z
        .string()
        .trim()
        .url(
          "TikTok URL must be a valid URL"
        )
        .nullable()
        .optional(),

      portfolioUrl: z
        .string()
        .trim()
        .url(
          "Portfolio URL must be a valid URL"
        )
        .nullable()
        .optional(),
    }),
  });