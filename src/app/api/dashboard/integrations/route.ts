import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { crm } = await request.json();

    if (!crm) {
      return NextResponse.json(
        { error: "crm is required" },
        { status: 400 }
      );
    }

    // Find the user's most recent forecast to attach the preference to.
    // If they don't have one yet, create a placeholder forecast.
    let forecast = await prisma.forecast.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true },
    });

    if (!forecast) {
      forecast = await prisma.forecast.create({
        data: {
          userId: user.id,
          email: user.email ?? "",
          currentRevenue: 0,
          targetRevenue: 0,
          timeHorizonMonths: 12,
          status: "PENDING",
        },
        select: { id: true },
      });
    }

    await prisma.crmIntegration.upsert({
      where: {
        forecastId_provider: {
          forecastId: forecast.id,
          provider: crm.toUpperCase(),
        },
      },
      create: {
        forecastId: forecast.id,
        provider: crm.toUpperCase(),
        syncStatus: "NOT_SYNCED",
      },
      update: {
        provider: crm.toUpperCase(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Integration preference error:", error);
    return NextResponse.json({ success: true });
  }
}
