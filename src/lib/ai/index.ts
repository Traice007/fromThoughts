import type { Forecast } from "@prisma/client";
import { generateOkrsWithGroq, type GeneratedOkrResponse } from "./groq";
import { generateOkrsWithOpenAI } from "./openai";

export type { GeneratedOkrResponse };

export async function generateOkrs(forecast: Forecast): Promise<GeneratedOkrResponse> {
  const provider = process.env.AI_PROVIDER || "openai";

  if (provider === "groq") {
    return generateOkrsWithGroq(forecast);
  }

  if (provider === "openai") {
    return generateOkrsWithOpenAI(forecast);
  }

  // Default to OpenAI (smarter model)
  return generateOkrsWithOpenAI(forecast);
}
