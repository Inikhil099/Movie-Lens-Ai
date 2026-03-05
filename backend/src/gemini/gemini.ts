import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function GenerateSummary(moviename: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a movie review analyst.

Analyze the following audience reviews for the movie "${moviename}".

If the reviews are available, summarize the general audience sentiment based on them.

If the reviews are missing or unclear, estimate the likely audience sentiment using the movie's plot, genre, and IMDb rating instead.

Movie Information:
Title: ${moviename}



Write a short 2–3 sentence summary describing the general audience sentiment.

Then classify the overall sentiment as one of these:
Positive
Mixed
Negative

Return the response in this format: because i'll be rendering it as string so it should be well structured and the sentiment should be in a seperate line

Summary:
<summary text>

Sentiment:
<Positive | Mixed | Negative>`,
  });
  return response.text;
}
