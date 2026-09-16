import { Router } from "express";

import sequelize from "../config/database";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    await sequelize.authenticate();

    res.status(200).json({
      success: true,

      message: "Sanaa API is healthy",

      data: {
        service: "sanaa-api",

        api: "healthy",

        database: "connected",

        environment:
          process.env.NODE_ENV || "development",
      },
    });
  } catch {
    res.status(503).json({
      success: false,

      message: "Sanaa API is unhealthy",

      data: {
        service: "sanaa-api",

        api: "healthy",

        database: "disconnected",
      },
    });
  }
});

export default router;