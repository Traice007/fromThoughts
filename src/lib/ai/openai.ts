import OpenAI from "openai";
import type { Forecast } from "@prisma/client";
import { buildOkrPrompt, OKR_OUTPUT_SCHEMA } from "./prompts";
import type { GeneratedOkrResponse } from "./groq";

// Lazy initialization to avoid build errors when env var is missing
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is required");
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function generateOkrsWithOpenAI(forecast: Forecast): Promise<GeneratedOkrResponse> {
  const startTime = Date.now();
  const prompt = buildOkrPrompt(forecast);
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a strategic revenue operations advisor with deep expertise in B2B SaaS growth. Provide actionable, specific recommendations backed by industry benchmark data. Always respond with valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const processingTimeMs = Date.now() - startTime;
  const tokensUsed = response.usage?.total_tokens || 0;

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response content from OpenAI");
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(`OpenAI returned malformed JSON. Raw response: ${content.slice(0, 200)}`);
  }

  // Validate and transform the response
  type RawOkr = {
    objective: string;
    category: string;
    priority: number;
    timeframe: string;
    howToAchieve?: string;
    rationale?: string;
    keyResults: {
      description: string;
      metricName: string;
      currentValue?: number | null;
      targetValue: number;
      unit: string;
    }[];
  };

  const okrs: GeneratedOkrResponse["okrs"] = (parsed.okrs as RawOkr[]).map((okr) => ({
    objective: okr.objective,
    category: okr.category as import("@/types/forecast").OkrCategory,
    priority: okr.priority,
    timeframe: okr.timeframe,
    howToAchieve: okr.howToAchieve || null,
    rationale: okr.rationale || null,
    keyResults: okr.keyResults.map((kr) => ({
      description: kr.description,
      metricName: kr.metricName,
      currentValue: kr.currentValue ?? null,
      targetValue: kr.targetValue,
      unit: kr.unit,
    })),
  }));

  return {
    okrs,
    gapAnalysis: parsed.gapAnalysis as GeneratedOkrResponse["gapAnalysis"],
    recommendations: parsed.recommendations as string[],
    tokensUsed,
    processingTimeMs,
  };
}
