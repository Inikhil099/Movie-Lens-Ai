import axios from "axios";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { GenerateSummary } from "../gemini/gemini.js";

export async function getMovieDetails(req: Request, res: Response) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
  });
  if (user?.credits == 0) {
    return res.status(400).send("Purchase more credits to get more details");
  }
  const movieDetails = await axios.get(
    `http://www.omdbapi.com/?i=${id}&apikey=e42963c2`,
  );
  if (!movieDetails) {
    return res.status(404).send("Movie not found or invalid ID");
  }

  const updatedUser = await prisma.user.update({
    where: {
      email: req.user.email,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });

  return res
    .status(200)
    .json({ movieDetails: movieDetails.data, user: updatedUser });
}

export async function getAiSummary(req: Request, res: Response) {
  const { moviename } = req.body;
  const summary = await GenerateSummary(moviename);
  return res.status(200).json({ summary });
}
