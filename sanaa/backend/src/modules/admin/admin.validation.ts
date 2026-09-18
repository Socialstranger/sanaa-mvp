import { z } from "zod";

export const getUsersQuerySchema =
  z.object({
    query: z.object({
      search: z
        .string()
        .trim()
        .min(
          1,
          "Search term cannot be empty"
        )
        .max(
          100,
          "Search term cannot exceed 100 characters"
        )
        .optional(),

      role: z
        .enum([
          "USER",
          "ARTIST",
          "ADMIN",
        ])
        .optional(),

      page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),

      limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20),
    }),
  });
  export const updateUserRoleSchema =
  z.object({
    body: z.object({
      role: z.enum([
        "USER",
        "ARTIST",
        "ADMIN",
      ]),
    }),
  });
  export const getAdminArtworksQuerySchema =
  z.object({
    query: z.object({
      search: z
        .string()
        .trim()
        .min(1)
        .max(100)
        .optional(),

      status: z
        .enum([
          "DRAFT",
          "PUBLISHED",
          "ARCHIVED",
        ])
        .optional(),

      page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),

      limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20),
    }),
  });
  export const updateArtworkStatusSchema =
  z.object({
    body: z.object({
      status: z.enum([
        "DRAFT",
        "PUBLISHED",
        "ARCHIVED",
      ]),
    }),
  });
  export const getAdminInquiriesQuerySchema =
  z.object({
    query: z.object({
      status: z
        .enum([
          "NEW",
          "CONTACTED",
          "CONVERTED",
          "CLOSED",
        ])
        .optional(),

      page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),

      limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20),
    }),
  });
  export const updateInquiryStatusSchema =
  z.object({
    params: z.object({
      id: z
        .string()
        .uuid(
          "Inquiry ID must be a valid UUID"
        ),
    }),

    body: z.object({
      status: z.enum([
        "NEW",
        "CONTACTED",
        "CONVERTED",
        "CLOSED",
      ]),
    }),
  });
  export const getAdminInquiryByIdSchema =
  z.object({
    params: z.object({
      id: z
        .string()
        .uuid(
          "Inquiry ID must be a valid UUID"
        ),
    }),
  });
  export const getAdminArtistByIdSchema =
  z.object({
    params: z.object({
      id: z
        .string()
        .uuid(
          "Artist ID must be a valid UUID"
        ),
    }),
  });
  export const getAdminArtworkByIdSchema =
  z.object({
    params: z.object({
      id: z
        .string()
        .uuid(
          "Artwork ID must be a valid UUID"
        ),
    }),
  });