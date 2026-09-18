"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const getUserProfile = async (userId) => {
    const user = await user_model_1.default.findByPk(userId);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    return user;
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (userId, input) => {
    const user = await user_model_1.default.findByPk(userId);
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    if (input.name !== undefined) {
        user.name = input.name;
    }
    if (input.avatarUrl !== undefined) {
        user.avatarUrl = input.avatarUrl;
    }
    await user.save();
    return user;
};
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=user.service.js.map