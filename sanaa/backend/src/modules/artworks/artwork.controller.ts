import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    createArtwork,
    getPublicArtworks,
    getPublicArtworkById,
    getMyArtworks,
    updateArtwork,
    deleteArtwork,
  } from "./artwork.service";
  
  import AppError from "../../utils/AppError";
  
  export const create = async (
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
  
      const artwork =
        await createArtwork(
          req.user.id,
          req.body
        );
  
      res.status(201).json({
        success: true,
        message:
          "Artwork created successfully",
        data: {
          artwork,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const artworks =
        await getPublicArtworks();
  
      res.status(200).json({
        success: true,
        data: {
          artworks,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const artwork =
        await getPublicArtworkById(
          String(req.params.id)
        );
  
      res.status(200).json({
        success: true,
        data: {
          artwork,
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
  
      const artworks =
        await getMyArtworks(
          req.user.id
        );
  
      res.status(200).json({
        success: true,
        data: {
          artworks,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const update = async (
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
  
      const artwork =
        await updateArtwork(
          req.user.id,
          String(req.params.id),
          req.body
        );
  
      res.status(200).json({
        success: true,
        message:
          "Artwork updated successfully",
        data: {
          artwork,
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
  
      await deleteArtwork(
        req.user.id,
        String(req.params.id)
      );
  
      res.status(200).json({
        success: true,
        message:
          "Artwork deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };