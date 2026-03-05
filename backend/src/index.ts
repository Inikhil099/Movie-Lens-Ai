import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./routes/auth.routes.js";
import { UserRouter } from "./routes/user.routes.js";
import { MovieRouter } from "./routes/movie.routes.js";
import { PaymentRouter } from "./routes/payment.routes.js";
import { GuestRouter } from "./routes/guest.routes.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app: Application = express();
const maxAge = 3 * 24 * 60 * 60 * 1000;
const allowedOrigins = [process.env.FRONTEND_UR!, "http://localhost:8081"];

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    maxAge,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/api/movie", MovieRouter);
app.use("/api/payment",PaymentRouter)
app.use("/api/guest",GuestRouter)

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({ status: "ok", msg: "Server is running" });
});

app.listen(PORT, () => {
  console.log("app running on http://localhost:" + PORT);
});


//  # DATABASE_URL="postgres://4cb9e79d7114c26ddddbd6be9b13f4f8813df69104818f2d8fd69652ae85e59a:sk_-zPePETw7GYp80HB-xV-K@db.prisma.io:5432/postgres?sslmode=require"
