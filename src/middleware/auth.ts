import { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
// import jwt, { type JwtPayload } from "jsonwebtoken";

const path = require("path");
const publicKeyPath: string = path.join(__dirname, "../certs/public.key");
const publicKey = fs.readFileSync(publicKeyPath);

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // const authHeader = req.headers.authorization;

    // if (authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    //   return res.status(401).send("Unauthorized: Missing or invalid token");
    // }

    // const token = authHeader.split(" ")[1];

    // const decoded = jwt.verify(token, publicKey, {
    //   algorithms: ["RS256"],
    // }) as JwtPayload;

    // (req as any).user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
