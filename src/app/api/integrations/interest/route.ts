import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { forecastId, crm } = await request.json();

    if (!forecastId || !crm) {
      return NextResponse.json(
        { error: "forecastId and crm are required" },
        { status: 400 }
      );
    }

    // Store as a CRM integration record with NOT_SYNCED status
    // This lets us query later which CRMs users want most
    await prisma.crmIntegration.upsert({
      where: {
        forecastId_provider: {
          forecastId,
          provider: crm.toUpperCase(),
        },
      },
      create: {
        forecastId,
        provider: crm.toUpperCase(),
        syncStatus: "NOT_SYNCED",
      },
      update: {
        provider: crm.toUpperCase(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CRM interest capture error:", error);
    return NextResponse.json({ success: true }); // Don't surface errors to user
  }
}
