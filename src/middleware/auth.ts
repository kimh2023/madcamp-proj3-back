import { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UserRepository } from "src/repositories";
import { type RequestHandlerDto, catchAsync } from "src/utils/catchAsync";

const path = require("path");
const publicKeyPath: string = path.join(__dirname, "../certs/public.key");
const publicKey = fs.readFileSync(publicKeyPath);

export const auth: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized: missing or invalid token");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;

    const tokenId = Number(decoded.id as string);

    (req as any).user = tokenId;
    const user = await UserRepository.findOne({
      where: { _id: tokenId, isVerified: true },
    });
    if (user === null) {
      res
        .status(404)
        .json({ success: false, message: "Unauthorized: no such user." });
    } else {
      next();
    }
  },
);

export const authUser: RequestHandlerDto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("Unauthorized: missing or invalid token");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;

    const tokenId = Number(decoded.id as string);
    const paramId = Number(req.params.userId);

    (req as any).user = tokenId;
    const user = await UserRepository.findOne({
      where: { _id: tokenId, isVerified: true },
    });

    if (paramId !== tokenId) {
      res.status(400).json({
        success: false,
        message: "Unauthorized: not the correct user",
      });
    } else if (user === null) {
      res
        .status(404)
        .json({ success: false, message: "Unauthorized: no such user" });
    } else {
      next();
    }
  },
);
