import { Router } from "express";
import { asyncHandler } from "../util/asyncHandler.js";
import { ProtectRoutes } from "../middleware/protectRoute.js";
import { CreateOrder, VerifyPayment } from "../controller/payment.controller.js";
const router = Router();
router.post("/create-order", ProtectRoutes, asyncHandler(CreateOrder)); // create an order
router.post("/verify", ProtectRoutes, asyncHandler(VerifyPayment)); // verify the payment to update the user credits
export { router as PaymentRouter };
//# sourceMappingURL=payment.routes.js.map