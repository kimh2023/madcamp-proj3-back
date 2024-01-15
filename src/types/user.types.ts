import { type InterestType } from "src/entities/user.entity";

import { type PartialBoardDto } from "./board.types";

export interface NewUserDto {
  email: string;
  password: string;
  salt?: string;
  isVerified?: boolean;
  verificationToken?: string;
}

export interface PartialUserDto {
  id: number;
  email: string;
  name: string;
  interest?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PartialUserDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: User ID
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         name:
 *           type: string
 *           description: User name
 *         interest:
 *           type: string
 *           description: User interest
 */

export interface UserRequestDto {
  name?: string;
  interest?: InterestType;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         interest:
 *           type: string
 *           description: User interest
 */

export interface UserResponseDto {
  success: boolean;
  message: string;
  user?: PartialUserDto;
  token?: string;
  boards?: PartialBoardDto[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           description: describes status of operation
 *         user:
 *           $ref: "#/components/schemas/PartialUserDto"
 *         boards:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/PartialBoardDto"
 */
