import { validate } from "class-validator";
import { type InterestType, type User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories";
import { type UserResponseDto } from "src/types/user.types";

import { createJWT, createSalt, hashPassword } from "./auth.service";
import { returnPartialBoard } from "./board.service";

const createUser = async (newUser: Partial<User>): Promise<UserResponseDto> => {
  if (
    newUser.email === undefined ||
    newUser.password === undefined ||
    newUser.password.length < 8
  ) {
    return { success: false, message: "Wrong request format." };
  }

  const userExisting = await UserRepository.findOne({
    where: { email: newUser.email },
  });
  if (userExisting !== null) {
    return { success: false, message: "Existing user." };
  }

  const salt = createSalt();
  newUser.password = hashPassword(newUser.password, salt);
  newUser.salt = salt;
  const errors = await validate(newUser);
  if (errors.length > 0) {
    return { success: false, message: "Wrong request format." };
  }
  const user = await UserRepository.save(newUser);
  return {
    success: true,
    message: "Successful signup",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const getUser = async (_id: number): Promise<UserResponseDto> => {
  const user = await UserRepository.findOne({
    where: { _id },
    relations: ["boards", "boards"],
  });

  if (user === null) {
    return { success: false, message: "No such user." };
  }
  return {
    success: true,
    message: "User retrieved",
    user: returnCompleteUser(user),
    boards: returnBoards(user),
  };
};

const updateUser = async (
  _id: number,
  updatedUser: Partial<User>,
): Promise<UserResponseDto> => {
  const user = await UserRepository.findOne({
    where: { _id },
  });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  const updateResult = await UserRepository.update({ _id }, updatedUser);
  return {
    success: true,
    message: "User updated",
    user: returnPartialUser({ ...user, ...updatedUser }),
    boards: returnBoards({ ...user, ...updatedUser }),
  };
};

const deleteUser = async (_id: number): Promise<UserResponseDto> => {
  const user = await UserRepository.findOne({
    where: { _id },
  });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  const deleteResult = await UserRepository.delete({ _id });
  return {
    success: true,
    message: "User deleted",
    user: returnPartialUser(user),
  };
};

const userService = { createUser, getUser, updateUser, deleteUser };

export default userService;

export const returnPartialUser = (user: User) => {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    interest: user.interest,
  };
};

const returnCompleteUser = (user: User) => {
  return {
    ...returnPartialUser(user),
    interest: user.interest as InterestType,
  };
};

const returnBoards = (user: User) => {
  return user.boards.map((board) => returnPartialBoard(board));
};
