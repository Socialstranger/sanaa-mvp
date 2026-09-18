import Favorite from "./favourite.model";
import Artwork from "../artworks/artwork.model";
import ArtistProfile from "../artists/artist.model";
import AppError from "../../utils/AppError";

export const addFavorite = async (
  userId: string,
  artworkId: string
) => {
  const artwork =
    await Artwork.findOne({
      where: {
        id: artworkId,
        status: "PUBLISHED",
      },
    });

  if (!artwork) {
    throw new AppError(
      "Artwork not found",
      404
    );
  }

  const existingFavorite =
    await Favorite.findOne({
      where: {
        userId,
        artworkId,
      },
    });

  if (existingFavorite) {
    throw new AppError(
      "Artwork is already in your favorites",
      409
    );
  }

  const favorite =
    await Favorite.create({
      userId,
      artworkId,
    });

  return favorite;
};

export const getMyFavorites =
  async (userId: string) => {
    const favorites =
      await Favorite.findAll({
        where: {
          userId,
        },

        include: [
          {
            model: Artwork,
            as: "artwork",

            where: {
              status: "PUBLISHED",
            },

            include: [
              {
                model: ArtistProfile,
                as: "artist",

                attributes: [
                  "id",
                  "userId",
                  "displayName",
                  "bio",
                  "location",
                ],
              },
            ],
          },
        ],

        order: [
          ["createdAt", "DESC"],
        ],
      });

    return favorites;
  };

export const removeFavorite =
  async (
    userId: string,
    artworkId: string
  ) => {
    const favorite =
      await Favorite.findOne({
        where: {
          userId,
          artworkId,
        },
      });

    if (!favorite) {
      throw new AppError(
        "Favorite not found",
        404
      );
    }

    await favorite.destroy();
  };