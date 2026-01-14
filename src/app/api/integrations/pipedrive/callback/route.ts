import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { exchangePipedriveCode, syncToPipedrive } from "@/lib/integrations/pipedrive";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const forecastId = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/results/${forecastId}?error=pipedrive_auth_failed`, request.url)
    );
  }

  if (!code || !forecastId) {
    return NextResponse.redirect(
      new URL(`/results/${forecastId}?error=missing_params`, request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokens = await exchangePipedriveCode(code);

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

    // Sync to Pipedrive
    const { dealId } = await syncToPipedrive(forecast, tokens.accessToken, tokens.apiDomain);

    // Save integration
    await prisma.crmIntegration.upsert({
      where: {
        forecastId_provider: {
          forecastId,
          provider: "PIPEDRIVE",
        },
      },
      create: {
        forecastId,
        provider: "PIPEDRIVE",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        syncStatus: "SYNCED",
        lastSyncAt: new Date(),
        externalDealId: dealId.toString(),
      },
      update: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenExpiresAt: tokens.expiresAt,
        syncStatus: "SYNCED",
        lastSyncAt: new Date(),
        externalDealId: dealId.toString(),
      },
    });

    return NextResponse.redirect(
      new URL(`/results/${forecastId}?synced=pipedrive`, request.url)
    );
  } catch (err) {
    console.error("Pipedrive callback error:", err);
    return NextResponse.redirect(
      new URL(`/results/${forecastId}?error=pipedrive_sync_failed`, request.url)
    );
  }
}
