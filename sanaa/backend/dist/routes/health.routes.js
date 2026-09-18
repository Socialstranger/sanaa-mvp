"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const router = (0, express_1.Router)();
router.get("/", async (_req, res) => {
    try {
        await database_1.default.authenticate();
        res.status(200).json({
            success: true,
            message: "Sanaa API is healthy",
            data: {
                service: "sanaa-api",
                api: "healthy",
                database: "connected",
                environment: process.env.NODE_ENV || "development",
            },
        });
    }
    catch {
        res.status(503).json({
            success: false,
            message: "Sanaa API is unhealthy",
            data: {
                service: "sanaa-api",
                api: "healthy",
                database: "disconnected",
            },
        });
    }
});
exports.default = router;
//# sourceMappingURL=health.routes.js.map