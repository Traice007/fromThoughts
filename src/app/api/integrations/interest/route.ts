import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const { forecastId, crm } = await request.json();

    if (!forecastId || !crm) {
      return NextResponse.json(
        { error: "forecastId and crm are required" },
        { status: 400 }
      );
    }

    // Verify forecast exists and enforce ownership:
    // if the forecast belongs to a user, only that user may record interest.
    // Anonymous forecasts (userId = null) are accessible to anyone who knows the ID.
    const forecast = await prisma.forecast.findUnique({
      where: { id: forecastId },
      select: { userId: true },
    });

    if (!forecast) {
      return NextResponse.json({ error: "Forecast not found" }, { status: 404 });
    }

    if (forecast.userId) {
      const user = await getCurrentUser();
      if (!user || user.id !== forecast.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
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
