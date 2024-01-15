import { type NextFunction, type Request, type Response } from "express";
import { type User } from "src/entities/user.entity";
import userService from "src/services/user.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const getUser: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.userId);
    const response = await userService.getUser(_id);
    res.json(response);
  },
);

const updateUser: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.userId);
    const response = await userService.updateUser(
      _id,
      req.body as Partial<User>,
    );
    res.json(response);
  },
);

const deleteUser: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.userId);
    const response = await userService.deleteUser(_id);
    res.json(response);
  },
);

const userController = { getUser, updateUser, deleteUser };

export default userController;
