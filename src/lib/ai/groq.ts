import Groq from "groq-sdk";
import type { Forecast } from "@prisma/client";
import type { OkrCategory } from "@/types/forecast";
import { buildOkrPrompt } from "./prompts";

// Lazy initialization to avoid build errors when env var is missing
function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY environment variable is required");
  }
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

export interface GeneratedOkr {
  objective: string;
  category: OkrCategory;
  priority: number;
  timeframe: string;
  howToAchieve: string | null;
  rationale: string | null;
  keyResults: {
    description: string;
    metricName: string;
    currentValue: number | null;
    targetValue: number;
    unit: string;
  }[];
}

export interface GeneratedOkrResponse {
  okrs: GeneratedOkr[];
  gapAnalysis: {
    revenueGap: number;
    requiredGrowthRate: number;
    pipelineGap?: number;
    conversionGaps?: {
      stage: string;
      currentRate: number;
      requiredRate: number;
    }[];
    summary: string;
  };
  recommendations: string[];
  tokensUsed: number;
  processingTimeMs: number;
}

export async function generateOkrsWithGroq(forecast: Forecast): Promise<GeneratedOkrResponse> {
  const startTime = Date.now();
  const prompt = buildOkrPrompt(forecast);
  const groq = getGroqClient();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a strategic revenue operations advisor. Always respond with valid JSON.",
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
    throw new Error("No response content from Groq");
  }

  const parsed = JSON.parse(content);

  // Validate and transform the response
  const okrs: GeneratedOkr[] = parsed.okrs.map((okr: GeneratedOkr) => ({
    objective: okr.objective,
    category: okr.category as OkrCategory,
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
    gapAnalysis: parsed.gapAnalysis,
    recommendations: parsed.recommendations,
    tokensUsed,
    processingTimeMs,
  };
}
