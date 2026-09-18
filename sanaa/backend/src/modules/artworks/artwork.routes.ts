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
  getArtworksQuerySchema,
  getArtworkByIdSchema,
} from "./artwork.validation";

const router = Router();

/*
 * Public artwork discovery
 */

router.get(
  "/",
  validate(getArtworksQuerySchema),
  getAll
);

/*
 * Artist portfolio
 * MUST come before /:id
 */

router.get(
  "/mine",
  protect,
  authorize("ARTIST"),
  getMine
);

/*
 * Public single artwork
 */

router.get(
    "/:id",
    validate(
      getArtworkByIdSchema
    ),
    getOne
  );

/*
 * Create artwork
 */

router.post(
  "/",
  protect,
  authorize("ARTIST"),
  validate(createArtworkSchema),
  create
);

/*
 * Update artwork
 */

router.patch(
  "/:id",
  protect,
  authorize("ARTIST"),
  validate(updateArtworkSchema),
  update
);

/*
 * Delete artwork
 */

router.delete(
  "/:id",
  protect,
  authorize("ARTIST"),
  remove
);

export default router;