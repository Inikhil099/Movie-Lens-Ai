import { Router } from "express";
import { handleLogin, handleSignup } from "../controller/auth.controller.js";
import { asyncHandler } from "../util/asyncHandler.js";

const router = Router();

router.post("/signup", asyncHandler(handleSignup));
router.post("/login", asyncHandler(handleLogin));

export { router as AuthRouter };
