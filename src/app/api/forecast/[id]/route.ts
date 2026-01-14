import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const forecast = await prisma.forecast.findUnique({
      where: { id },
      include: {
        okrs: {
          include: {
            keyResults: true,
          },
          orderBy: {
            priority: "desc",
          },
        },
        crmIntegrations: true,
      },
    });

    if (!forecast) {
      return NextResponse.json(
        { error: "Forecast not found" },
        { status: 404 }
      );
    }

    // Parse JSON strings from SQLite
    const response = {
      ...forecast,
      gapAnalysis: forecast.gapAnalysis ? JSON.parse(forecast.gapAnalysis) : null,
      recommendations: forecast.recommendations ? JSON.parse(forecast.recommendations) : null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return NextResponse.json(
      { error: "Failed to fetch forecast" },
      { status: 500 }
    );
  }
}
