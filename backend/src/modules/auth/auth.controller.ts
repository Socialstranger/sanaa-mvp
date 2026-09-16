import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    registerUser,
    loginUser,
  } from "./auth.service";
import User from "../users/user.model";

import AppError from "../../utils/AppError";





  export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result =
        await registerUser(
          req.body
        );
  
      res.status(201).json({
        success: true,
  
        message:
          "Account created successfully",
  
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result =
        await loginUser(
          req.body
        );
  
      res.status(200).json({
        success: true,
  
        message:
          "Login successful",
  
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
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
        await User.findByPk(
          req.user.id
        );
  
      if (!user) {
        throw new AppError(
          "User not found",
          404
        );
      }
  
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