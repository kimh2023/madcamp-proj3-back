import { validate } from "class-validator";
import { type User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories";

import { createJWT, createSalt, hashPassword } from "./auth.service";

export const createUser = async (newUser: Partial<User>) => {
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

const getUser = async (_id: number) => {
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
    user: returnPartialUser(user),
    boards: returnBoards(user),
  };
};

const userService = { getUser };

export default userService;

export const returnPartialUser = (user: User) => {
  return { id: user._id, email: user.email };
};

const returnBoards = (user: User) => {
  return user.boards;
};
