"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const errorHandler = (error, _req, res, _next) => {
    console.error(error);
    if (error instanceof AppError_1.default) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV ===
            "production"
            ? "Internal server error"
            : error.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map