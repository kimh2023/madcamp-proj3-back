import { type NextFunction, type Request, type Response } from "express";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const signup: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("signup");
  },
);

const login: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("LOGIN");
  },
);

const logout: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("logout");
  },
);

const refreshToken: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("refreshToken");
  },
);

const authController = {
  signup,
  login,
  logout,
  refreshToken,
};

export default authController;
