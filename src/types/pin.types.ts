export interface PartialPinDto {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  link: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PartialPinDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Pin ID
 *         name:
 *           type: string
 *           description: Pin name
 *         price:
 *           type: number
 *           description: Pin price
 *         rating:
 *           type: number
 *           description: Pin rating
 *         image:
 *           type: string
 *           description: Pin image
 *         link:
 *           type: string
 *           description: Pin link
 */

export interface CompletePinDto {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  link: string;
  boardId: number;
  note: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CompletePinDto:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Pin ID
 *         name:
 *           type: string
 *           description: Pin name
 *         price:
 *           type: number
 *           description: Pin price
 *         rating:
 *           type: number
 *           description: Pin rating
 *         image:
 *           type: string
 *           description: Pin image
 *         link:
 *           type: string
 *           description: Pin link
 *         boardId:
 *           type: number
 *           description: Pin's board
 *         note:
 *           type: string
 *           description: Pin note
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PinRequestPost:
 *       type: object
 *       properties:
 *         productId:
 *           type: number
 *           description: Pin's product
 *         note:
 *           type: string
 *           description: Pin note
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PinRequestPatch:
 *       type: object
 *       properties:
 *         note:
 *           type: string
 *           description: Pin note
 */

export interface PinResponseDto {
  success: boolean;
  message: string;
  pin?: CompletePinDto;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PinResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           description: describes status of operation
 *         pin:
 *           $ref: "#/components/schemas/CompletePinDto"
 */
