import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    onboardArtist,
    getArtistProfile,
    updateArtistProfile,
    getPublicArtists,
  } from "./artist.service";
  
  import AppError from "../../utils/AppError";
  
  export const onboard = async (
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
  
      const result =
        await onboardArtist(
          req.user.id,
          req.body
        );
  
      res.status(201).json({
        success: true,
        message:
          "Artist profile created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getMyArtistProfile =
    async (
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
  
        const artistProfile =
          await getArtistProfile(
            req.user.id
          );
  
        res.status(200).json({
          success: true,
          data: {
            artistProfile,
          },
        });
      } catch (error) {
        next(error);
      }
    };
  
  export const updateMyArtistProfile =
    async (
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
  
        const artistProfile =
          await updateArtistProfile(
            req.user.id,
            req.body
          );
  
        res.status(200).json({
          success: true,
          message:
            "Artist profile updated successfully",
          data: {
            artistProfile,
          },
        });
      } catch (error) {
        next(error);
      }
    };
    export const getAll =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result =
        await getPublicArtists(
          req.query as unknown as{
            search?: string;
            location?: string;
            page: number;
            limit: number;
          }
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };