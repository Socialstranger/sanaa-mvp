"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = void 0;
const user_model_1 = __importDefault(require("../modules/users/user.model"));
const artist_model_1 = __importDefault(require("../modules/artists/artist.model"));
const initModels = () => {
    user_model_1.default.hasOne(artist_model_1.default, {
        foreignKey: "userId",
        as: "artistProfile",
        onDelete: "CASCADE",
    });
    artist_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: "userId",
        as: "user",
    });
};
exports.initModels = initModels;
//# sourceMappingURL=InitModel.js.map