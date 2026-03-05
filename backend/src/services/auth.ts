import jwt from "jsonwebtoken";
import type { ReqUser } from "../types/globals.js";

export function setUser(user: ReqUser) {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "3d" });
}

export function getUser(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
