import {
    DataTypes,
    Model,
    Optional,
  } from "sequelize";
  
  import sequelize from "../../config/database";
  
  interface FavoriteAttributes {
    id: string;
    userId: string;
    artworkId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface FavoriteCreationAttributes
    extends Optional<
      FavoriteAttributes,
      "id" | "createdAt" | "updatedAt"
    > {}
  
  class Favorite
    extends Model<
      FavoriteAttributes,
      FavoriteCreationAttributes
    >
    implements FavoriteAttributes
  {
    declare id: string;
    declare userId: string;
    declare artworkId: string;
  
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
  }
  
  Favorite.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
      },
  
      artworkId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "artwork_id",
      },
    },
    {
      sequelize,
      tableName: "favorites",
      modelName: "Favorite",
      timestamps: true,
      underscored: true,
  
      indexes: [
        {
          unique: true,
          fields: [
            "user_id",
            "artwork_id",
          ],
        },
        {
          fields: ["user_id"],
        },
        {
          fields: ["artwork_id"],
        },
      ],
    }
  );
  
  export default Favorite;