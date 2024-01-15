import { type PartialPinDto } from "./pin.types";

export interface BoardResponseDto {
  success: boolean;
  message: string;
  board?: PartialBoardDto;
  pins?: PartialPinDto[];
}

export interface PartialBoardDto {
  _id: number;
  name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PartialBoardDto:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: Board ID
 *         name:
 *           type: string
 *           description: Board name
 */

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
