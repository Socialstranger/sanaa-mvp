import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";

import { notFound } from "./middleware/notfound.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health", healthRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;