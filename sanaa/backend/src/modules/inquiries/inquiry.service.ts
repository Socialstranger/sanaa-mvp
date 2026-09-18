import Inquiry from "./inquiries.model";
import Artwork from "../artworks/artwork.model";
import ArtistProfile from "../artists/artist.model";
import AppError from "../../utils/AppError";

export const createInquiry =
  async (
    userId: string,
    input: {
      artworkId: string;
      name: string;
      email: string;
      phone?: string;
      message: string;
      budget?: number;
    }
  ) => {
    const artwork =
      await Artwork.findOne({
        where: {
          id: input.artworkId,
          status: "PUBLISHED",
        },
      });

    if (!artwork) {
      throw new AppError(
        "Artwork not found",
        404
      );
    }

    const inquiry =
      await Inquiry.create({
        userId,
        artworkId: input.artworkId,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        message: input.message,
        budget:
          input.budget ?? null,
        status: "NEW",
      });

    return inquiry;
  };

export const getMyInquiries =
  async (userId: string) => {
    return Inquiry.findAll({
      where: {
        userId,
      },

      include: [
        {
          model: Artwork,
          as: "artwork",

          attributes: [
            "id",
            "title",
            "imageUrl",
            "price",
            "currency",
            "category",
            "medium",
          ],

          include: [
            {
              model: ArtistProfile,
              as: "artist",

              attributes: [
                "id",
                "displayName",
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
  };

export const getInquiryById =
  async (
    userId: string,
    inquiryId: string
  ) => {
    const inquiry =
      await Inquiry.findOne({
        where: {
          id: inquiryId,
          userId,
        },

        include: [
          {
            model: Artwork,
            as: "artwork",

            include: [
              {
                model: ArtistProfile,
                as: "artist",

                attributes: [
                  "id",
                  "displayName",
                  "location",
                ],
              },
            ],
          },
        ],
      });

    if (!inquiry) {
      throw new AppError(
        "Inquiry not found",
        404
      );
    }

    return inquiry;
  };