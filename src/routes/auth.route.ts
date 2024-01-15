import express, { type RequestHandler } from "express";
import authController from "src/controllers/auth.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router.post("/signup", authController.signup as RequestHandler);
router.get("/verify", authController.verify as RequestHandler);
router.post("/login", authController.login as RequestHandler);
router.post("/logout", auth, authController.logout as RequestHandler);
router.post("/refresh", auth, authController.refresh as RequestHandler);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: "Auth"
 *   description: "로그인 용 API"
 * paths:
 *   /auth/signup:
 *     post:
 *       summary: "signup API"
 *       tags: [Auth]
 *       requestBody:
 *         description: "signup API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: must be unique
 *                 password:
 *                   type: string
 *                   description: must be at least 8 characters
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResult"
 *   /auth/verify:
 *     post:
 *       summary: "email verification API"
 *       tags: [Auth]
 *       requestBody:
 *         description: "email verification API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: email verification token
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResult"
 *
 *   /auth/login:
 *     post:
 *       summary: "login API"
 *       tags: [Auth]
 *       requestBody:
 *         description: "login API"
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   description: must be at least 8 characters
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResult"
 *
 *   /auth/refresh:
 *     post:
 *       summary: "refresh API"
 *       tags: [Auth]
 *       requestBody:
 *         description: "refresh API"
 *         required: true
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResult"
 *
 * components:
 *   schemas:
 *     AuthResult:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *           description: describes status of operation
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: user id
 *             email:
 *               type: string
 *               format: email
 *         token:
 *           type: string
 *           description: jwt token for authentication
 */
