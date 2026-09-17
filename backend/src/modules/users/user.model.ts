import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";

import sequelize from "../../config/database";

export type UserRole =
  | "USER"
  | "ARTIST"
  | "ADMIN";

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | "id"
    | "role"
    | "avatarUrl"
    | "createdAt"
    | "updatedAt"
  > {}

class User
  extends Model<
    UserAttributes,
    UserCreationAttributes
  >
  implements UserAttributes
{
  declare id: string;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare role: UserRole;
  declare avatarUrl: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,

      validate: {
        isEmail: true,
      },

      set(value: string) {
        this.setDataValue(
          "email",
          value.trim().toLowerCase()
        );
      },
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },

    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "USER",

      validate: {
        isIn: [
          ["USER", "ARTIST", "ADMIN"],
        ],
      },
    },

    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "avatar_url",
    },
  },

  {
    sequelize,
    tableName: "users",
    modelName: "User",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],

    defaultScope: {
      attributes: {
        exclude: ["passwordHash"],
      },
    },

    scopes: {
      withPassword: {
        attributes: {
          include: ["passwordHash"],
        },
      },
    },
  }
);

export default User;