"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArtistProfile = exports.getArtistProfile = exports.onboardArtist = void 0;
const database_1 = __importDefault(require("../../config/database"));
const user_model_1 = __importDefault(require("../users/user.model"));
const artist_model_1 = __importDefault(require("./artist.model"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const onboardArtist = async (userId, input) => {
    const transaction = await database_1.default.transaction();
    try {
        const user = await user_model_1.default.findByPk(userId, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (!user) {
            throw new AppError_1.default("User not found", 404);
        }
        if (user.role === "ARTIST") {
            throw new AppError_1.default("You are already an artist", 409);
        }
        if (user.role === "ADMIN") {
            throw new AppError_1.default("Admin accounts cannot be converted into artist accounts", 400);
        }
        const existingProfile = await artist_model_1.default.findOne({
            where: {
                userId,
            },
            transaction,
        });
        if (existingProfile) {
            throw new AppError_1.default("Artist profile already exists", 409);
        }
        const artistProfile = await artist_model_1.default.create({
            userId,
            displayName: input.displayName,
            bio: input.bio ?? null,
            location: input.location ?? null,
            websiteUrl: input.websiteUrl ?? null,
            instagramUrl: input.instagramUrl ?? null,
            tiktokUrl: input.tiktokUrl ?? null,
            portfolioUrl: input.portfolioUrl ?? null,
        }, {
            transaction,
        });
        user.role = "ARTIST";
        await user.save({
            transaction,
        });
        await transaction.commit();
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
            artistProfile,
        };
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.onboardArtist = onboardArtist;
const getArtistProfile = async (userId) => {
    const artistProfile = await artist_model_1.default.findOne({
        where: {
            userId,
        },
    });
    if (!artistProfile) {
        throw new AppError_1.default("Artist profile not found", 404);
    }
    return artistProfile;
};
exports.getArtistProfile = getArtistProfile;
const updateArtistProfile = async (userId, input) => {
    const artistProfile = await artist_model_1.default.findOne({
        where: {
            userId,
        },
    });
    if (!artistProfile) {
        throw new AppError_1.default("Artist profile not found", 404);
    }
    if (input.displayName !== undefined) {
        artistProfile.displayName =
            input.displayName;
    }
    if (input.bio !== undefined) {
        artistProfile.bio = input.bio;
    }
    if (input.location !== undefined) {
        artistProfile.location =
            input.location;
    }
    if (input.websiteUrl !== undefined) {
        artistProfile.websiteUrl =
            input.websiteUrl;
    }
    if (input.instagramUrl !== undefined) {
        artistProfile.instagramUrl =
            input.instagramUrl;
    }
    if (input.tiktokUrl !== undefined) {
        artistProfile.tiktokUrl =
            input.tiktokUrl;
    }
    if (input.portfolioUrl !== undefined) {
        artistProfile.portfolioUrl =
            input.portfolioUrl;
    }
    await artistProfile.save();
    return artistProfile;
};
exports.updateArtistProfile = updateArtistProfile;
//# sourceMappingURL=artist.service.js.map