import { type Board } from "src/entities/board.entity";
import { type User } from "src/entities/user.entity";

export interface UserResponseDto {
  success: boolean;
  message: string;
  user?: Partial<User>;
  token?: string;
  boards?: Array<Partial<Board>>;
}
