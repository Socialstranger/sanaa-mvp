import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";

import { notFound } from "./middleware/notfound.middleware";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./modules/auth/auth.routes";
import testRoutes from "./routes/test.routes";
import userRoutes from "./modules/users/user.routes";
import artistRoutes from "./modules/artists/artist.routes";
import artworkRoutes from "./modules/artworks/artwork.routes";
import favoriteRoutes from "./modules/favourites/favourite.routes";
import inquiryRoutes from "./modules/inquiries/inquiry.routes";
import adminRoutes from "./modules/admin/admin.routes";


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

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use("/api/v1/test", testRoutes);

app.use(
  "/api/v1/users",
  userRoutes
);


app.use(
  "/api/v1/artists",
  artistRoutes
);
 

app.use(
  "/api/v1/artworks",
  artworkRoutes
);

app.use(
  "/api/v1/favorites",
  favoriteRoutes
);

app.use(
  "/api/v1/inquiries",
  inquiryRoutes
);

app.use(
  "/api/v1/admin",
  adminRoutes
);
app.use(notFound);

app.use(errorHandler);

export default app;