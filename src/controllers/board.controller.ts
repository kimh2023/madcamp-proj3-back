import { type NextFunction, type Request, type Response } from "express";
import boardService from "src/services/board.service";
import { type BoardRequestDto, type NewBoardDto } from "src/types/board.types";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const createBoard: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user as number;
    const response = await boardService.createBoard(
      userId,
      req.body as NewBoardDto,
    );
    res.json(response);
  },
);

const getAllBoards: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user as number;
    const response = await boardService.getAllBoards(userId);
    res.json(response);
  },
);

const getBoard: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.boardId);
    const response = await boardService.getBoard(_id);
    res.json(response);
  },
);

const updateBoard: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.boardId);
    const response = await boardService.updateBoard(
      _id,
      req.body as BoardRequestDto,
    );
    res.json(response);
  },
);

const deleteBoard: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = Number(req.params.boardId);
    const response = await boardService.deleteBoard(_id);
    res.json(response);
  },
);

const boardController = {
  createBoard,
  getAllBoards,
  getBoard,
  updateBoard,
  deleteBoard,
};

export default boardController;
