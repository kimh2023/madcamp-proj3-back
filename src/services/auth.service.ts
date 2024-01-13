import { validate } from "class-validator";
import * as crypto from "crypto";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories";
import { type AuthResponseDto } from "src/types/auth.types";

const path = require("path");
const privateKeyPath: string = path.join(__dirname, "../certs/private.key");
const privateKey = fs.readFileSync(privateKeyPath);

const signup = async (
  email: string,
  password: string,
): Promise<AuthResponseDto> => {
  const userExisting = await UserRepository.findOne({ where: { email } });
  if (userExisting !== null) {
    return { success: false, message: "Existing user." };
  }
  if (password.length < 8) {
    return { success: false, message: "Wrong request format." };
  }
  const userTemplate = new User();
  const salt = createSalt();
  userTemplate.email = email;
  userTemplate.password = hashPassword(password, salt);
  userTemplate.salt = salt;
  const errors = await validate(userTemplate);
  if (errors.length > 0) {
    return { success: false, message: "Wrong request format." };
  }
  const user = await UserRepository.save(userTemplate);
  return {
    success: true,
    message: "Successful signup",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const login = async (
  email: string,
  password: string,
): Promise<AuthResponseDto> => {
  const user = await UserRepository.findOne({ where: { email } });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  const salt = user.salt;
  const hashedPassword = hashPassword(password, salt);
  if (hashedPassword !== user.password) {
    return { success: false, message: "Wrong password." };
  }
  return {
    success: true,
    message: "Successful login",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const refreshToken = async (_id: string): Promise<AuthResponseDto> => {
  const user = await UserRepository.findOne({
    where: { _id: new ObjectId(_id) },
  });
  if (user === null) {
    return { success: false, message: "No such user." };
  }
  return {
    success: true,
    message: "Successful refresh",
    user: returnPartialUser(user),
    token: createJWT(user),
  };
};

const authService = {
  signup,
  login,
  refreshToken,
};

export default authService;

/// /////////////

const createSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const hashPassword = (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString();
};

const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, iat: Math.floor(Date.now() / 1000) },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "3h",
    },
  );
  return token;
};

const returnPartialUser = (user: User) => {
  return { id: user._id, email: user.email };
};
