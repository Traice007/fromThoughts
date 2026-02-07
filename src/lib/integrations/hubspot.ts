import type { Forecast, Okr, KeyResult } from "@prisma/client";

const HUBSPOT_AUTH_URL = "https://app.hubspot.com/oauth/authorize";
const HUBSPOT_TOKEN_URL = "https://api.hubapi.com/oauth/v1/token";
const HUBSPOT_API_URL = "https://api.hubapi.com";

export interface HubSpotTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export function getHubSpotAuthUrl(forecastId: string): string {
  const clientId = process.env.HUBSPOT_CLIENT_ID;
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/hubspot/callback`;

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    scope: "crm.objects.deals.read crm.objects.deals.write crm.objects.contacts.read",
    state: forecastId,
  });

  return `${HUBSPOT_AUTH_URL}?${params}`;
}

export async function exchangeHubSpotCode(code: string): Promise<HubSpotTokens> {
  const response = await fetch(HUBSPOT_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri: process.env.HUBSPOT_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/hubspot/callback`,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HubSpot token exchange failed: ${error}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
  };
}

export async function refreshHubSpotToken(refreshToken: string): Promise<HubSpotTokens> {
  const response = await fetch(HUBSPOT_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("HubSpot token refresh failed");
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
  };
}

interface ForecastWithOkrs extends Forecast {
  okrs: (Okr & { keyResults: KeyResult[] })[];
}

export async function syncToHubSpot(
  forecast: ForecastWithOkrs,
  accessToken: string
): Promise<{ dealId: string }> {
  // Create deal
  const dealResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/deals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      properties: {
        dealname: `${forecast.companyName || "Company"} - FromThoughts Forecast`,
        amount: forecast.targetRevenue.toString(),
        dealstage: "appointmentscheduled",
        pipeline: "default",
        description: buildDealDescription(forecast),
      },
    }),
  });

  if (!dealResponse.ok) {
    const error = await dealResponse.text();
    throw new Error(`HubSpot deal creation failed: ${error}`);
  }

  const deal = await dealResponse.json();
  return { dealId: deal.id };
}

function buildDealDescription(forecast: ForecastWithOkrs): string {
  let description = `FromThoughts Revenue Forecast\n\n`;
  description += `Current ARR: $${forecast.currentRevenue.toLocaleString()}\n`;
  description += `Target ARR: $${forecast.targetRevenue.toLocaleString()}\n`;
  description += `Timeline: ${forecast.timeHorizonMonths} months\n\n`;

  description += `OKRs Generated:\n`;
  forecast.okrs.forEach((okr, index) => {
    description += `\n${index + 1}. ${okr.objective}\n`;
    okr.keyResults.forEach((kr) => {
      description += `   - ${kr.description}: ${kr.targetValue}${kr.unit}\n`;
    });
  });

  return description;
}
