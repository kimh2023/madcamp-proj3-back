import { type Product } from "./entities/product.entity";
import productService from "./services/product.service";
import userService from "./services/user.service";
import { type NewUserDto } from "./types/user.types";

const testUser1: NewUserDto = {
  email: "kimh2364@gmail.com",
  password: "00000000",
  isVerified: true,
};

const testProduct1: Partial<Product> = {
  _id: 1,
  name: "test1",
};

export const initData = async () => {
  await userService.createUser(testUser1);
  await productService.createProduct(testProduct1);
};
