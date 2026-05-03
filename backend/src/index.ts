import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./routes/auth.routes.js";
import { UserRouter } from "./routes/user.routes.js";
import { MovieRouter } from "./routes/movie.routes.js";
import { PaymentRouter } from "./routes/payment.routes.js";
import { GuestRouter } from "./routes/guest.routes.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app: Application = express();
const maxAge = 3 * 24 * 60 * 60 * 1000;
const allowedOrigins = [process.env.FRONTEND_URI!, "http://localhost:3000"];

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

// cron.schedule("*/10 * * * *", async () => {
//   try {
//     const res = await fetch(`${process.env.ORIGIN}/health`);
//     console.log("Pinged:", res.status);
//   } catch (err:any) {
//     console.error("Error:", err.message);
//   }
// });

setInterval(
  async () => {
    const f = await fetch(`${process.env.ORIGIN}/health`);
    const data = await f.text();
    console.log(data);
  },
  1000 * 60 * 10,
);

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/api/movie", MovieRouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/guest", GuestRouter);

app.get("/health", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ status: "ok", msg: "Movie Lens Ai Server is running" });
});

app.listen(PORT, () => {
  console.log("app running on http://localhost:" + PORT);
});
