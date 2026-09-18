import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    getDashboardStats,
    getAdminUsers,
    getAdminUserById,
    updateUserRole,
    getAdminArtworks,
    updateArtworkStatus,
    getAdminArtists,
    getAdminInquiries,
    getAdminInquiryById,
    updateInquiryStatus,
    getAdminArtistById,
    getAdminArtworkById,
  } from "./admin.service";
  
  import AppError from "../../utils/AppError";


  export const dashboard = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const stats =
        await getDashboardStats();
  
      res.status(200).json({
        success: true,
        data: {
          stats,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        search,
        role,
        page,
        limit,
      } =
        req.query as unknown as {
          search?: string;
          role?:
            | "USER"
            | "ARTIST"
            | "ADMIN";
          page: number;
          limit: number;
        };
  
      const users =
        await getAdminUsers({
          search,
          role,
          page,
          limit,
        });
  
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };
  export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user =
        await getAdminUserById(
          String(req.params.id)
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
  export const changeUserRole =
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

      const user =
        await updateUserRole(
          req.user.id,
          String(req.params.id),
          req.body.role
        );

      res.status(200).json({
        success: true,
        message:
          "User role updated successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const getArtworks =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        search,
        status,
        page,
        limit,
      } =
        req.query as unknown as {
          search?: string;
          status?:
            | "DRAFT"
            | "PUBLISHED"
            | "ARCHIVED";
          page: number;
          limit: number;
        };

      const artworks =
        await getAdminArtworks({
          search,
          status,
          page,
          limit,
        });

      res.status(200).json({
        success: true,
        data: artworks,
      });
    } catch (error) {
      next(error);
    }
  };
  export const changeArtworkStatus =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const artwork =
        await updateArtworkStatus(
          String(req.params.id),
          req.body.status
        );

      res.status(200).json({
        success: true,
        message:
          "Artwork status updated successfully",
        data: {
          artwork,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const getArtists =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        page,
        limit,
      } =
        req.query as unknown as {
          page: number;
          limit: number;
        };

      const artists =
        await getAdminArtists(
          page,
          limit
        );

      res.status(200).json({
        success: true,
        data: artists,
      });
    } catch (error) {
      next(error);
    }
  };
  export const getInquiries =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        status,
        page,
        limit,
      } =
        req.query as unknown as {
          status?:
            | "NEW"
            | "CONTACTED"
            | "CONVERTED"
            | "CLOSED";
          page: number;
          limit: number;
        };

      const inquiries =
        await getAdminInquiries(
          status,
          page,
          limit
        );

      res.status(200).json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      next(error);
    }
  };
  export const changeInquiryStatus =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const inquiry =
        await updateInquiryStatus({
          inquiryId:
            String(req.params.id),

          status:
            req.body.status,
        });

      res.status(200).json({
        success: true,
        message:
          "Inquiry status updated successfully",

        data: {
          inquiry,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const getInquiry =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const inquiry =
        await getAdminInquiryById(
          String(req.params.id)
        );

      res.status(200).json({
        success: true,
        data: {
          inquiry,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const getArtist =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const artist =
        await getAdminArtistById(
          String(req.params.id)
        );

      res.status(200).json({
        success: true,
        data: {
          artist,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  export const getArtwork =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const artwork =
        await getAdminArtworkById(
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