import express from "express";
import boardController from "src/controllers/board.controller";
import { auth } from "src/middleware/auth";

const router = express.Router();

router.route("/").post(auth, boardController.createBoard);

router
  .route("/:boardId")
  .get(auth, boardController.getBoard)
  .patch(auth, boardController.updateBoard)
  .delete(auth, boardController.deleteBoard);

module.exports = router;
