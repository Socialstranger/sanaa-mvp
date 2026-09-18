"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = __importDefault(require("../modules/users/user.model"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const protect = async (req, _res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization ||
            !authorization.startsWith("Bearer ")) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const payload = (0, jwt_1.verifyToken)(token);
        const user = await user_model_1.default.findByPk(payload.userId);
        if (!user) {
            throw new AppError_1.default("User no longer exists", 401);
        }
        req.user = {
            id: user.id,
            role: user.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof AppError_1.default) {
            next(error);
            return;
        }
        next(new AppError_1.default("Invalid or expired token", 401));
    }
};
exports.protect = protect;
const authorize = (...roles) => (req, _res, next) => {
    if (!req.user) {
        next(new AppError_1.default("Authentication required", 401));
        return;
    }
    if (!roles.includes(req.user.role)) {
        next(new AppError_1.default("You do not have permission to perform this action", 403));
        return;
    }
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map