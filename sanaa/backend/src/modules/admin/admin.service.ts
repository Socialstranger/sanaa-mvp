import {
    Op,
  } from "sequelize";
  
  import User from "../users/user.model";
  import ArtistProfile from "../artists/artist.model";
  import Artwork from "../artworks/artwork.model";
  import Favorite from "../favourites/favourite.model";
  import Inquiry from "../inquiries/inquiries.model";
  
  import AppError from "../../utils/AppError";

  export const getDashboardStats =
  async () => {
    const [
      totalUsers,
      totalArtists,
      totalArtworks,
      publishedArtworks,
      draftArtworks,
      archivedArtworks,
      totalFavorites,
      totalInquiries,
      newInquiries,
    ] = await Promise.all([
      User.count(),

      User.count({
        where: {
          role: "ARTIST",
        },
      }),

      Artwork.count(),

      Artwork.count({
        where: {
          status: "PUBLISHED",
        },
      }),

      Artwork.count({
        where: {
          status: "DRAFT",
        },
      }),

      Artwork.count({
        where: {
          status: "ARCHIVED",
        },
      }),

      Favorite.count(),

      Inquiry.count(),

      Inquiry.count({
        where: {
          status: "NEW",
        },
      }),
    ]);
    const latestInquiry =
  await Inquiry.findOne({
    order: [
      ["createdAt", "DESC"],
    ],
    attributes: [
      "id",
      "status",
      "createdAt",
    ],
  });

    return {
      users: {
        total: totalUsers,
      },

      artists: {
        total: totalArtists,
      },

      artworks: {
        total: totalArtworks,
        published: publishedArtworks,
        draft: draftArtworks,
        archived: archivedArtworks,
      },

      favorites: {
        total: totalFavorites,
      },

      inquiries: {
        total: totalInquiries,
        new: newInquiries,
        latest: latestInquiry,
      },
    };
  };
  interface GetAdminUsersInput {
    search?: string;
    role?: "USER" | "ARTIST" | "ADMIN";
    page: number;
    limit: number;
  }
  export const getAdminUsers =
  async (
    input: GetAdminUsersInput
  ) => {
    const {
      search,
      role,
      page,
      limit,
    } = input;

    const where = {
      ...(search
        ? {
            [Op.or]: [
              {
                name: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                email: {
                  [Op.iLike]: `%${search}%`,
                },
              },
            ],
          }
        : {}),

      ...(role
        ? {
            role,
          }
        : {}),
    };

    const offset =
      (page - 1) * limit;

    const {
      rows,
      count,
    } = await User.findAndCountAll({
      where,

      attributes: [
        "id",
        "name",
        "email",
        "role",
        "avatarUrl",
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
      users: rows,

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
  export const getAdminUserById =
  async (userId: string) => {
    const user =
      await User.findByPk(
        userId,
        {
          attributes: [
            "id",
            "name",
            "email",
            "role",
            "avatarUrl",
            "createdAt",
            "updatedAt",
          ],
        }
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  };
  export const updateUserRole =
  async (
    adminUserId: string,
    targetUserId: string,
    role:
      | "USER"
      | "ARTIST"
      | "ADMIN"
  ) => {
    const user =
      await User.findByPk(
        targetUserId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    if (
      adminUserId === targetUserId
    ) {
      throw new AppError(
        "You cannot change your own role",
        400
      );
    }

    if (
      user.role === "ADMIN" &&
      role !== "ADMIN"
    ) {
      const adminCount =
        await User.count({
          where: {
            role: "ADMIN",
          },
        });

      if (adminCount <= 1) {
        throw new AppError(
          "You cannot remove the last administrator",
          400
        );
      }
    }

    user.role = role;

    await user.save();

    return user;
  };
  interface GetAdminArtworksInput {
    search?: string;
    status?:
      | "DRAFT"
      | "PUBLISHED"
      | "ARCHIVED";
    page: number;
    limit: number;
  }
  export const getAdminArtworks =
  async (
    input: GetAdminArtworksInput
  ) => {
    const {
      search,
      status,
      page,
      limit,
    } = input;

    const where = {
      ...(search
        ? {
            [Op.or]: [
              {
                title: {
                  [Op.iLike]: `%${search}%`,
                },
              },
              {
                description: {
                  [Op.iLike]: `%${search}%`,
                },
              },
            ],
          }
        : {}),

      ...(status
        ? {
            status,
          }
        : {}),
    };

    const offset =
      (page - 1) * limit;

    const {
      rows,
      count,
    } =
      await Artwork.findAndCountAll({
        where,

        include: [
          {
            model: ArtistProfile,
            as: "artist",
            attributes: [
              "id",
              "userId",
              "displayName",
              "location",
            ],
          },
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
      artworks: rows,

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
  export const updateArtworkStatus =
  async (
    artworkId: string,
    status:
      | "DRAFT"
      | "PUBLISHED"
      | "ARCHIVED"
  ) => {
    const artwork =
      await Artwork.findByPk(
        artworkId
      );

    if (!artwork) {
      throw new AppError(
        "Artwork not found",
        404
      );
    }

    if (
      status === "PUBLISHED"
    ) {
      if (
        !artwork.title ||
        !artwork.imageUrl
      ) {
        throw new AppError(
          "Artwork must have a title and image before it can be published",
          400
        );
      }

      if (
        artwork.isForSale &&
        artwork.price === null
      ) {
        throw new AppError(
          "Artwork marked for sale must have a price before it can be published",
          400
        );
      }
    }

    artwork.status = status;

    await artwork.save();

    return artwork;
  };
  export const getAdminArtists =
  async (
    page: number,
    limit: number
  ) => {
    const offset =
      (page - 1) * limit;

    const {
      rows,
      count,
    } =
      await ArtistProfile.findAndCountAll({
        include: [
          {
            model: User,
            as: "user",

            attributes: [
              "id",
              "name",
              "email",
              "role",
              "avatarUrl",
              "createdAt",
            ],
          },
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
  export const getAdminInquiries =
  async (
    status?:
      | "NEW"
      | "CONTACTED"
      | "CONVERTED"
      | "CLOSED",
    page = 1,
    limit = 20
  ) => {
    const where = {
      ...(status
        ? {
            status,
          }
        : {}),
    };

    const offset =
      (page - 1) * limit;

    const {
      rows,
      count,
    } =
      await Inquiry.findAndCountAll({
        where,

        include: [
          {
            model: User,
            as: "user",

            attributes: [
              "id",
              "name",
              "email",
            ],
          },

          {
            model: Artwork,
            as: "artwork",

            attributes: [
              "id",
              "title",
              "imageUrl",
              "price",
              "currency",
              "status",
            ],

            include: [
              {
                model: ArtistProfile,
                as: "artist",

                attributes: [
                  "id",
                  "displayName",
                ],
              },
            ],
          },
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
      inquiries: rows,

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
  interface UpdateInquiryStatusInput {
    inquiryId: string;
    status:
      | "NEW"
      | "CONTACTED"
      | "CONVERTED"
      | "CLOSED";
  }
  export const updateInquiryStatus =
  async (
    input: UpdateInquiryStatusInput
  ) => {
    const {
      inquiryId,
      status,
    } = input;

    const inquiry =
      await Inquiry.findByPk(
        inquiryId
      );

    if (!inquiry) {
      throw new AppError(
        "Inquiry not found",
        404
      );
    }

    inquiry.status = status;

    await inquiry.save();

    return inquiry;
  };
  export const getAdminInquiryById =
  async (
    inquiryId: string
  ) => {
    const inquiry =
      await Inquiry.findByPk(
        inquiryId,
        {
          include: [
            {
              model: User,
              as: "user",
              attributes: [
                "id",
                "name",
                "email",
                "role",
                "avatarUrl",
                "createdAt",
              ],
            },

            {
              model: Artwork,
              as: "artwork",
              attributes: [
                "id",
                "title",
                "description",
                "imageUrl",
                "price",
                "currency",
                "category",
                "medium",
                "yearCreated",
                "isForSale",
                "status",
                "createdAt",
              ],

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
                    "websiteUrl",
                    "instagramUrl",
                    "tiktokUrl",
                    "portfolioUrl",
                  ],

                  include: [
                    {
                      model: User,
                      as: "user",
                      attributes: [
                        "id",
                        "name",
                        "email",
                        "avatarUrl",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        }
      );

    if (!inquiry) {
      throw new AppError(
        "Inquiry not found",
        404
      );
    }

    return inquiry;
  };
  export const getAdminArtistById =
  async (
    artistId: string
  ) => {
    const artist =
      await ArtistProfile.findByPk(
        artistId,
        {
          include: [
            {
              model: User,
              as: "user",
              attributes: [
                "id",
                "name",
                "email",
                "role",
                "avatarUrl",
                "createdAt",
                "updatedAt",
              ],
            },

            {
              model: Artwork,
              as: "artworks",
              attributes: [
                "id",
                "title",
                "imageUrl",
                "price",
                "currency",
                "category",
                "medium",
                "yearCreated",
                "isForSale",
                "status",
                "createdAt",
                "updatedAt",
              ],
              order: [
                ["createdAt", "DESC"],
              ],
            },
          ],
        }
      );

    if (!artist) {
      throw new AppError(
        "Artist not found",
        404
      );
    }

    return artist;
  };
  export const getAdminArtworkById =
  async (
    artworkId: string
  ) => {
    const artwork =
      await Artwork.findByPk(
        artworkId,
        {
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
                "websiteUrl",
                "instagramUrl",
                "tiktokUrl",
                "portfolioUrl",
              ],

              include: [
                {
                  model: User,
                  as: "user",
                  attributes: [
                    "id",
                    "name",
                    "email",
                    "avatarUrl",
                  ],
                },
              ],
            },
          ],
        }
      );

    if (!artwork) {
      throw new AppError(
        "Artwork not found",
        404
      );
    }

    return artwork;
  };