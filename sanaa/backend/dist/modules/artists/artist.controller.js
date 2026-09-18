"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyArtistProfile = exports.getMyArtistProfile = exports.onboard = void 0;
const artist_service_1 = require("./artist.service");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const onboard = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const result = await (0, artist_service_1.onboardArtist)(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: "Artist profile created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.onboard = onboard;
const getMyArtistProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const artistProfile = await (0, artist_service_1.getArtistProfile)(req.user.id);
        res.status(200).json({
            success: true,
            data: {
                artistProfile,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyArtistProfile = getMyArtistProfile;
const updateMyArtistProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.default("Authentication required", 401);
        }
        const artistProfile = await (0, artist_service_1.updateArtistProfile)(req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Artist profile updated successfully",
            data: {
                artistProfile,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMyArtistProfile = updateMyArtistProfile;
//# sourceMappingURL=artist.controller.js.map