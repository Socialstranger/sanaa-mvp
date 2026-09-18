import { Router } from "express";

import {
  add,
  getMine,
  remove,
} from "./favourite.controller";

import {
  protect,
} from "../../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  protect,
  getMine
);

router.post(
  "/:artworkId",
  protect,
  add
);

router.delete(
  "/:artworkId",
  protect,
  remove
);

export default router;