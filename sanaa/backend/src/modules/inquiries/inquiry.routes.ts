import { Router } from "express";

import {
  create,
  getMine,
  getOne,
} from "./inquiry.controller";

import {
  protect,
} from "../../middleware/auth.middleware";

import {
  validate,
} from "../../middleware/validate.middleware";

import {
  createInquirySchema,
} from "./inquiry.validation";

const router = Router();

router.get(
  "/",
  protect,
  getMine
);

router.post(
  "/",
  protect,
  validate(createInquirySchema),
  create
);

router.get(
  "/:id",
  protect,
  getOne
);

export default router;