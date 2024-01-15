import express from "express";
import userController from "src/controllers/user.controller";
import { auth, authUser } from "src/middleware/auth";

const router = express.Router();

router
  .route("/:userId")
  .get(auth, userController.getUser)
  .patch(authUser, userController.updateUser)
  .delete(authUser, userController.deleteUser);

module.exports = router;
