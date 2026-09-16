import sequelize from "../config/database";

import { initModels } from "./InitModel";

export const connectDatabase = async (): Promise<void> => {
  try {
    initModels();

    await sequelize.authenticate();

    console.log("✅ PostgreSQL connected successfully");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({
        alter: false,
      });

      console.log("✅ Database models synchronized");
    }
  } catch (error) {
    console.error("❌ PostgreSQL connection failed");

    console.error(error);

    process.exit(1);
  }
};