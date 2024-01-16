import express, { type RequestHandler } from "express";
import multer from "multer";
import searchController from "src/controllers/search.controller";
import { auth } from "src/middleware/auth";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB (adjust as needed)
  },
});

const router = express.Router();

router.post(
  "/",
  auth,
  upload.single("image"),
  searchController.search as RequestHandler,
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: "Search"
 *   description: "이미지 검색용 API"
 * paths:
 *   /search:
 *     post:
 *       summary: "이미지 검색용 API"
 *       tags: [Search]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *       responses:
 *         200:
 *           description: "성공적인 응답"
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/SearchResult"
 *
 * components:
 *   schemas:
 *     SearchResult:
 *       type: object
 *       properties:
 *         localizedObjectAnnotations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "검색된 물건의 이름"
 *               score:
 *                 type: number
 *                 description: "검색된 물건의 점수"
 *               vertices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     x:
 *                       type: number
 *                       description: "X 좌표"
 *                     y:
 *                       type: number
 *                       description: "Y 좌표"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: "검색된 제품의 아이디 (핀을 새로 만들때 제품 아이디를 같이 보내줘야 함..!!)"
 *                     name:
 *                       type: string
 *                       description: "검색된 제품의 이름"
 *                     score:
 *                       type: number
 *                       description: "검색된 제품의 점수"
 *                     image:
 *                       type: string
 *                       description: "검색된 제품의 이미지 링크"
 *                     link:
 *                       type: string
 *                       description: "검색된 제품의 아마존 링크"
 *                     price:
 *                       type: number
 *                       description: "검색된 제품의 가격 (USD)"
 *                     rating:
 *                       type: number
 *                       description: "검색된 제품의 평점"
 */
