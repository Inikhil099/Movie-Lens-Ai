import type { Request, Response } from "express";

export function asyncHandler(callback: Function) {
  return async function (req: Request, res: Response) {
    try {
      const result = await callback(req, res);
      return result;
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  };
}