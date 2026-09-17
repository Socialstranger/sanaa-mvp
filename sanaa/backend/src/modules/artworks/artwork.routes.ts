import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  getMine,
  update,
  remove,
} from "./artwork.controller";

import {
  protect,
  authorize,
} from "../../middleware/auth.middleware";

import { validate } from "../../middleware/validate.middleware";

import {
  createArtworkSchema,
  updateArtworkSchema,
} from "./artwork.validation";

const router = Router();

/*
 * Public routes
 */

router.get(
  "/",
  getAll
);

/*
 * Artist-specific route
 * Must come BEFORE /:id
 */

router.get(
  "/mine",
  protect,
  authorize("ARTIST"),
  getMine
);

/*
 * Public single artwork route
 */

router.get(
  "/:id",
  getOne
);

/*
 * Artist routes
 */

router.post(
  "/",
  protect,
  authorize("ARTIST"),
  validate(createArtworkSchema),
  create
);

router.patch(
  "/:id",
  protect,
  authorize("ARTIST"),
  validate(updateArtworkSchema),
  update
);

router.delete(
  "/:id",
  protect,
  authorize("ARTIST"),
  remove
);

export default router;