import { NextRequest, NextResponse } from "next/server";
import { getPipedriveAuthUrl } from "@/lib/integrations/pipedrive";

export async function GET(request: NextRequest) {
  const forecastId = request.nextUrl.searchParams.get("forecastId");

  if (!forecastId) {
    return NextResponse.json(
      { error: "Forecast ID is required" },
      { status: 400 }
    );
  }

  if (!process.env.PIPEDRIVE_CLIENT_ID) {
    return NextResponse.json(
      { error: "Pipedrive integration not configured" },
      { status: 500 }
    );
  }

  const authUrl = getPipedriveAuthUrl(forecastId);

  return NextResponse.json({ authUrl });
}
