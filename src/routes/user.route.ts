import express from "express";
import userController from "src/controllers/user.controller";

const router = express.Router();

router.get("/:userId", userController.getUser);

module.exports = router;
