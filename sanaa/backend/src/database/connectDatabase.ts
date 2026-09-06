import sequelize from "../config/database";

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed");

    console.error(error);

    process.exit(1);
  }
};