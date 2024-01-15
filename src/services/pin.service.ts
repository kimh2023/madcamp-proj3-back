import { type Board } from "src/entities/board.entity";
import { type Pin } from "src/entities/pin.entity";
import {
  BoardRepository,
  PinRepository,
  ProductRepository,
  UserRepository,
} from "src/repositories";
import { type CompletePinDto, type PinResponseDto } from "src/types/pin.types";

const createPin = async (
  boardId: number,
  productId: number,
  newPin: Partial<Pin>,
): Promise<PinResponseDto> => {
  const board = await BoardRepository.findOne({
    where: { _id: boardId },
  });
  const product = await ProductRepository.findOne({
    where: { _id: productId },
  });
  if (board === null || product === null) {
    return { success: false, message: "No such board." };
  }
  newPin.board = board;
  newPin.product = product;
  const pin: Pin = PinRepository.create(newPin);
  await PinRepository.save(pin);
  return {
    success: true,
    message: "Successful board creation",
    pin: returnCompletePin(pin),
  };
};

const getPin = async (_id: number): Promise<PinResponseDto> => {
  const pin = await PinRepository.findOne({
    where: { _id },
    relations: ["product", "board"],
  });
  if (pin === null) {
    return { success: false, message: "No such pin." };
  }
  return {
    success: true,
    message: "Board retrieved",
    pin: returnCompletePin(pin),
  };
};

const updatePin = async (
  _id: number,
  updatedPin: Partial<Pin>,
): Promise<PinResponseDto> => {
  const pin = await PinRepository.findOne({
    where: { _id },
    relations: ["product", "board"],
  });
  if (pin === null) {
    return { success: false, message: "No such pin." };
  }
  const updateResult = await PinRepository.update({ _id }, updatedPin);
  return {
    success: true,
    message: "Board updated",
    pin: returnCompletePin({ ...pin, ...updatedPin }),
  };
};

const deletePin = async (_id: number): Promise<PinResponseDto> => {
  const pin = await PinRepository.findOne({
    where: { _id },
    relations: ["product", "board"],
  });
  if (pin === null) {
    return { success: false, message: "No such pin." };
  }
  const deleteResult = await UserRepository.delete({ _id });
  return {
    success: true,
    message: "Board deleted",
    pin: returnCompletePin(pin),
  };
};

const pinService = { createPin, getPin, updatePin, deletePin };

export default pinService;

export const returnPartialPins = (board: Board) => {
  return board.pins.map((pin) => ({
    id: pin._id,
    name: pin.product.name,
    price: pin.product.price,
    rating: pin.product.rating,
    image: pin.product.image,
    link: pin.product.link,
  }));
};

const returnCompletePin = (pin: Pin): CompletePinDto => {
  return {
    id: pin._id,
    name: pin.product.name,
    price: pin.product.price,
    rating: pin.product.rating,
    image: pin.product.image,
    link: pin.product.link,
    boardId: pin.board._id,
    note: pin.note,
  };
};
