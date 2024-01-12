import { NextFunction, Request, RequestHandler, Response } from "express";
import { CatchAsyncCallerDto, catchAsync } from "../utils/catchAsync";

export const signup: CatchAsyncCallerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("signup");
  }
);

export const login: CatchAsyncCallerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("LOGIN");
  }
);

export const logout: CatchAsyncCallerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("logout");
  }
);

export const refreshToken: CatchAsyncCallerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("refreshToken");
  }
);
