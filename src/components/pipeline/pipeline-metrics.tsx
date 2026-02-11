"use client";

import type { PipelineMetrics } from "@/lib/pipeline/metrics-calculator";
import {
  DollarSign,
  Hash,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";

interface PipelineMetricsDisplayProps {
  metrics: PipelineMetrics;
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}K`;
  return `€${value.toFixed(0)}`;
}

export function PipelineMetricsDisplay({
  metrics,
}: PipelineMetricsDisplayProps) {
  const cards = [
    {
      label: "Total Pipeline",
      value: formatCurrency(metrics.totalValue),
      icon: DollarSign,
    },
    {
      label: "Total Deals",
      value: metrics.totalDeals.toString(),
      icon: Hash,
    },
    {
      label: "Avg Deal Size",
      value: formatCurrency(metrics.avgDealSize),
      icon: TrendingUp,
    },
    {
      label: "Avg Sales Cycle",
      value:
        metrics.avgSalesCycleDays !== null
          ? `${metrics.avgSalesCycleDays} days`
          : "N/A",
      icon: Clock,
    },
  ];

  const conversionRates = [
    {
      from: "Lead",
      to: "MQL",
      rate: metrics.conversionRates.leadToMqa,
    },
    {
      from: "MQL",
      to: "SQL",
      rate: metrics.conversionRates.mqaToSql,
    },
    {
      from: "SQL",
      to: "Won",
      rate: metrics.conversionRates.sqlToClose,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-background border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-secondary mb-1">
              <card.icon className="h-4 w-4" />
              <span className="text-xs font-medium">{card.label}</span>
            </div>
            <p className="text-xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Conversion rates */}
      <div className="bg-background border border-border rounded-xl p-4">
        <h4 className="text-sm font-medium text-secondary mb-3">
          Conversion Rates
        </h4>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {conversionRates.map((cr, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm font-medium">{cr.from}</span>
              <ArrowRight className="h-3 w-3 text-secondary" />
              <span className="text-sm font-medium">{cr.to}</span>
              <span
                className={`text-sm font-bold ${
                  cr.rate !== null ? "text-primary" : "text-secondary"
                }`}
              >
                {cr.rate !== null ? `${Math.round(cr.rate)}%` : "—"}
              </span>
              {i < conversionRates.length - 1 && (
                <span className="text-border mx-1">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
