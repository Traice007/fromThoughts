export type CrmProvider = "HUBSPOT" | "PIPEDRIVE";
export type SyncStatus = "NOT_SYNCED" | "SYNCING" | "SYNCED" | "FAILED";

export interface CrmIntegration {
  id: string;
  forecastId: string;
  provider: CrmProvider;
  syncStatus: SyncStatus;
  lastSyncAt: string | null;
  syncError: string | null;
  externalDealId: string | null;
}

export interface HubSpotTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface PipedriveTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  api_domain: string;
}

export interface HubSpotDeal {
  id: string;
  properties: {
    dealname: string;
    amount: string;
    dealstage: string;
    closedate: string;
    pipeline: string;
  };
}

export interface PipedriveDeal {
  id: number;
  title: string;
  value: number;
  currency: string;
  status: string;
  stage_id: number;
}

export interface OAuthState {
  forecastId: string;
  redirectUri: string;
}
