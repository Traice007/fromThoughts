"use client";

import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";
import type { GapAnalysis as GapAnalysisType } from "@/types/forecast";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface GapAnalysisProps {
  gapAnalysis: GapAnalysisType;
}

export function GapAnalysis({ gapAnalysis }: GapAnalysisProps) {
  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <h2 className="text-xl font-bold">Gap Analysis</h2>
      </div>

      {/* Summary */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
        <p className="text-sm">{gapAnalysis.summary}</p>
      </div>

      {/* Key Gaps */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm">Revenue Gap</span>
          </div>
          <p className="text-2xl font-bold text-destructive">
            {formatCurrency(gapAnalysis.revenueGap)}
          </p>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm">Required Growth Rate</span>
          </div>
          <p className="text-2xl font-bold text-primary">
            {formatPercent(gapAnalysis.requiredGrowthRate)}
          </p>
        </div>
      </div>

      {/* Conversion Gaps */}
      {gapAnalysis.conversionGaps && gapAnalysis.conversionGaps.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Conversion Rate Gaps</h3>
          <div className="space-y-3">
            {gapAnalysis.conversionGaps.map((gap, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <span className="font-medium">{gap.stage}</span>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">{formatPercent(gap.currentRate)}</span>
                  <ArrowRight className="h-4 w-4 text-secondary" />
                  <span className="text-primary font-semibold">
                    {formatPercent(gap.requiredRate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
