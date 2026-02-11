"use client";

import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

interface CrmConnectProps {
  forecastId: string;
}

const CRM_OPTIONS = [
  {
    id: "hubspot",
    name: "HubSpot",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.52 1.628 1.267 1.984V7.93a5.736 5.736 0 00-3.597 1.98l-6.167-4.79a2.37 2.37 0 00.078-.58 2.348 2.348 0 10-2.348 2.348c.467 0 .898-.142 1.263-.38l6.073 4.72a5.74 5.74 0 00-.427 2.18c0 .778.16 1.519.44 2.197l-1.87 1.87a1.92 1.92 0 00-.614-.102 1.94 1.94 0 100 3.88 1.94 1.94 0 001.94-1.94c0-.22-.038-.43-.103-.627l1.822-1.822a5.76 5.76 0 003.343 1.066 5.76 5.76 0 005.76-5.76 5.76 5.76 0 00-3.707-5.37zm-1.88 8.685a3.32 3.32 0 01-3.316-3.316 3.32 3.32 0 013.316-3.316 3.32 3.32 0 013.316 3.316 3.32 3.32 0 01-3.316 3.316z" />
      </svg>
    ),
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-3v-3h-3v3h-3v-11h3v5h3v-5h3v11z" />
      </svg>
    ),
  },
  {
    id: "salesforce",
    name: "Salesforce",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205a4.69 4.69 0 011.89-.39c2.58 0 4.67 2.13 4.67 4.755s-2.09 4.755-4.67 4.755a4.58 4.58 0 01-.87-.084 3.75 3.75 0 01-3.39 2.13 3.82 3.82 0 01-1.8-.45 4.17 4.17 0 01-3.855 2.55 4.2 4.2 0 01-4.005-2.94 3.06 3.06 0 01-.555.054c-1.77 0-3.21-1.47-3.21-3.27a3.3 3.3 0 011.65-2.85A4.02 4.02 0 012.37 8.88c0-2.22 1.8-4.02 4.02-4.02 1.5 0 2.805.825 3.495 2.04l.12.015v.5z" />
      </svg>
    ),
  },
  {
    id: "other",
    name: "Other CRM",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export function CrmConnect({ forecastId }: CrmConnectProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (crmId: string) => {
    setSelected(crmId);
  };

  const handleSubmit = async () => {
    if (!selected) return;

    try {
      await fetch("/api/integrations/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forecastId, crm: selected }),
      });
    } catch {
      // Silently handle — this is a nice-to-have signal, not critical
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold mb-1">Thanks for your interest</h2>
            <p className="text-secondary text-sm">
              We&apos;ll notify you as soon as {CRM_OPTIONS.find((c) => c.id === selected)?.name} integration is
              available. In the meantime, you can export your execution plan as PDF or CSV above.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-xl font-bold">CRM Integration</h2>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
          <Clock className="h-3 w-3" />
          Coming Soon
        </span>
      </div>
      <p className="text-secondary text-sm mb-6">
        We&apos;re building direct integrations to push your execution plan into your CRM.
        Which CRM does your team use?
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {CRM_OPTIONS.map((crm) => (
          <button
            key={crm.id}
            onClick={() => handleSelect(crm.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              selected === crm.id
                ? "border-amber-500 bg-amber-50"
                : "border-border hover:border-gray-300 hover:bg-muted"
            }`}
          >
            <span className={selected === crm.id ? "text-amber-600" : "text-gray-500"}>
              {crm.icon}
            </span>
            <span className={`text-sm font-medium ${selected === crm.id ? "text-amber-700" : "text-gray-700"}`}>
              {crm.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className="w-full py-3 rounded-lg font-medium text-sm transition-colors bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Notify me when it&apos;s ready
      </button>
    </div>
  );
}
