import { type PartialBoardDto } from "./board.types";

export interface UserResponseDto {
  success: boolean;
  message: string;
  user?: PartialUserDto;
  token?: string;
  boards?: PartialBoardDto[];
}

export interface PartialUserDto {
  _id: number;
  email: string;
  name: string;
  interest: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PartialUserDto:
 *       type: object
 *       properties:
 *         _id:
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
