"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        set(value) {
            this.setDataValue("email", value.trim().toLowerCase());
        },
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash",
    },
    role: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "USER",
        validate: {
            isIn: [
                ["USER", "ARTIST", "ADMIN"],
            ],
        },
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: "avatar_url",
    },
}, {
    sequelize: database_1.default,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ["email"],
        },
    ],
    defaultScope: {
        attributes: {
            exclude: ["passwordHash"],
        },
    },
    scopes: {
        withPassword: {
            attributes: {
                include: ["passwordHash"],
            },
        },
    },
});
exports.default = User;
//# sourceMappingURL=user.model.js.map