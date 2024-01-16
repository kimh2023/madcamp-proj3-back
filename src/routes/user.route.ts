import express from "express";
import userController from "src/controllers/user.controller";
import { auth, authLoose, authUser } from "src/middleware/auth";

const router = express.Router();

router
  .route("/:userId")
  .get(auth, userController.getUser)
  .patch(authUser, userController.updateUser)
  .delete(authUser, userController.deleteUser);

router.patch("/:userId/signUp", authLoose, userController.updateUser);
router.get("/:userId/verified", userController.getUserVerified);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: "User"
 *   description: "사용자 관련 API"
 * paths:
 *   /users/{userId}:
 *     get:
 *       summary: "사용자 정보 가져오는 API"
 *       tags: [User]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/UserResponse"
 *     patch:
 *       summary: "사용자 정보 수정하는 API"
 *       tags: [User]
 *       requestBody:
 *         description: "이미지 검색용 API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserRequest"
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/UserResponse"
 *     delete:
 *       summary: "사용자 삭제하는 API --> 아마 안 쓸듯..? admin용"
 *       tags: [User]
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/UserResponse"
 */
