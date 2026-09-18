"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../users/user.model"));
const jwt_1 = require("../../utils/jwt");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const registerUser = async (input) => {
    const existingUser = await user_model_1.default.unscoped().findOne({
        where: {
            email: input.email,
        },
    });
    if (existingUser) {
        throw new AppError_1.default("An account with this email already exists", 409);
    }
    const passwordHash = await bcrypt_1.default.hash(input.password, 12);
    const user = await user_model_1.default.create({
        name: input.name,
        email: input.email,
        passwordHash,
        role: "USER",
    });
    const token = (0, jwt_1.signToken)({
        userId: user.id,
        role: user.role,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
        },
        token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (input) => {
    const user = await user_model_1.default.scope("withPassword").findOne({
        where: {
            email: input.email,
        },
    });
    if (!user) {
        throw new AppError_1.default("Invalid email or password", 401);
    }
    const passwordMatches = await bcrypt_1.default.compare(input.password, user.passwordHash);
    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }
    const token = (0, jwt_1.signToken)({
        userId: user.id,
        role: user.role,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
        },
        token,
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map