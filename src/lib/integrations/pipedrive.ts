import type { Forecast, Okr, KeyResult } from "@prisma/client";

const PIPEDRIVE_AUTH_URL = "https://oauth.pipedrive.com/oauth/authorize";
const PIPEDRIVE_TOKEN_URL = "https://oauth.pipedrive.com/oauth/token";

export interface PipedriveTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  apiDomain: string;
}

export function getPipedriveAuthUrl(forecastId: string): string {
  const clientId = process.env.PIPEDRIVE_CLIENT_ID;
  const redirectUri = process.env.PIPEDRIVE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/pipedrive/callback`;

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    state: forecastId,
  });

  return `${PIPEDRIVE_AUTH_URL}?${params}`;
}

export async function exchangePipedriveCode(code: string): Promise<PipedriveTokens> {
  const redirectUri = process.env.PIPEDRIVE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/pipedrive/callback`;

  const response = await fetch(PIPEDRIVE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.PIPEDRIVE_CLIENT_ID}:${process.env.PIPEDRIVE_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pipedrive token exchange failed: ${error}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
    apiDomain: data.api_domain,
  };
}

export async function refreshPipedriveToken(refreshToken: string): Promise<PipedriveTokens> {
  const response = await fetch(PIPEDRIVE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.PIPEDRIVE_CLIENT_ID}:${process.env.PIPEDRIVE_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Pipedrive token refresh failed");
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
    apiDomain: data.api_domain,
  };
}

interface ForecastWithOkrs extends Forecast {
  okrs: (Okr & { keyResults: KeyResult[] })[];
}

export async function syncToPipedrive(
  forecast: ForecastWithOkrs,
  accessToken: string,
  apiDomain: string
): Promise<{ dealId: number }> {
  // Create deal
  const dealResponse = await fetch(`${apiDomain}/api/v1/deals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: `${forecast.companyName || "Company"} - fromThoughts Forecast`,
      value: forecast.targetRevenue,
      currency: "USD",
    }),
  });

  if (!dealResponse.ok) {
    const error = await dealResponse.text();
    throw new Error(`Pipedrive deal creation failed: ${error}`);
  }

  const deal = await dealResponse.json();
  const dealId = deal.data.id;

  // Add note with OKRs
  await fetch(`${apiDomain}/api/v1/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      deal_id: dealId,
      content: buildNoteContent(forecast),
    }),
  });

  return { dealId };
}

function buildNoteContent(forecast: ForecastWithOkrs): string {
  let content = `<h2>fromThoughts Revenue Forecast</h2>`;
  content += `<p><strong>Current ARR:</strong> $${forecast.currentRevenue.toLocaleString()}</p>`;
  content += `<p><strong>Target ARR:</strong> $${forecast.targetRevenue.toLocaleString()}</p>`;
  content += `<p><strong>Timeline:</strong> ${forecast.timeHorizonMonths} months</p>`;

  content += `<h3>Generated OKRs</h3><ol>`;
  forecast.okrs.forEach((okr) => {
    content += `<li><strong>${okr.objective}</strong><ul>`;
    okr.keyResults.forEach((kr) => {
      content += `<li>${kr.description}: ${kr.targetValue}${kr.unit}</li>`;
    });
    content += `</ul></li>`;
  });
  content += `</ol>`;

  return content;
}
