import express from "express";
import userController from "src/controllers/user.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router
  .route("/:userId")
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser);

module.exports = router;
