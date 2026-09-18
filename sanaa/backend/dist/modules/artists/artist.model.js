"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const user_model_1 = __importDefault(require("../users/user.model"));
class ArtistProfile extends sequelize_1.Model {
    id;
    userId;
    displayName;
    bio;
    location;
    websiteUrl;
    instagramUrl;
    tiktokUrl;
    portfolioUrl;
    createdAt;
    updatedAt;
}
ArtistProfile.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        field: "user_id",
        references: {
            model: user_model_1.default,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    displayName: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false,
        field: "display_name",
    },
    bio: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: true,
    },
    websiteUrl: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "website_url",
    },
    instagramUrl: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "instagram_url",
    },
    tiktokUrl: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "tiktok_url",
    },
    portfolioUrl: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
        field: "portfolio_url",
    },
}, {
    sequelize: database_1.default,
    tableName: "artist_profiles",
    modelName: "ArtistProfile",
    timestamps: true,
    underscored: true,
});
exports.default = ArtistProfile;
//# sourceMappingURL=artist.model.js.map