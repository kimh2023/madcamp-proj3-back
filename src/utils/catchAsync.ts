import { type NextFunction, type Request, type Response } from "express";

export type RequestHandlerDto = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
