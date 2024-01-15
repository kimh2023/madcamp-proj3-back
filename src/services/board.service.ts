import { type Board } from "src/entities/board.entity";
import { BoardRepository, UserRepository } from "src/repositories";
import {
  type NewBoardDto,
  type BoardResponseDto,
  type BoardRequestDto,
} from "src/types/board.types";

import { returnPartialPins } from "./pin.service";

const createBoard = async (
  userId: number,
  newBoard: NewBoardDto,
): Promise<BoardResponseDto> => {
  if (newBoard.name === undefined) {
    return { success: false, message: "Wrong request format." };
  }
  const user = await UserRepository.findOne({
    where: { _id: userId },
  });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  newBoard.user = user;
  const board: Board = BoardRepository.create(newBoard);
  await BoardRepository.save(board);
  return {
    success: true,
    message: "Successful board creation",
    board: returnPartialBoard(board),
    pins: [],
  };
};

const getBoard = async (_id: number): Promise<BoardResponseDto> => {
  const board = await BoardRepository.findOne({
    where: { _id },
    relations: ["pins", "pins.product"],
  });
  if (board === null) {
    return { success: false, message: "No such board." };
  }
  return {
    success: true,
    message: "Board retrieved",
    board: returnPartialBoard(board),
    pins: returnPartialPins(board),
  };
};

const updateBoard = async (
  _id: number,
  updatedBoard: BoardRequestDto,
): Promise<BoardResponseDto> => {
  const board = await BoardRepository.findOne({
    where: { _id },
    relations: ["pins", "pins.product"],
  });
  if (board === null) {
    return { success: false, message: "No such board." };
  }
  const updateResult = await BoardRepository.update({ _id }, updatedBoard);
  return {
    success: true,
    message: "Board updated",
    board: returnPartialBoard({ ...board, ...updatedBoard }),
    pins: returnPartialPins({ ...board, ...updatedBoard }),
  };
};

const deleteBoard = async (_id: number): Promise<BoardResponseDto> => {
  const board = await BoardRepository.findOne({
    where: { _id },
  });
  if (board === null) {
    return { success: false, message: "No such board." };
  }
  const deleteResult = await BoardRepository.delete({ _id });
  return {
    success: true,
    message: "Board deleted",
    board: returnPartialBoard(board),
  };
};

const boardService = { createBoard, getBoard, updateBoard, deleteBoard };

export default boardService;

export const returnPartialBoard = (board: Board) => {
  return { id: board._id, name: board.name };
};
