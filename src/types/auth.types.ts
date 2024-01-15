import { type User } from "src/entities/user.entity";

import { type PartialUserDto } from "./user.types";

export interface AuthRequestDto extends Partial<User> {
  email: string;
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */

export interface AuthResponseDto {
  success: boolean;
  message: string;
  user?: PartialUserDto;
  token?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           description: describes status of operation
 *         user:
 *           $ref: "#/components/schemas/PartialUserDto"
 *         token:
 *           type: string
 *           description: jwt token for authentication
 */
