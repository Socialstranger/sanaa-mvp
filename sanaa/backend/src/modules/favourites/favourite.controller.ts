import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    addFavorite,
    getMyFavorites,
    removeFavorite,
  } from "./favourite.service";
  
  import AppError from "../../utils/AppError";
  
  export const add = async (
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
  
      const favorite =
        await addFavorite(
          req.user.id,
          String(req.params.artworkId)
        );
  
      res.status(201).json({
        success: true,
        message:
          "Artwork added to favorites",
        data: {
          favorite,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getMine = async (
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
  
      const favorites =
        await getMyFavorites(
          req.user.id
        );
  
      res.status(200).json({
        success: true,
        data: {
          favorites,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const remove = async (
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
  
      await removeFavorite(
        req.user.id,
        String(req.params.artworkId)
      );
  
      res.status(200).json({
        success: true,
        message:
          "Artwork removed from favorites",
      });
    } catch (error) {
      next(error);
    }
  };