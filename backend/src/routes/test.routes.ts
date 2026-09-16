import { Router } from "express";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/protected",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,

      message:
        "Protected route accessed",

      data: {
        user: req.user,
      },
    });
  }
);

router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  (_req, res) => {
    res.status(200).json({
      success: true,

      message:
        "Admin route accessed",
    });
  }
);

export default router;