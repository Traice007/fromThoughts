"use client";

import { useState } from "react";
import { TrendingUp, Target, Settings, Users, Calendar } from "lucide-react";

type Opportunity = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  priority: string;
  impact: string | null;
  nextAction: string;
  status: string;
  dueDate: string | null;
  reviewedAt: string | null;
};

const CATEGORY_CONFIG: Record<string, { label: string; icon: typeof TrendingUp; color: string }> = {
  deal:     { label: "Deal",     icon: TrendingUp, color: "text-green-600 bg-green-100" },
  pipeline: { label: "Pipeline", icon: Target,     color: "text-blue-600 bg-blue-100" },
  process:  { label: "Process",  icon: Settings,   color: "text-purple-600 bg-purple-100" },
  hiring:   { label: "Hiring",   icon: Users,      color: "text-orange-600 bg-orange-100" },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  high:   { label: "HIGH",   color: "text-red-600 bg-red-100" },
  medium: { label: "MEDIUM", color: "text-yellow-700 bg-yellow-100" },
  low:    { label: "LOW",    color: "text-gray-600 bg-gray-100" },
};

const STATUS_LABELS: Record<string, string> = {
  open:        "Open",
  in_progress: "In Progress",
  done:        "Done",
};

export function OpportunityCard({ opportunity: initial }: { opportunity: Opportunity }) {
  const [opp, setOpp] = useState(initial);
  const [loading, setLoading] = useState(false);

  const cat = CATEGORY_CONFIG[opp.category] ?? CATEGORY_CONFIG.deal;
  const pri = PRIORITY_CONFIG[opp.priority] ?? PRIORITY_CONFIG.medium;
  const CatIcon = cat.icon;
  const isDone = opp.status === "done";

  async function updateStatus(status: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/opportunities/${opp.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOpp(updated);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`bg-background border rounded-xl p-6 transition-all ${
        isDone
          ? "border-border opacity-50"
          : opp.priority === "high"
          ? "border-red-200 hover:border-red-300"
          : "border-border hover:border-primary/30"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cat.color}`}>
            <CatIcon className="h-3.5 w-3.5" />
            {cat.label}
          </div>
          {/* Priority */}
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${pri.color}`}>
            {pri.label}
          </span>
          {/* Status */}
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            opp.status === "done"
              ? "bg-green-100 text-green-700"
              : opp.status === "in_progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600"
          }`}>
            {STATUS_LABELS[opp.status] ?? opp.status}
          </span>
        </div>

        {/* Due date */}
        {opp.dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-secondary flex-shrink-0">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(opp.dueDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className={`font-semibold text-lg mb-1 ${isDone ? "line-through text-secondary" : ""}`}>
        {opp.title}
      </h3>

      {/* Impact */}
      {opp.impact && (
        <p className="text-sm font-medium text-amber-600 mb-3">{opp.impact}</p>
      )}

      {/* Description */}
      {opp.description && (
        <p className="text-sm text-secondary mb-3 leading-relaxed">{opp.description}</p>
      )}

      {/* Next action */}
      <div className="bg-muted rounded-lg px-4 py-3 mb-5">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Next action</p>
        <p className="text-sm leading-relaxed">{opp.nextAction}</p>
      </div>

      {/* Reviewed by */}
      {opp.reviewedAt && (
        <p className="text-xs text-secondary mb-4">
          Reviewed by fromThoughts · {new Date(opp.reviewedAt).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </p>
      )}

      {/* Action buttons */}
      {!isDone && (
        <div className="flex items-center gap-3">
          {opp.status === "open" && (
            <button
              onClick={() => updateStatus("in_progress")}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              Mark as In Progress
            </button>
          )}
          <button
            onClick={() => updateStatus("done")}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Mark as Done
          </button>
          {opp.status === "in_progress" && (
            <button
              onClick={() => updateStatus("open")}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-secondary hover:text-foreground transition-colors disabled:opacity-50"
            >
              Reopen
            </button>
          )}
        </div>
      )}

      {isDone && (
        <button
          onClick={() => updateStatus("open")}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-secondary hover:text-foreground transition-colors disabled:opacity-50"
        >
          Reopen
        </button>
      )}
    </div>
  );
}
