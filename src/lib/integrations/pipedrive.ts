import crypto from "crypto";
import type { Forecast, Okr, KeyResult } from "@prisma/client";
import { mapStage } from "@/lib/pipeline/stage-mapper";
import type { ParsedDeal } from "@/lib/pipeline/csv-parser";
import { prisma } from "@/lib/db";

const PIPEDRIVE_AUTH_URL = "https://oauth.pipedrive.com/oauth/authorize";
const PIPEDRIVE_TOKEN_URL = "https://oauth.pipedrive.com/oauth/token";

export interface PipedriveTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  apiDomain: string;
}

// --- OAuth ---

export async function createConnectUrl(userId: string): Promise<string> {
  const clientId = process.env.PIPEDRIVE_CLIENT_ID!;
  const redirectUri =
    process.env.PIPEDRIVE_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/pipedrive/callback`;

  // Delete any stale state tokens for this user before creating a new one
  await prisma.verificationToken.deleteMany({
    where: { identifier: `pipedrive_state:${userId}` },
  });

  const stateToken = crypto.randomBytes(24).toString("hex");
  await prisma.verificationToken.create({
    data: {
      identifier: `pipedrive_state:${userId}`,
      token: stateToken,
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    state: stateToken,
  });

  return `${PIPEDRIVE_AUTH_URL}?${params}`;
}

export async function exchangePipedriveCode(code: string): Promise<PipedriveTokens> {
  const redirectUri =
    process.env.PIPEDRIVE_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/integrations/pipedrive/callback`;

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

// Returns valid credentials, auto-refreshing if the token expires within 5 minutes
export async function getValidTokens(
  userId: string
): Promise<{ accessToken: string; apiDomain: string }> {
  const integration = await prisma.userIntegration.findUnique({
    where: { userId_provider: { userId, provider: "PIPEDRIVE" } },
  });

  if (!integration) {
    throw new Error("Pipedrive not connected");
  }

  const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000);
  const needsRefresh =
    integration.tokenExpiresAt && integration.tokenExpiresAt < fiveMinutesFromNow;

  if (needsRefresh) {
    if (!integration.refreshToken) {
      throw new Error("Pipedrive token expired — please reconnect");
    }
    const refreshed = await refreshPipedriveToken(integration.refreshToken);
    await prisma.userIntegration.update({
      where: { id: integration.id },
      data: {
        accessToken: refreshed.accessToken,
        refreshToken: refreshed.refreshToken,
        tokenExpiresAt: refreshed.expiresAt,
        apiDomain: refreshed.apiDomain,
      },
    });
    return { accessToken: refreshed.accessToken, apiDomain: refreshed.apiDomain };
  }

  return {
    accessToken: integration.accessToken,
    apiDomain: integration.apiDomain ?? "https://api.pipedrive.com",
  };
}

// --- Read functions ---

interface PipedriveStage {
  id: number;
  name: string;
}

interface PipedriveDeal {
  id: number;
  title: string;
  value: number | null;
  currency: string;
  status: "open" | "won" | "lost" | "deleted";
  stage_id: number;
  add_time: string | null;
  close_time: string | null;
  expected_close_date: string | null;
  probability: number | null;
  person_name: string | null;
  org_name: string | null;
}

export async function fetchPipedriveStages(
  accessToken: string,
  apiDomain: string
): Promise<Map<number, string>> {
  const response = await fetch(`${apiDomain}/api/v1/stages`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pipedrive stages: ${response.status}`);
  }

  const data = await response.json();
  const stageMap = new Map<number, string>();
  for (const stage of (data.data as PipedriveStage[]) ?? []) {
    stageMap.set(stage.id, stage.name);
  }
  return stageMap;
}

export async function fetchAllPipedriveDeals(
  accessToken: string,
  apiDomain: string
): Promise<PipedriveDeal[]> {
  const deals: PipedriveDeal[] = [];
  let start = 0;
  const limit = 500;

  while (deals.length < 2000) {
    const response = await fetch(
      `${apiDomain}/api/v1/deals?status=all_not_deleted&limit=${limit}&start=${start}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Pipedrive deals: ${response.status}`);
    }

    const data = await response.json();
    const batch = (data.data as PipedriveDeal[]) ?? [];
    deals.push(...batch);

    const hasMore =
      (data.additional_data?.pagination?.more_items_in_collection as boolean) ?? false;
    if (!hasMore) break;
    start += limit;
  }

  return deals;
}

export function mapPipedriveDeals(
  pipedriveDeals: PipedriveDeal[],
  stageMap: Map<number, string>
): ParsedDeal[] {
  return pipedriveDeals.map((deal) => {
    let stageName: string;
    if (deal.status === "won") {
      stageName = "won";
    } else if (deal.status === "lost") {
      stageName = "lost";
    } else {
      stageName = stageMap.get(deal.stage_id) ?? "lead";
    }

    const stageResult = mapStage(stageName);

    return {
      dealName: deal.title,
      stage: stageResult.canonical,
      stageOriginal: stageName,
      stageWasUnknown: stageResult.wasUnknown,
      value: deal.value ?? 0,
      closeDate: deal.close_time ?? deal.expected_close_date ?? null,
      createdDate: deal.add_time,
      contactName: deal.person_name ?? null,
      companyName: deal.org_name ?? null,
      probability: deal.probability != null ? deal.probability / 100 : null,
      notes: null,
    };
  });
}

// --- Legacy write functions (forecast-to-CRM push) ---

interface ForecastWithOkrs extends Forecast {
  okrs: (Okr & { keyResults: KeyResult[] })[];
}

export async function syncToPipedrive(
  forecast: ForecastWithOkrs,
  accessToken: string,
  apiDomain: string
): Promise<{ dealId: number }> {
  const dealResponse = await fetch(`${apiDomain}/api/v1/deals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: `${forecast.companyName || "Company"} - fromThoughts Forecast`,
      value: forecast.targetRevenue,
      currency: "EUR",
    }),
  });

  if (!dealResponse.ok) {
    const error = await dealResponse.text();
    throw new Error(`Pipedrive deal creation failed: ${error}`);
  }

  const deal = await dealResponse.json();
  const dealId = (deal.data as { id: number }).id;

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
  content += `<p><strong>Current ARR:</strong> €${forecast.currentRevenue.toLocaleString()}</p>`;
  content += `<p><strong>Target ARR:</strong> €${forecast.targetRevenue.toLocaleString()}</p>`;
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
