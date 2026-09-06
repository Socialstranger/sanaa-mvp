import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    console.error(error);
  
    res.status(500).json({
      success: false,
  
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error.message,
    });
  };