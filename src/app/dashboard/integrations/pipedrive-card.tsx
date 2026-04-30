"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, RefreshCw, Unlink, ArrowRight, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PipedriveCardProps {
  connected: boolean;
  lastSyncAt: string | null;
  syncStatus: string | null;
  syncError: string | null;
}

export function PipedriveCard({
  connected,
  lastSyncAt,
  syncStatus,
  syncError,
}: PipedriveCardProps) {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    importId: string;
    dealCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(syncError ?? null);

  const handleSync = async () => {
    setSyncing(true);
    setError(null);
    setSyncResult(null);

    try {
      const res = await fetch("/api/integrations/pipedrive/sync", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.details ?? data.error ?? "Sync failed");
        return;
      }

      if (data.dealCount === 0) {
        setError("No deals found in Pipedrive. Add some deals first and try again.");
        router.refresh();
        return;
      }

      setSyncResult({ importId: data.importId, dealCount: data.dealCount });
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("Disconnect Pipedrive? Your synced data stays in fromThoughts.")) return;
    setDisconnecting(true);

    try {
      await fetch("/api/integrations/pipedrive/disconnect", { method: "DELETE" });
      router.refresh();
    } catch {
      setError("Failed to disconnect — please try again.");
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <div
      className={`relative text-left p-5 rounded-xl border-2 transition-all ${
        connected ? "border-green-300 bg-green-50" : "border-border hover:border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`${connected ? "text-green-600" : "text-gray-400"}`}>
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.5 17.5h-3v-3h-2v-6h2v-2h3v2h2v6h-2v3z" />
          </svg>
        </div>
        {connected && (
          <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
            <CheckCircle className="h-3 w-3" />
            Connected
          </span>
        )}
      </div>

      <h3 className="font-semibold mb-1">Pipedrive</h3>
      <p className="text-secondary text-xs leading-relaxed mb-4">
        {connected
          ? "Your pipeline is connected. Sync to pull the latest deals."
          : "Import your live pipeline directly from Pipedrive."}
      </p>

      {/* Last sync info */}
      {connected && lastSyncAt && (
        <p className="text-xs text-gray-500 mb-3">
          Last sync:{" "}
          {formatDistanceToNow(new Date(lastSyncAt), { addSuffix: true })}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg mb-3">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {/* Sync result */}
      {syncResult && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg mb-3">
          <p className="text-xs font-medium text-amber-800 mb-1">
            {syncResult.dealCount} deals synced
          </p>
          <a
            href={`/forecast?importId=${syncResult.importId}`}
            className="text-xs text-amber-700 font-medium flex items-center gap-1 hover:underline"
          >
            Use in a forecast <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* Actions */}
      {connected ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            disabled={syncing || syncStatus === "SYNCING"}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`h-3 w-3 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing…" : "Sync now"}
          </button>
          <button
            onClick={handleDisconnect}
            disabled={disconnecting}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-500 text-xs font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <Unlink className="h-3 w-3" />
            Disconnect
          </button>
        </div>
      ) : (
        <a
          href="/api/integrations/pipedrive/connect"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors"
        >
          Connect Pipedrive
          <ArrowRight className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}
