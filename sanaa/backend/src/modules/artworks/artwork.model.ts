import {
    DataTypes,
    Model,
    Optional,
  } from "sequelize";
  
  import sequelize from "../../config/database";
  
  export type ArtworkStatus =
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";
  
  export type ArtworkCurrency = "KES";
  
  interface ArtworkAttributes {
    id: string;
    artistId: string;
    title: string;
    description: string | null;
    imageUrl: string;
    price: number | null;
    currency: ArtworkCurrency;
    category: string | null;
    medium: string | null;
    yearCreated: number | null;
    isForSale: boolean;
    status: ArtworkStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface ArtworkCreationAttributes
    extends Optional<
      ArtworkAttributes,
      | "id"
      | "description"
      | "price"
      | "category"
      | "medium"
      | "yearCreated"
      | "isForSale"
      | "status"
      | "createdAt"
      | "updatedAt"
    > {}
  
  class Artwork
    extends Model<
      ArtworkAttributes,
      ArtworkCreationAttributes
    >
    implements ArtworkAttributes
  {
    declare id: string;
    declare artistId: string;
    declare title: string;
    declare description: string | null;
    declare imageUrl: string;
    declare price: number | null;
    declare currency: ArtworkCurrency;
    declare category: string | null;
    declare medium: string | null;
    declare yearCreated: number | null;
    declare isForSale: boolean;
    declare status: ArtworkStatus;
  
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
  }
  
  Artwork.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  
      artistId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "artist_id",
      },
  
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
  
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  
      imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        field: "image_url",
      },
  
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
  
      currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: "KES",
        validate: {
          isIn: [["KES"]],
        },
      },
  
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
  
      medium: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
  
      yearCreated: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "year_created",
      },
  
      isForSale: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_for_sale",
      },
  
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "PUBLISHED",
        validate: {
          isIn: [
            [
              "DRAFT",
              "PUBLISHED",
              "ARCHIVED",
            ],
          ],
        },
      },
    },
    {
      sequelize,
      tableName: "artworks",
      modelName: "Artwork",
      timestamps: true,
      underscored: true,
  
      indexes: [
        {
          fields: ["artist_id"],
        },
        {
          fields: ["status"],
        },
        {
          fields: ["category"],
        },
      ],
    }
  );
  
  export default Artwork;