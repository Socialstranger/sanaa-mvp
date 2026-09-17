import {
    DataTypes,
    Model,
    Optional,
  } from "sequelize";
  
  import sequelize from "../../config/database";
  import User from "../users/user.model";
  
  interface ArtistProfileAttributes {
    id: string;
    userId: string;
    displayName: string;
    bio: string | null;
    location: string | null;
    websiteUrl: string | null;
    instagramUrl: string | null;
    tiktokUrl: string | null;
    portfolioUrl: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface ArtistProfileCreationAttributes
    extends Optional<
      ArtistProfileAttributes,
      | "id"
      | "bio"
      | "location"
      | "websiteUrl"
      | "instagramUrl"
      | "tiktokUrl"
      | "portfolioUrl"
      | "createdAt"
      | "updatedAt"
    > {}
  
    class ArtistProfile
    extends Model<
      ArtistProfileAttributes,
      ArtistProfileCreationAttributes
    >
    implements ArtistProfileAttributes
  {
    declare id: string;
    declare userId: string;
    declare displayName: string;
    declare bio: string | null;
    declare location: string | null;
    declare websiteUrl: string | null;
    declare instagramUrl: string | null;
    declare tiktokUrl: string | null;
    declare portfolioUrl: string | null;
  
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
  }
  
  ArtistProfile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        field: "user_id",
        references: {
          model: User,
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
  
      displayName: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: "display_name",
      },
  
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
  
      location: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
  
      websiteUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "website_url",
      },
  
      instagramUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "instagram_url",
      },
  
      tiktokUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "tiktok_url",
      },
  
      portfolioUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "portfolio_url",
      },
    },
    {
      sequelize,
      tableName: "artist_profiles",
      modelName: "ArtistProfile",
      timestamps: true,
      underscored: true,
    }
  );
  
  export default ArtistProfile;