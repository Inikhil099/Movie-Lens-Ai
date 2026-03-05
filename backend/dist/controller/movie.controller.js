import axios from "axios";
import { prisma } from "../lib/prisma.js";
import { GenerateSummary } from "../gemini/gemini.js";
export async function getMovieDetails(req, res) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
    });
    if (user?.credits == 0) {
        return res.status(400).send("Purchase more credits to get more details");
    }
    const movieDetails = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=e42963c2`);
    if (!movieDetails) {
        return res.status(404).send("Movie not found or invalid ID");
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: req.user.id,
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
export async function getAiSummary(req, res) {
    const { moviename } = req.body;
    const summary = await GenerateSummary(moviename);
    return res.status(200).json({ summary });
}
//# sourceMappingURL=movie.controller.js.map