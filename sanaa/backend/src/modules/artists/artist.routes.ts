import { Router } from "express";

import {
  onboard,
  getMyArtistProfile,
  updateMyArtistProfile,
  getAll,
} from "./artist.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

import { validate } from "../../middleware/validate.middleware";

import {
  onboardArtistSchema,
  updateArtistSchema,
  getArtistsQuerySchema,
  
} from "./artist.validation";

const router = Router();

router.post(
  "/onboard",
  protect,
  authorize("USER"),
  validate(onboardArtistSchema),
  onboard
);

router.get(
  "/me",
  protect,
  authorize("ARTIST"),
  getMyArtistProfile
);

router.patch(
  "/me",
  protect,
  authorize("ARTIST"),
  validate(updateArtistSchema),
  updateMyArtistProfile
);
router.get(
    "/",
    validate(getArtistsQuerySchema),
    getAll
  );
export default router;