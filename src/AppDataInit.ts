import { type User } from "./entities/user.entity";
import userService from "./services/user.service";

const testUser1: Partial<User> = {
  email: "kimh2364@gmail.com",
  password: "hidaahid",
  isVerified: true,
};

export const initData = async () => {
  await userService.createUser(testUser1);
};
