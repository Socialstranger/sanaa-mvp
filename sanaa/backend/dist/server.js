"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const connectDatabase_1 = require("./database/connectDatabase");
const PORT = Number(process.env.PORT) || 5000;
const startServer = async () => {
    try {
        await (0, connectDatabase_1.connectDatabase)();
        app_1.default.listen(PORT, () => {
            console.log(`
🚀 Sanaa API started

Environment: ${process.env.NODE_ENV || "development"}
Port: ${PORT}
URL: http://localhost:${PORT}
Health: http://localhost:${PORT}/api/v1/health
      `);
        });
    }
    catch (error) {
        console.error("❌ Failed to start Sanaa API");
        console.error(error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map