import { type NextFunction, type Request, type Response } from "express";
import { type Pin } from "src/entities/pin.entity";
import pinService from "src/services/pin.service";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const createPin: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const boardId = Number(req.params.boardId);
    const productId = req.body.productId as number;
    const response = await pinService.createPin(
      boardId,
      productId,
      req.body as Partial<Pin>,
    );
    res.json(response);
  },
);

const getPin: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.pinId);
    const response = await pinService.getPin(_id);
    res.json(response);
  },
);

const updatePin: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.pinId);
    const response = await pinService.updatePin(_id, req.body as Partial<Pin>);
    res.json(response);
  },
);

const deletePin: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.pinId);
    const response = await pinService.deletePin(_id);
    res.json(response);
  },
);

const pinController = { createPin, getPin, updatePin, deletePin };

export default pinController;
