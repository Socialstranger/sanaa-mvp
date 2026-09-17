

import Artwork from "./artwork.model";
import ArtistProfile from "../artists/artist.model";
import AppError from "../../utils/AppError";

interface CreateArtworkInput {
  title: string;
  description?: string;
  imageUrl: string;
  price?: number;
  category?: string;
  medium?: string;
  yearCreated?: number;
  isForSale?: boolean;
  status?:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";
}

export const createArtwork = async (
  userId: string,
  input: CreateArtworkInput
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

  const artwork =
    await Artwork.create({
      artistId: artistProfile.id,
      title: input.title,
      description:
        input.description ?? null,
      imageUrl: input.imageUrl,
      price: input.price ?? null,
      currency: "KES",
      category:
        input.category ?? null,
      medium:
        input.medium ?? null,
      yearCreated:
        input.yearCreated ?? null,
      isForSale:
        input.isForSale ?? false,
      status:
        input.status ?? "PUBLISHED",
    });

  return artwork;
};
export const getPublicArtworks =
  async () => {
    const artworks =
      await Artwork.findAll({
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

        order: [
          ["createdAt", "DESC"],
        ],
      });

    return artworks;
  };
  export const getPublicArtworkById =
  async (artworkId: string) => {
    const artwork =
      await Artwork.findOne({
        where: {
          id: artworkId,
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
      });

    if (!artwork) {
      throw new AppError(
        "Artwork not found",
        404
      );
    }

    return artwork;
  };
  export const getMyArtworks =
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

    const artworks =
      await Artwork.findAll({
        where: {
          artistId: artistProfile.id,
        },

        order: [
          ["createdAt", "DESC"],
        ],
      });

    return artworks;
  };
  const getArtistArtwork =
  async (
    userId: string,
    artworkId: string
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

    const artwork =
      await Artwork.findOne({
        where: {
          id: artworkId,
          artistId: artistProfile.id,
        },
      });

    if (!artwork) {
      throw new AppError(
        "Artwork not found",
        404
      );
    }

    return artwork;
  };
  interface UpdateArtworkInput {
    title?: string;
    description?: string | null;
    imageUrl?: string;
    price?: number | null;
    category?: string | null;
    medium?: string | null;
    yearCreated?: number | null;
    isForSale?: boolean;
    status?:
      | "DRAFT"
      | "PUBLISHED"
      | "ARCHIVED";
  }
  
  export const updateArtwork =
    async (
      userId: string,
      artworkId: string,
      input: UpdateArtworkInput
    ) => {
      const artwork =
        await getArtistArtwork(
          userId,
          artworkId
        );
  
      if (
        input.title !== undefined
      ) {
        artwork.title = input.title;
      }
  
      if (
        input.description !== undefined
      ) {
        artwork.description =
          input.description;
      }
  
      if (
        input.imageUrl !== undefined
      ) {
        artwork.imageUrl =
          input.imageUrl;
      }
  
      if (
        input.price !== undefined
      ) {
        artwork.price = input.price;
      }
  
      if (
        input.category !== undefined
      ) {
        artwork.category =
          input.category;
      }
  
      if (
        input.medium !== undefined
      ) {
        artwork.medium =
          input.medium;
      }
  
      if (
        input.yearCreated !== undefined
      ) {
        artwork.yearCreated =
          input.yearCreated;
      }
  
      if (
        input.isForSale !== undefined
      ) {
        artwork.isForSale =
          input.isForSale;
      }
  
      if (
        input.status !== undefined
      ) {
        artwork.status =
          input.status;
      }
  
      await artwork.save();
  
      return artwork;
    };
    export const deleteArtwork =
  async (
    userId: string,
    artworkId: string
  ) => {
    const artwork =
      await getArtistArtwork(
        userId,
        artworkId
      );

    await artwork.destroy();
  };