import { AppDataSource } from "src/AppDataSource";
import { User } from "src/entities/user.entity";

export const UserRepository = AppDataSource.getMongoRepository(User);
