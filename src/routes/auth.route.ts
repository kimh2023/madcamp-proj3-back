import express, { type RequestHandler } from "express";
import authController from "src/controllers/auth.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router.post("/signup", authController.signup as RequestHandler);
router.post("/login", authController.login as RequestHandler);
router.post("/logout", authController.logout as RequestHandler);
router.post("/refresh", auth, authController.refreshToken as RequestHandler);

module.exports = router;
