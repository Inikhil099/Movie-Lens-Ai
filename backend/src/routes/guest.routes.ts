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

const maxAge = 1000 * 60 * 60 * 24 * 3;

const guestTokenSecret = "thisisfortheguesttokensecret099"

// return a token to the user if user is not logged in (guest user)
router.get(
  "/token",
  asyncHandler((req: Request, res: Response) => {
    const token = jwt.sign({ credits: 2 }, guestTokenSecret);
    return res.status(200).json({ token });
  }),
);

router.post(
  "/movie/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

     let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).send("Invalid token");
    }

    const payload = jwt.verify(token, guestTokenSecret);

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
    //@ts-ignore
    const newtoken = jwt.sign({ credits: payload.credits - 1 }, guestTokenSecret)

    

    return res.status(200).json({ movieDetails: movieDetails.data,token:newtoken });
  }),
);

export { router as GuestRouter };
