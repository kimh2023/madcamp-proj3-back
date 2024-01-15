import { type NextFunction, type Request, type Response } from "express";
import userService from "src/services/user.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const getUser: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = (req as any).user as number;
    const response = await userService.getUser(_id);
    res.json(response);
  },
);

const userController = { getUser };

export default userController;
