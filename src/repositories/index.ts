import { AppDataSource } from "src/AppDataSource";
import { Board } from "src/entities/board.entity";
import { Pin } from "src/entities/pin.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";

export const UserRepository = AppDataSource.getRepository(User);
export const BoardRepository = AppDataSource.getRepository(Board);
export const PinRepository = AppDataSource.getRepository(Pin);
export const ProductRepository = AppDataSource.getRepository(Product);
