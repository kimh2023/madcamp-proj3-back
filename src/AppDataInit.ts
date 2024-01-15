import { type User } from "./entities/user.entity";
import { createUser } from "./services/user.service";

const testUser1: Partial<User> = {
  email: "kimh2364@gmail.com",
  password: "hidaahid",
  isVerified: true,
};

export const initData = async () => {
  await createUser(testUser1);
};
