import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { calculateMetrics } from "@/lib/pipeline/metrics-calculator";
import type { ParsedDeal } from "@/lib/pipeline/csv-parser";

interface ImportRequestBody {
  deals: ParsedDeal[];
  source: "csv" | "paste";
  fileName?: string;
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: ImportRequestBody = await request.json();
    const { deals, source, fileName } = body;

    if (!deals || !Array.isArray(deals) || deals.length === 0) {
      return NextResponse.json(
        { error: "At least one deal is required" },
        { status: 400 }
      );
    }

    if (deals.length > 500) {
      return NextResponse.json(
        { error: "Maximum 500 deals per import" },
        { status: 400 }
      );
    }

    const metrics = calculateMetrics(deals);

    const pipelineImport = await prisma.pipelineImport.create({
      data: {
        userId: user.id,
        source: source || "csv",
        fileName: fileName || null,
        totalDeals: metrics.totalDeals,
        totalValue: metrics.totalValue,
        avgDealSize: metrics.avgDealSize,
        avgSalesCycleDays: metrics.avgSalesCycleDays,
        deals: {
          create: deals.map((deal) => ({
            dealName: deal.dealName,
            stage: deal.stage,
            value: deal.value,
            closeDate: deal.closeDate ? new Date(deal.closeDate) : null,
            createdDate: deal.createdDate ? new Date(deal.createdDate) : null,
            contactName: deal.contactName,
            companyName: deal.companyName,
            probability: deal.probability,
            notes: deal.notes,
          })),
        },
      },
    });

    return NextResponse.json({
      importId: pipelineImport.id,
      metrics,
    });
  } catch (error) {
    console.error("Pipeline import error:", error);
    return NextResponse.json(
      { error: "Failed to import pipeline data" },
      { status: 500 }
    );
  }
}
