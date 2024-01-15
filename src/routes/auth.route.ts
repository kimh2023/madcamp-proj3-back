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
 *   name: Auth
 *   description: API for Authentication
 * paths:
 *   /auth/signup:
 *     post:
 *       summary: Signup API
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthRequest"
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResponse"
 *
 *   /auth/verify:
 *     get:
 *       summary: Email Verification API
 *       tags: [Auth]
 *       parameters:
 *         - in: query
 *           name: token
 *           required: true
 *           description: Email verification token
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResponse"
 *
 *   /auth/login:
 *     post:
 *       summary: Login API
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/AuthRequest"
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResponse"
 *
 *   /auth/refresh:
 *     post:
 *       summary: Refresh API
 *       tags: [Auth]
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           required: true
 *           description: Bearer token for authentication
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AuthResponse"
 */
