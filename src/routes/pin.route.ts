import express from "express";
import pinController from "src/controllers/pin.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router.route("/").post(auth, pinController.createPin);

router
  .route("/:pinId")
  .get(auth, pinController.getPin)
  .patch(auth, pinController.updatePin)
  .delete(auth, pinController.deletePin);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: "Pin"
 *   description: "핀 관련 API"
 * paths:
 *   /boards/{boardId}/pins:
 *     post:
 *       summary: "핀 만드는 API"
 *       tags: [Pin]
 *       requestBody:
 *         description: "이미지 검색용 API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PinRequestPost"
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/PinResponse"
 *   /boards/{boardId}/pins/{pinId}:
 *     get:
 *       summary: "핀 정보 가져오는 API"
 *       tags: [Pin]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/PinResponse"
 *     patch:
 *       summary: "핀 정보 수정하는 API"
 *       tags: [Pin]
 *       requestBody:
 *         description: "이미지 검색용 API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PinRequestPatch"
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/PinResponse"
 *     delete:
 *       summary: "핀 삭제하는 API"
 *       tags: [Pin]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/PinResponse"
 */
