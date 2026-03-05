import { Router } from "express";
import { asyncHandler } from "../util/asyncHandler.js";
import { getAiSummary, getMovieDetails, } from "../controller/movie.controller.js";
import { ProtectRoutes } from "../middleware/protectRoute.js";
const router = Router();
router.get("/:id", ProtectRoutes, asyncHandler(getMovieDetails)); // get movie detils
router.post("/ai-summary", ProtectRoutes, asyncHandler(getAiSummary)); // get the ai summary of the movie
export { router as MovieRouter };
//# sourceMappingURL=movie.routes.js.map