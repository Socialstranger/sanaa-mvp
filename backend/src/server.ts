import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { connectDatabase } from "./database/connectDatabase";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`
🚀 Sanaa API started

Environment: ${process.env.NODE_ENV || "development"}
Port: ${PORT}
URL: http://localhost:${PORT}
Health: http://localhost:${PORT}/api/v1/health
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start Sanaa API");

    console.error(error);

    process.exit(1);
  }
};

startServer();