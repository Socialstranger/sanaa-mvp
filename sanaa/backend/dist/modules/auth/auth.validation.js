"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(120, "Name cannot exceed 120 characters"),
        email: zod_1.z
            .string()
            .trim()
            .email("A valid email is required")
            .transform((value) => value.toLowerCase()),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password cannot exceed 72 characters")
            .regex(/[A-Za-z]/, "Password must contain at least one letter")
            .regex(/\d/, "Password must contain at least one number"),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .trim()
            .email("A valid email is required")
            .transform((value) => value.toLowerCase()),
        password: zod_1.z
            .string()
            .min(1, "Password is required"),
    }),
});
//# sourceMappingURL=auth.validation.js.map