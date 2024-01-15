import { type Board } from "src/entities/board.entity";
import { BoardRepository, UserRepository } from "src/repositories";
import { type BoardResponseDto } from "src/types/board.types";

const createBoard = async (
  userId: number,
  newBoard: Partial<Board>,
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
  const board = await BoardRepository.save(newBoard);
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
    pins: returnPins(board),
  };
};

const updateBoard = async (
  _id: number,
  updatedBoard: Partial<Board>,
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
    pins: returnPins({ ...board, ...updatedBoard }),
  };
};

const deleteBoard = async (_id: number): Promise<BoardResponseDto> => {
  const board = await BoardRepository.findOne({
    where: { _id },
    relations: ["pins"],
  });
  if (board === null) {
    return { success: false, message: "No such board." };
  }
  const deleteResult = await UserRepository.delete({ _id });
  return {
    success: true,
    message: "Board deleted",
    board: returnPartialBoard(board),
  };
};

const boardService = { createBoard, getBoard, updateBoard, deleteBoard };

export default boardService;

export const returnPartialBoard = (board: Board) => {
  return { _id: board._id, name: board.name };
};

const returnPins = (board: Board) => {
  return board.pins.map((pin) => ({
    _id: pin._id,
    name: pin.product.name,
    price: pin.product.price,
    rating: pin.product.rating,
    image: pin.product.image,
    link: pin.product.link,
    boardId: board._id,
  }));
};
