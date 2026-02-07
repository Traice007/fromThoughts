import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const forecastId = request.nextUrl.searchParams.get("forecastId");

  if (!forecastId) {
    return NextResponse.json(
      { error: "Forecast ID is required" },
      { status: 400 }
    );
  }

  try {
    const forecast = await prisma.forecast.findUnique({
      where: { id: forecastId },
      include: {
        okrs: {
          include: { keyResults: true },
          orderBy: { priority: "desc" },
        },
      },
    });

    if (!forecast) {
      return NextResponse.json(
        { error: "Forecast not found" },
        { status: 404 }
      );
    }

    // Build CSV content
    const rows: string[][] = [];

    // Header
    rows.push([
      "OKR #",
      "Category",
      "Priority",
      "Timeframe",
      "Objective",
      "Key Result",
      "Metric",
      "Current Value",
      "Target Value",
      "Unit",
    ]);

    // Data rows
    forecast.okrs.forEach((okr, okrIndex) => {
      okr.keyResults.forEach((kr, krIndex) => {
        rows.push([
          krIndex === 0 ? (okrIndex + 1).toString() : "",
          krIndex === 0 ? okr.category : "",
          krIndex === 0 ? okr.priority.toString() : "",
          krIndex === 0 ? okr.timeframe : "",
          krIndex === 0 ? okr.objective : "",
          kr.description,
          kr.metricName,
          kr.currentValue?.toString() || "",
          kr.targetValue.toString(),
          kr.unit,
        ]);
      });
    });

    // Convert to CSV string
    const csv = rows
      .map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap in quotes if contains comma
            if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
              return `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
          })
          .join(",")
      )
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="fromthoughts-okrs-${forecastId}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV export error:", error);
    return NextResponse.json(
      { error: "Failed to export CSV" },
      { status: 500 }
    );
  }
}
