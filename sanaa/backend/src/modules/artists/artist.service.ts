import {
    Op,
    WhereOptions,
  } from "sequelize";

import sequelize from "../../config/database";
import User from "../users/user.model";
import ArtistProfile from "./artist.model";
import AppError from "../../utils/AppError";

interface OnboardArtistInput {
  displayName: string;
  bio?: string;
  location?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  portfolioUrl?: string;
}


export const onboardArtist = async (
  userId: string,
  input: OnboardArtistInput
) => {
  const transaction =
    await sequelize.transaction();

  try {
    const user =
      await User.findByPk(
        userId,
        {
          transaction,
          lock: transaction.LOCK.UPDATE,
        }
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (user.role === "ARTIST") {
      throw new AppError(
        "You are already an artist",
        409
      );
    }

    if (user.role === "ADMIN") {
      throw new AppError(
        "Admin accounts cannot be converted into artist accounts",
        400
      );
    }

    const existingProfile =
      await ArtistProfile.findOne({
        where: {
          userId,
        },
        transaction,
      });

    if (existingProfile) {
      throw new AppError(
        "Artist profile already exists",
        409
      );
    }

    const artistProfile =
      await ArtistProfile.create(
        {
          userId,
          displayName:
            input.displayName,
          bio: input.bio ?? null,
          location:
            input.location ?? null,
          websiteUrl:
            input.websiteUrl ?? null,
          instagramUrl:
            input.instagramUrl ?? null,
          tiktokUrl:
            input.tiktokUrl ?? null,
          portfolioUrl:
            input.portfolioUrl ?? null,
        },
        {
          transaction,
        }
      );

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
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getArtistProfile =
  async (userId: string) => {
    const artistProfile =
      await ArtistProfile.findOne({
        where: {
          userId,
        },
      });

    if (!artistProfile) {
      throw new AppError(
        "Artist profile not found",
        404
      );
    }

    return artistProfile;
  };

interface UpdateArtistInput {
  displayName?: string;
  bio?: string | null;
  location?: string | null;
  websiteUrl?: string | null;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  portfolioUrl?: string | null;
}

export const updateArtistProfile =
  async (
    userId: string,
    input: UpdateArtistInput
  ) => {
    const artistProfile =
      await ArtistProfile.findOne({
        where: {
          userId,
        },
      });

    if (!artistProfile) {
      throw new AppError(
        "Artist profile not found",
        404
      );
    }

    if (
      input.displayName !== undefined
    ) {
      artistProfile.displayName =
        input.displayName;
    }

    if (input.bio !== undefined) {
      artistProfile.bio = input.bio;
    }

    if (
      input.location !== undefined
    ) {
      artistProfile.location =
        input.location;
    }

    if (
      input.websiteUrl !== undefined
    ) {
      artistProfile.websiteUrl =
        input.websiteUrl;
    }

    if (
      input.instagramUrl !== undefined
    ) {
      artistProfile.instagramUrl =
        input.instagramUrl;
    }

    if (
      input.tiktokUrl !== undefined
    ) {
      artistProfile.tiktokUrl =
        input.tiktokUrl;
    }

    if (
      input.portfolioUrl !== undefined
    ) {
      artistProfile.portfolioUrl =
        input.portfolioUrl;
    }

    await artistProfile.save();

    return artistProfile;
  };
  interface GetPublicArtistsInput {
    search?: string;
    location?: string;
    page: number;
    limit: number;
  }
  
  interface GetPublicArtistsInput {
    search?: string;
    location?: string;
    page: number;
    limit: number;
  }
  
  interface GetPublicArtistsInput {
    search?: string;
    location?: string;
    page: number;
    limit: number;
  }
  
  export const getPublicArtists = async (
    input: GetPublicArtistsInput
  ) => {
    const {
      search,
      location,
      page,
      limit,
    } = input;
  
    const where = {
      ...(search
        ? {
            [Op.or]: [
              {
                displayName: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                bio: {
                  [Op.iLike]: `%${search}%`,
                },
              },
            ],
          }
        : {}),
  
      ...(location
        ? {
            location: {
              [Op.iLike]: `%${location}%`,
            },
          }
        : {}),
    };
  
    const offset =
      (page - 1) * limit;
  
    const {
      rows,
      count,
    } =
      await ArtistProfile.findAndCountAll({
        where,
  
        attributes: [
          "id",
          "userId",
          "displayName",
          "bio",
          "location",
          "websiteUrl",
          "instagramUrl",
          "tiktokUrl",
          "portfolioUrl",
          "createdAt",
          "updatedAt",
        ],
  
        order: [
          ["createdAt", "DESC"],
        ],
  
        limit,
        offset,
  
        distinct: true,
      });
  
    const totalPages =
      Math.ceil(count / limit);
  
    return {
      artists: rows,
  
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages,
        hasNextPage:
          page < totalPages,
        hasPreviousPage:
          page > 1,
      },
    };
  };