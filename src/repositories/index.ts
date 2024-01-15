import { AppDataSource } from "src/AppDataSource";
import { Board } from "src/entities/board.entity";
import { User } from "src/entities/user.entity";

export const UserRepository = AppDataSource.getRepository(User);
export const BoardRepository = AppDataSource.getRepository(Board);
