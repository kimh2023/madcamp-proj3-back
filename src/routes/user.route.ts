import express from "express";
import userController from "src/controllers/user.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router.get("/:userId", auth, userController.getUser);

module.exports = router;
