import { Router } from "express";

import {
  getMe,
  updateMe,
} from "./user.controller";

import { protect } from "../../middleware/auth.middleware";

import { validate } from "../../middleware/validate.middleware";

import {
  updateUserSchema,
} from "./user.validation";

const router = Router();

router.get(
  "/me",
  protect,
  getMe
);

router.patch(
  "/me",
  protect,
  validate(updateUserSchema),
  updateMe
);

export default router;