import express from "express";
import boardController from "src/controllers/board.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router
  .route("/")
  .get(auth, boardController.getAllBoards)
  .post(auth, boardController.createBoard);

router
  .route("/:boardId")
  .get(auth, boardController.getBoard)
  .patch(auth, boardController.updateBoard)
  .delete(auth, boardController.deleteBoard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: "Board"
 *   description: "보드(핀 묶음) 관련 API"
 * paths:
 *   /boards:
 *     get:
 *       summary: "보드 가쟈오는 API, user는 없음...!!!"
 *       tags: [Board]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/UserResponse"
 *     post:
 *       summary: "보드 만드는 API"
 *       tags: [Board]
 *       requestBody:
 *         description: "이미지 검색용 API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BoardRequest"
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/BoardResponse"
 *   /boards/{boardId}:
 *     get:
 *       summary: "보드 정보 가져오는 API"
 *       tags: [Board]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/BoardResponse"
 *     patch:
 *       summary: "보드 정보 수정하는 API"
 *       tags: [Board]
 *       requestBody:
 *         description: "이미지 검색용 API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BoardRequest"
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/BoardResponse"
 *     delete:
 *       summary: "보드 삭제하는 API"
 *       tags: [Board]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/BoardResponse"
 */
