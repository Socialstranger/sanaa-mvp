"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
}
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development"
        ? console.log
        : false,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map