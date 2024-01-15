import { type Product } from "./entities/product.entity";
import userService from "./services/user.service";
import { type NewUserDto } from "./types/user.types";

const testUser1: NewUserDto = {
  email: "kimh2364@gmail.com",
  password: "hidaahid",
  isVerified: true,
};

const testProduct1: Partial<Product> = {
  name: "test1",
};

export const initData = async () => {
  await userService.createUser(testUser1);
  // await
};
