import {
    DataTypes,
    Model,
    Optional,
  } from "sequelize";
  
  import sequelize from "../../config/database";
  
  export type InquiryStatus =
    | "NEW"
    | "CONTACTED"
    | "CONVERTED"
    | "CLOSED";
  
  interface InquiryAttributes {
    id: string;
    userId: string;
    artworkId: string;
  
    name: string;
    email: string;
    phone: string | null;
    message: string;
    budget: number | null;
  
    status: InquiryStatus;
  
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  interface InquiryCreationAttributes
    extends Optional<
      InquiryAttributes,
      | "id"
      | "phone"
      | "budget"
      | "status"
      | "createdAt"
      | "updatedAt"
    > {}
  
  class Inquiry
    extends Model<
      InquiryAttributes,
      InquiryCreationAttributes
    >
    implements InquiryAttributes
  {
    declare id: string;
    declare userId: string;
    declare artworkId: string;
  
    declare name: string;
    declare email: string;
    declare phone: string | null;
    declare message: string;
    declare budget: number | null;
  
    declare status: InquiryStatus;
  
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
  }
  
  Inquiry.init(
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
  
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
  
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
  
        validate: {
          isEmail: true,
        },
      },
  
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
  
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  
      budget: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
  
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "NEW",
  
        validate: {
          isIn: [
            [
              "NEW",
              "CONTACTED",
              "CONVERTED",
              "CLOSED",
            ],
          ],
        },
      },
    },
  
    {
      sequelize,
      tableName: "inquiries",
      modelName: "Inquiry",
      timestamps: true,
      underscored: true,
  
      indexes: [
        {
          fields: ["user_id"],
        },
        {
          fields: ["artwork_id"],
        },
        {
          fields: ["status"],
        },
      ],
    }
  );
  
  export default Inquiry;