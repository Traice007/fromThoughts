import { NextRequest, NextResponse } from "next/server";
import { getHubSpotAuthUrl } from "@/lib/integrations/hubspot";

export async function GET(request: NextRequest) {
  const forecastId = request.nextUrl.searchParams.get("forecastId");

  if (!forecastId) {
    return NextResponse.json(
      { error: "Forecast ID is required" },
      { status: 400 }
    );
  }

  if (!process.env.HUBSPOT_CLIENT_ID) {
    return NextResponse.json(
      { error: "HubSpot integration not configured" },
      { status: 500 }
    );
  }

  const authUrl = getHubSpotAuthUrl(forecastId);

  return NextResponse.json({ authUrl });
}
