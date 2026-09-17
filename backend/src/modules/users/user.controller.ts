import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    getUserProfile,
    updateUserProfile,
  } from "./user.service";
  
  import AppError from "../../utils/AppError";
  
  export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError(
          "Authentication required",
          401
        );
      }
  
      const user =
        await getUserProfile(
          req.user.id
        );
  
      res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError(
          "Authentication required",
          401
        );
      }
  
      const user =
        await updateUserProfile(
          req.user.id,
          req.body
        );
  
      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };