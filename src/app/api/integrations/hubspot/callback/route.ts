import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { exchangeHubSpotCode, syncToHubSpot } from "@/lib/integrations/hubspot";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const forecastId = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/results/${forecastId}?error=hubspot_auth_failed`, request.url)
    );
  }

  if (!code || !forecastId) {
    return NextResponse.redirect(
      new URL(`/results/${forecastId}?error=missing_params`, request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokens = await exchangeHubSpotCode(code);

    // Get forecast with OKRs
    const forecast = await prisma.forecast.findUnique({
      where: { id: forecastId },
      include: {
        okrs: {
          include: { keyResults: true },
        },
      },
    });

    if (!forecast) {
      return NextResponse.redirect(
        new URL(`/results/${forecastId}?error=forecast_not_found`, request.url)
      );
    }

    // Sync to HubSpot
    const { dealId } = await syncToHubSpot(forecast, tokens.accessToken);

    // Save integration
    await prisma.crmIntegration.upsert({
      where: {
        forecastId_provider: {
          forecastId,
          provider: "HUBSPOT",
        },
      },
      create: {
        forecastId,
        provider: "HUBSPOT",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        syncStatus: "SYNCED",
        lastSyncAt: new Date(),
        externalDealId: dealId,
      },
      update: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        syncStatus: "SYNCED",
        lastSyncAt: new Date(),
        externalDealId: dealId,
      },
    });

    return NextResponse.redirect(
      new URL(`/results/${forecastId}?synced=hubspot`, request.url)
    );
  } catch (err) {
    console.error("HubSpot callback error:", err);
    return NextResponse.redirect(
      new URL(`/results/${forecastId}?error=hubspot_sync_failed`, request.url)
    );
  }
}
