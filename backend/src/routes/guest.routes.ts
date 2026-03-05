import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { getMovieDetails } from "../controller/movie.controller.js";
import { asyncHandler } from "../util/asyncHandler.js";
import jwt from "jsonwebtoken";
import axios from "axios";
const router = Router();

// return a token to the user if user is not logged in (guest user)
router.get(
  "/token",
  asyncHandler((req: Request, res: Response) => {
    const token = jwt.sign({ credits: 2 }, process.env.JWT_SECRET!);
    res.cookie("guestToken", token);
    return res.status(200).json({ token });
  }),
);

router.post(
  "/movie/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { guestToken: token } = req.cookies;
    const { id } = req.params;
    if (!token) {
      return res.status(400).send("Invalid token");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    // check if credits not equal to 0 if 0 return with not credits left
    if (!payload) {
      return res.status(400).send("Invalid token");
    }
    //@ts-ignore
    if (payload.credits <= 0) {
      return res.status(400).send("No more credits left. Login in to get more");
    }
    const movieDetails = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=e42963c2`,
    );
    if (!movieDetails) {
      return res.status(404).send("Movie not found or invalid ID");
    }

    // returning new cookie with the decreased value of credits inside the payload

    res.cookie(
      "guestToken",
      //@ts-ignore

      jwt.sign({ credits: payload.credits - 1 }, process.env.JWT_SECRET!),
    );
    return res.status(200).json({ movieDetails: movieDetails.data });
  }),
);

export { router as GuestRouter };
