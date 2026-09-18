import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import {
    createInquiry,
    getMyInquiries,
    getInquiryById,
  } from "./inquiry.service";
  
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
  
      const inquiry =
        await createInquiry(
          req.user.id,
          req.body
        );
  
      res.status(201).json({
        success: true,
        message:
          "Inquiry submitted successfully",
        data: {
          inquiry,
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
  
      const inquiries =
        await getMyInquiries(
          req.user.id
        );
  
      res.status(200).json({
        success: true,
        data: {
          inquiries,
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
      if (!req.user) {
        throw new AppError(
          "Authentication required",
          401
        );
      }
  
      const inquiry =
        await getInquiryById(
          req.user.id,
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