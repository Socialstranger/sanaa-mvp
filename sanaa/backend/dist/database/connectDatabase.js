"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const database_1 = __importDefault(require("../config/database"));
const InitModel_1 = require("./InitModel");
const connectDatabase = async () => {
    try {
        (0, InitModel_1.initModels)();
        await database_1.default.authenticate();
        console.log("✅ PostgreSQL connected successfully");
        if (process.env.NODE_ENV === "development") {
            await database_1.default.sync({
                alter: false,
            });
            console.log("✅ Database models synchronized");
        }
    }
    catch (error) {
        console.error("❌ PostgreSQL connection failed");
        console.error(error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=connectDatabase.js.map