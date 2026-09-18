"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(120, "Name cannot exceed 120 characters")
            .optional(),
        avatarUrl: zod_1.z
            .string()
            .trim()
            .url("Avatar URL must be a valid URL")
            .max(500, "Avatar URL cannot exceed 500 characters")
            .nullable()
            .optional(),
    }),
});
//# sourceMappingURL=user.validation.js.map