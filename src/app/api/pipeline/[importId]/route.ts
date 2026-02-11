import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { calculateMetrics } from "@/lib/pipeline/metrics-calculator";
import type { ParsedDeal } from "@/lib/pipeline/csv-parser";
import type { CanonicalStage } from "@/lib/pipeline/stage-mapper";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ importId: string }> }
) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { importId } = await params;

  const pipelineImport = await prisma.pipelineImport.findUnique({
    where: { id: importId },
    include: { deals: true },
  });

  if (!pipelineImport) {
    return NextResponse.json({ error: "Import not found" }, { status: 404 });
  }

  if (pipelineImport.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Recompute metrics from stored deals
  const parsedDeals: ParsedDeal[] = pipelineImport.deals.map((deal) => ({
    dealName: deal.dealName,
    stage: deal.stage as CanonicalStage,
    stageOriginal: deal.stage,
    stageWasUnknown: false,
    value: deal.value,
    closeDate: deal.closeDate?.toISOString() ?? null,
    createdDate: deal.createdDate?.toISOString() ?? null,
    contactName: deal.contactName,
    companyName: deal.companyName,
    probability: deal.probability,
    notes: deal.notes,
  }));

  const metrics = calculateMetrics(parsedDeals);

  return NextResponse.json({
    id: pipelineImport.id,
    source: pipelineImport.source,
    fileName: pipelineImport.fileName,
    importedAt: pipelineImport.importedAt,
    deals: pipelineImport.deals,
    metrics,
  });
}
