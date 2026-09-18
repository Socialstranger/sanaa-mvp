"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const user_model_1 = __importDefault(require("../users/user.model"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const register = async (req, res, next) => {
    try {
        const result = await (0, auth_service_1.registerUser)(req.body);
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const result = await (0, auth_service_1.loginUser)(req.body);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const user = await user_model_1.default.findByPk(req.user.id);
        if (!user) {
            throw new AppError_1.default("User not found", 404);
        }
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
//# sourceMappingURL=auth.controller.js.map