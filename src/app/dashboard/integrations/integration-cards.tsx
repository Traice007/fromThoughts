"use client";

import { useState } from "react";
import { CheckCircle, Clock, ArrowRight, AlertCircle } from "lucide-react";

interface IntegrationCardsProps {
  userId: string;
  existingProvider: string | null;
}

const INTEGRATIONS = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync your execution plan directly to HubSpot as deals and notes.",
    category: "CRM",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.628 1.267 1.984V7.93a5.736 5.736 0 00-3.597 1.98l-6.167-4.79a2.37 2.37 0 00.078-.58 2.348 2.348 0 10-2.348 2.348c.467 0 .898-.142 1.263-.38l6.073 4.72a5.74 5.74 0 00-.427 2.18c0 .778.16 1.519.44 2.197l-1.87 1.87a1.92 1.92 0 00-.614-.102 1.94 1.94 0 100 3.88 1.94 1.94 0 001.94-1.94c0-.22-.038-.43-.103-.627l1.822-1.822a5.76 5.76 0 003.343 1.066 5.76 5.76 0 005.76-5.76 5.76 5.76 0 00-3.707-5.37zm-1.88 8.685a3.32 3.32 0 01-3.316-3.316 3.32 3.32 0 013.316-3.316 3.32 3.32 0 013.316 3.316 3.32 3.32 0 01-3.316 3.316z" />
      </svg>
    ),
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Push execution plans and OKRs into Pipedrive as deals and activities.",
    category: "CRM",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-3v-3h-3v3h-3v-11h3v5h3v-5h3v11z" />
      </svg>
    ),
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect to Salesforce to sync forecasts, OKRs, and pipeline data.",
    category: "CRM",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205a4.69 4.69 0 011.89-.39c2.58 0 4.67 2.13 4.67 4.755s-2.09 4.755-4.67 4.755a4.58 4.58 0 01-.87-.084 3.75 3.75 0 01-3.39 2.13 3.82 3.82 0 01-1.8-.45 4.17 4.17 0 01-3.855 2.55 4.2 4.2 0 01-4.005-2.94 3.06 3.06 0 01-.555.054c-1.77 0-3.21-1.47-3.21-3.27a3.3 3.3 0 011.65-2.85A4.02 4.02 0 012.37 8.88c0-2.22 1.8-4.02 4.02-4.02 1.5 0 2.805.825 3.495 2.04l.12.015v.5z" />
      </svg>
    ),
  },
  {
    id: "notion",
    name: "Notion",
    description: "Export OKRs and tasks directly into your Notion workspace.",
    category: "Task Management",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.39 2.29c-.42-.326-.98-.7-2.055-.607L3.01 2.87c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.746 0-.933-.234-1.494-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.877 1.16l13.681-.933c1.682-.14 2.102.093 2.802.607l3.876 2.708c.466.326.606.747.606 1.26v16.706c0 1.027-.373 1.633-1.68 1.726l-15.458.934c-.98.046-1.448-.094-1.962-.747L1.164 19.07c-.56-.747-.793-1.306-.793-1.96V2.94c0-.84.373-1.633 1.307-1.78z" />
      </svg>
    ),
  },
  {
    id: "asana",
    name: "Asana",
    description: "Turn your execution plan into actionable Asana tasks and projects.",
    category: "Task Management",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.78 12.653c-2.768 0-5.012 2.244-5.012 5.012S16.013 22.677 18.78 22.677s5.012-2.244 5.012-5.012-2.244-5.012-5.012-5.012zM5.22 12.653c-2.768 0-5.012 2.244-5.012 5.012S2.452 22.677 5.22 22.677s5.012-2.244 5.012-5.012-2.244-5.012-5.012-5.012zM12 1.323c-2.768 0-5.012 2.244-5.012 5.012S9.232 11.347 12 11.347s5.012-2.244 5.012-5.012S14.768 1.323 12 1.323z" />
      </svg>
    ),
  },
  {
    id: "linear",
    name: "Linear",
    description: "Push OKR-driven tasks into Linear for your engineering and product teams.",
    category: "Task Management",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M2.643 12.985a.49.49 0 01-.131-.465 10.018 10.018 0 012.64-4.81.49.49 0 01.675-.019l8.482 8.482a.49.49 0 01-.02.675 10.018 10.018 0 01-4.81 2.64.49.49 0 01-.464-.131zm-1.223 1.674a.49.49 0 00-.106.532 10.042 10.042 0 002.291 3.204 10.042 10.042 0 003.204 2.291.49.49 0 00.532-.106zM21.063 5.7A10.003 10.003 0 0012.003 2a9.95 9.95 0 00-6.47 2.378.49.49 0 00-.017.712L17.91 17.484a.49.49 0 00.712-.017A9.98 9.98 0 0021.063 5.7z" />
      </svg>
    ),
  },
];

export function IntegrationCards({ userId, existingProvider }: IntegrationCardsProps) {
  const [selected, setSelected] = useState<string | null>(existingProvider);
  const [saved, setSaved] = useState<string | null>(existingProvider);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (integrationId: string) => {
    setSelected(integrationId);
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/dashboard/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crm: integrationId }),
      });

      if (res.ok) {
        setSaved(integrationId);
      } else {
        setError("Failed to save your preference. Please try again.");
        setSelected(saved);
      }
    } catch {
      setError("An error occurred. Please try again.");
      setSelected(saved);
    } finally {
      setSaving(false);
    }
  };

  const crmIntegrations = INTEGRATIONS.filter((i) => i.category === "CRM");
  const taskIntegrations = INTEGRATIONS.filter((i) => i.category === "Task Management");

  return (
    <div className="space-y-8">
      {error && (
        <div role="alert" className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      {/* CRM Integrations */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold">CRM</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
            <Clock className="h-3 w-3" />
            Coming Soon
          </span>
        </div>
        <p className="text-secondary text-sm mb-4">
          We&apos;re building direct CRM integrations to sync your execution plans. Let us know which CRM you use so we can prioritize.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {crmIntegrations.map((integration) => {
            const isSelected = selected === integration.id;
            const isSaved = saved === integration.id;

            return (
              <button
                key={integration.id}
                onClick={() => handleSelect(integration.id)}
                disabled={saving}
                className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-amber-500 bg-amber-50"
                    : "border-border hover:border-gray-300 hover:bg-muted"
                }`}
              >
                {isSaved && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                  </div>
                )}
                <div className={`mb-3 ${isSelected ? "text-amber-600" : "text-gray-400"}`}>
                  {integration.icon}
                </div>
                <h3 className={`font-semibold mb-1 ${isSelected ? "text-amber-900" : "text-foreground"}`}>
                  {integration.name}
                </h3>
                <p className="text-secondary text-xs leading-relaxed">
                  {integration.description}
                </p>
                {isSaved && (
                  <p className="text-amber-600 text-xs font-medium mt-3 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    We&apos;ll notify you when it&apos;s ready
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task Management Integrations */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold">Task Management</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
            On the Roadmap
          </span>
        </div>
        <p className="text-secondary text-sm mb-4">
          Turn your execution plan into actionable tasks in the tools your team already uses.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {taskIntegrations.map((integration) => {
            const isSelected = selected === integration.id;
            const isSaved = saved === integration.id;

            return (
              <button
                key={integration.id}
                onClick={() => handleSelect(integration.id)}
                disabled={saving}
                className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-amber-500 bg-amber-50"
                    : "border-border hover:border-gray-300 hover:bg-muted"
                }`}
              >
                {isSaved && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                  </div>
                )}
                <div className={`mb-3 ${isSelected ? "text-amber-600" : "text-gray-400"}`}>
                  {integration.icon}
                </div>
                <h3 className={`font-semibold mb-1 ${isSelected ? "text-amber-900" : "text-foreground"}`}>
                  {integration.name}
                </h3>
                <p className="text-secondary text-xs leading-relaxed">
                  {integration.description}
                </p>
                {isSaved && (
                  <p className="text-amber-600 text-xs font-medium mt-3 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    We&apos;ll notify you when it&apos;s ready
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current workaround */}
      <div className="bg-muted/50 border border-border rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <ArrowRight className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">In the meantime</h3>
            <p className="text-secondary text-sm">
              You can export your execution plans as PDF or CSV from any forecast result page and import them into your tools manually.
              We&apos;re working on making this seamless.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
