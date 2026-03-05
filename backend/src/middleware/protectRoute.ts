import type { NextFunction, Request, Response } from "express";
import { getUser } from "../services/auth.js";

export function ProtectRoutes(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.uid;
    if (!token) {
      return res.status(401).send("Not authenticated");
    }
    const user = getUser(token);
    if (!user) {
      return res.status(401).send("Not authenticated");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}
