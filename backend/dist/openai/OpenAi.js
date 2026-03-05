import OpenAI from "openai";
export const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const response = await openAi.responses.create({
    model: "gpt-5.2",
    instructions: "You are a coding assistant that talks like a pirate",
    input: "Are semicolons optional in JavaScript?",
});
console.log(response);
//# sourceMappingURL=OpenAi.js.map