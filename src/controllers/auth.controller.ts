import { type NextFunction, type Request, type Response } from "express";
import authService from "src/services/auth.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const signup: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const response = await authService.signup(email, password);
    res.json(response);
  },
);

const login: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const response = await authService.login(email, password);
    res.json(response);
  },
);

const logout: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ success: true });
  },
);

const refreshToken: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = (req as any).user as string;
    const response = await authService.refreshToken(_id);
    res.json(response);
  },
);

const authController = {
  signup,
  login,
  logout,
  refreshToken,
};

export default authController;
