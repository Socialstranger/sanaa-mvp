"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMe = exports.getMe = void 0;
const user_service_1 = require("./user.service");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const user = await (0, user_service_1.getUserProfile)(req.user.id);
        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
const updateMe = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const user = await (0, user_service_1.updateUserProfile)(req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMe = updateMe;
//# sourceMappingURL=user.controller.js.map