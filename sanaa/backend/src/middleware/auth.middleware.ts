import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import { verifyToken } from "../utils/jwt";
  
  import User from "../modules/users/user.model";
  import { UserRole } from "../modules/users/user.model";
  
  import AppError from "../utils/AppError";
  
  export const protect = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authorization =
        req.headers.authorization;
  
      if (
        !authorization ||
        !authorization.startsWith(
          "Bearer "
        )
      ) {
        throw new AppError(
          "Authentication required",
          401
        );
      }
  
      const token =
        authorization.split(" ")[1];
  
      if (!token) {
        throw new AppError(
          "Authentication required",
          401
        );
      }
  
      const payload =
        verifyToken(token);
  
      const user =
        await User.findByPk(
          payload.userId
        );
  
      if (!user) {
        throw new AppError(
          "User no longer exists",
          401
        );
      }
  
      req.user = {
        id: user.id,
        role: user.role,
      };
  
      next();
    } catch (error) {
      if (
        error instanceof AppError
      ) {
        next(error);
  
        return;
      }
  
      next(
        new AppError(
          "Invalid or expired token",
          401
        )
      );
    }
  };
  export const authorize =
  (...roles: UserRole[]) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      next(
        new AppError(
          "Authentication required",
          401
        )
      );

      return;
    }

    if (
      !roles.includes(
        req.user.role
      )
    ) {
      next(
        new AppError(
          "You do not have permission to perform this action",
          403
        )
      );

      return;
    }

    next();
  };