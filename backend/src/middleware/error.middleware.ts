import {
  Request,
  Response,
  NextFunction,
} from "express";

import AppError from "../utils/AppError";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  if (error instanceof AppError) {
    res.status(
      error.statusCode
    ).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,

    message:
      process.env.NODE_ENV ===
      "production"
        ? "Internal server error"
        : error.message,
  });
};