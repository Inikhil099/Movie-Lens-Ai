import { Router } from "express";
import { getUserDetails, LogoutUser } from "../controller/user.controller.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { ProtectRoutes } from "../middleware/protectRoute.js";
const router = Router();
router.get("/me", ProtectRoutes, asyncHandler(getUserDetails)); // get the user details 
router.get("/logout", ProtectRoutes, asyncHandler(LogoutUser));
export { router as UserRouter };
//# sourceMappingURL=user.routes.js.map