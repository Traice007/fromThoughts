"use client";

import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface CrmConnectProps {
  forecastId: string;
}

export function CrmConnect({ forecastId }: CrmConnectProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (provider: "hubspot" | "pipedrive") => {
    setConnecting(provider);
    setError(null);

    try {
      const response = await fetch(`/api/integrations/${provider}/auth?forecastId=${forecastId}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setConnecting(null);
        return;
      }

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError("No auth URL returned");
        setConnecting(null);
      }
    } catch (err) {
      console.error(`${provider} connect error:`, err);
      setError("Connection failed. Please try again.");
      setConnecting(null);
    }
  };

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">Sync to Your CRM</h2>
      <p className="text-secondary text-sm mb-6">
        Push your OKRs and forecast data directly to your CRM as deals and notes
      </p>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-lg text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {/* HubSpot */}
        <button
          onClick={() => handleConnect("hubspot")}
          disabled={connecting !== null}
          className="flex items-center justify-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
        >
          {connecting === "hubspot" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.628 1.267 1.984V7.93a5.736 5.736 0 00-3.597 1.98l-6.167-4.79a2.37 2.37 0 00.078-.58 2.348 2.348 0 10-2.348 2.348c.467 0 .898-.142 1.263-.38l6.073 4.72a5.74 5.74 0 00-.427 2.18c0 .778.16 1.519.44 2.197l-1.87 1.87a1.92 1.92 0 00-.614-.102 1.94 1.94 0 100 3.88 1.94 1.94 0 001.94-1.94c0-.22-.038-.43-.103-.627l1.822-1.822a5.76 5.76 0 003.343 1.066 5.76 5.76 0 005.76-5.76 5.76 5.76 0 00-3.707-5.37zm-1.88 8.685a3.32 3.32 0 01-3.316-3.316 3.32 3.32 0 013.316-3.316 3.32 3.32 0 013.316 3.316 3.32 3.32 0 01-3.316 3.316z" />
            </svg>
          )}
          <div className="text-left">
            <p className="font-medium">Connect HubSpot</p>
            <p className="text-xs text-secondary">Create deals & notes</p>
          </div>
        </button>

        {/* Pipedrive */}
        <button
          onClick={() => handleConnect("pipedrive")}
          disabled={connecting !== null}
          className="flex items-center justify-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
        >
          {connecting === "pipedrive" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-3v-3h-3v3h-3v-11h3v5h3v-5h3v11z" />
            </svg>
          )}
          <div className="text-left">
            <p className="font-medium">Connect Pipedrive</p>
            <p className="text-xs text-secondary">Create deals & activities</p>
          </div>
        </button>
      </div>
    </div>
  );
}
