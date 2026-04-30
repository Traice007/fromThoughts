import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import {
  getValidTokens,
  fetchPipedriveStages,
  fetchAllPipedriveDeals,
  mapPipedriveDeals,
} from "@/lib/integrations/pipedrive";
import { calculateMetrics } from "@/lib/pipeline/metrics-calculator";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const integration = await prisma.userIntegration.findUnique({
    where: { userId_provider: { userId: user.id, provider: "PIPEDRIVE" } },
  });

  if (!integration) {
    return NextResponse.json({ error: "Pipedrive not connected" }, { status: 400 });
  }

  if (integration.syncStatus === "SYNCING") {
    return NextResponse.json({ error: "Sync already in progress" }, { status: 409 });
  }

  try {
    await prisma.userIntegration.update({
      where: { id: integration.id },
      data: { syncStatus: "SYNCING" },
    });

    const { accessToken, apiDomain } = await getValidTokens(user.id);

    const [stageMap, pipedriveDeals] = await Promise.all([
      fetchPipedriveStages(accessToken, apiDomain),
      fetchAllPipedriveDeals(accessToken, apiDomain),
    ]);

    const deals = mapPipedriveDeals(pipedriveDeals, stageMap);

    if (deals.length === 0) {
      await prisma.userIntegration.update({
        where: { id: integration.id },
        data: { syncStatus: "IDLE", syncError: null, lastSyncAt: new Date() },
      });
      return NextResponse.json({ importId: null, dealCount: 0 });
    }

    const metrics = calculateMetrics(deals);

    const pipelineImport = await prisma.pipelineImport.create({
      data: {
        userId: user.id,
        source: "pipedrive",
        fileName: "Pipedrive",
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

    await prisma.userIntegration.update({
      where: { id: integration.id },
      data: { syncStatus: "IDLE", syncError: null, lastSyncAt: new Date() },
    });

    return NextResponse.json({
      importId: pipelineImport.id,
      dealCount: metrics.totalDeals,
      totalValue: metrics.totalValue,
      avgDealSize: metrics.avgDealSize,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Pipedrive sync error:", error);

    await prisma.userIntegration
      .update({
        where: { id: integration.id },
        data: { syncStatus: "ERROR", syncError: message },
      })
      .catch(() => {});

    return NextResponse.json({ error: "Sync failed", details: message }, { status: 500 });
  }
}
