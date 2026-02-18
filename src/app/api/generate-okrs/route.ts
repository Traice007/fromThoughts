import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateOkrs } from "@/lib/ai";
import { sendGenerationFailureAlert } from "@/lib/email";

// AI generation can take 15-30s — extend beyond the default 10s timeout
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { forecastId } = await request.json();

    if (!forecastId) {
      return NextResponse.json(
        { error: "Forecast ID is required" },
        { status: 400 }
      );
    }

    // Get forecast
    const forecast = await prisma.forecast.findUnique({
      where: { id: forecastId },
    });

    if (!forecast) {
      return NextResponse.json(
        { error: "Forecast not found" },
        { status: 404 }
      );
    }

    // Update status to processing
    await prisma.forecast.update({
      where: { id: forecastId },
      data: { status: "PROCESSING" },
    });

    try {
      // Generate OKRs using AI
      const result = await generateOkrs(forecast);

      // Save OKRs to database (parallel)
      await Promise.all(
        result.okrs.map((okr) =>
          prisma.okr.create({
            data: {
              forecastId,
              objective: okr.objective,
              category: okr.category,
              priority: okr.priority,
              timeframe: okr.timeframe,
              rationale: okr.rationale,
              howToAchieve: okr.howToAchieve,
              keyResults: {
                create: okr.keyResults.map((kr) => ({
                  description: kr.description,
                  metricName: kr.metricName,
                  currentValue: kr.currentValue,
                  targetValue: kr.targetValue,
                  unit: kr.unit,
                })),
              },
            },
          })
        )
      );

      // Update forecast with results (serialize JSON for SQLite)
      await prisma.forecast.update({
        where: { id: forecastId },
        data: {
          status: "COMPLETED",
          gapAnalysis: JSON.stringify(result.gapAnalysis),
          recommendations: JSON.stringify(result.recommendations),
          aiModelUsed: "llama-3.3-70b-versatile",
          tokensUsed: result.tokensUsed,
          processingTimeMs: result.processingTimeMs,
        },
      });

      return NextResponse.json({ success: true, forecastId });
    } catch (aiError) {
      // Detailed error logging for debugging
      const errorMessage = aiError instanceof Error ? aiError.message : "Unknown AI error";
      const errorStack = aiError instanceof Error ? aiError.stack : undefined;
      console.error("AI generation error:", {
        message: errorMessage,
        forecastId,
      });

      // Update status to failed
      await prisma.forecast.update({
        where: { id: forecastId },
        data: { status: "FAILED" },
      });

      // Alert via email so you know when generation fails
      await sendGenerationFailureAlert(forecastId, errorMessage);

      return NextResponse.json(
        { error: `Failed to generate OKRs: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in generate-okrs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
