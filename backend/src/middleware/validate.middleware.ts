import {
  Request,
  Response,
  NextFunction,
} from "express";

import { z } from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const result =
      schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors:
          result.error.issues.map(
            (issue) => ({
              field:
                issue.path.join("."),
              message: issue.message,
            })
          ),
      });

      return;
    }

    const data = result.data as {
      body?: unknown;
      query?: unknown;
      params?: unknown;
    };

    if (data.body !== undefined) {
      req.body = data.body;
    }

    if (data.query !== undefined) {
      req.query = data.query as typeof req.query;
    }

    if (data.params !== undefined) {
      req.params =
        data.params as typeof req.params;
    }

    next();
  };