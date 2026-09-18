"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const notfound_middleware_1 = require("./middleware/notfound.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const artist_routes_1 = __importDefault(require("./modules/artists/artist.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/health", health_routes_1.default);
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/test", test_routes_1.default);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/artists", artist_routes_1.default);
app.use(notfound_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map