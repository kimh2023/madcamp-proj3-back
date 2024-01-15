export interface PartialPinDto {
  _id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  link: string;
  boardId: number;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PartialPinDto:
 *       type: object
 *       properties:
 *         _id:
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
 */
