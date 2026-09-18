"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArtistSchema = exports.onboardArtistSchema = void 0;
const zod_1 = require("zod");
exports.onboardArtistSchema = zod_1.z.object({
    body: zod_1.z.object({
        displayName: zod_1.z
            .string()
            .trim()
            .min(2, "Display name must be at least 2 characters")
            .max(120, "Display name cannot exceed 120 characters"),
        bio: zod_1.z
            .string()
            .trim()
            .max(2000, "Bio cannot exceed 2000 characters")
            .optional(),
        location: zod_1.z
            .string()
            .trim()
            .max(120, "Location cannot exceed 120 characters")
            .optional(),
        websiteUrl: zod_1.z
            .string()
            .trim()
            .url("Website URL must be a valid URL")
            .optional(),
        instagramUrl: zod_1.z
            .string()
            .trim()
            .url("Instagram URL must be a valid URL")
            .optional(),
        tiktokUrl: zod_1.z
            .string()
            .trim()
            .url("TikTok URL must be a valid URL")
            .optional(),
        portfolioUrl: zod_1.z
            .string()
            .trim()
            .url("Portfolio URL must be a valid URL")
            .optional(),
    }),
});
exports.updateArtistSchema = zod_1.z.object({
    body: zod_1.z.object({
        displayName: zod_1.z
            .string()
            .trim()
            .min(2, "Display name must be at least 2 characters")
            .max(120, "Display name cannot exceed 120 characters")
            .optional(),
        bio: zod_1.z
            .string()
            .trim()
            .max(2000, "Bio cannot exceed 2000 characters")
            .nullable()
            .optional(),
        location: zod_1.z
            .string()
            .trim()
            .max(120, "Location cannot exceed 120 characters")
            .nullable()
            .optional(),
        websiteUrl: zod_1.z
            .string()
            .trim()
            .url("Website URL must be a valid URL")
            .nullable()
            .optional(),
        instagramUrl: zod_1.z
            .string()
            .trim()
            .url("Instagram URL must be a valid URL")
            .nullable()
            .optional(),
        tiktokUrl: zod_1.z
            .string()
            .trim()
            .url("TikTok URL must be a valid URL")
            .nullable()
            .optional(),
        portfolioUrl: zod_1.z
            .string()
            .trim()
            .url("Portfolio URL must be a valid URL")
            .nullable()
            .optional(),
    }),
});
//# sourceMappingURL=artist.validation.js.map