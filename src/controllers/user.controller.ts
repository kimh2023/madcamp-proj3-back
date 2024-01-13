import { type NextFunction, type Request, type Response } from "express";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const getUser: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json("signup");
  },
);

const userController = { getUser };

export default userController;
