import { type User } from "src/entities/user.entity";

import { type PartialPinDto } from "./pin.types";

export interface NewBoardDto {
  name: string;
  user: Partial<User>;
}

export interface PartialBoardDto {
  id: number;
  name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PartialBoardDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Board ID
 *         name:
 *           type: string
 *           description: Board name
 */

export interface BoardRequestDto {
  name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Board name
 */

export interface BoardResponseDto {
  success: boolean;
  message: string;
  board?: PartialBoardDto;
  pins?: PartialPinDto[];
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BoardResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           description: describes status of operation
 *         board:
 *           $ref: "#/components/schemas/PartialBoardDto"
 *         pins:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/PartialPinDto"
 */
