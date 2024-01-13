import { type User } from "src/entities/user.entity";

// export interface SignupResponseDto {
//   success: boolean;
//   message: string;
//   user?: Partial<User>;
//   token?: string;
// }

// export interface LoginResponseDto {
//   success: boolean;
//   message: string;
//   user?: Partial<User>;
//   token?: string;
// }

export interface AuthResponseDto {
  success: boolean;
  message: string;
  user?: Partial<User>;
  token?: string;
}
