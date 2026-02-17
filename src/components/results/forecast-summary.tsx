"use client";

import { TrendingUp, Target, Calendar, DollarSign } from "lucide-react";
import type { ForecastWithOkrs } from "@/types/forecast";
import { formatCurrency, formatPercent, calculateGrowthRate } from "@/lib/utils";

interface ForecastSummaryProps {
  forecast: ForecastWithOkrs;
}

export function ForecastSummary({ forecast }: ForecastSummaryProps) {
  const revenueGap = forecast.targetRevenue - forecast.currentRevenue;
  const growthMultiple = forecast.currentRevenue > 0 ? forecast.targetRevenue / forecast.currentRevenue : 0;
  const monthlyGrowth = calculateGrowthRate(
    forecast.currentRevenue,
    forecast.targetRevenue,
    forecast.timeHorizonMonths
  );

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Revenue Forecast Summary</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Current Revenue */}
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Current ARR</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(forecast.currentRevenue)}</p>
        </div>

        {/* Target Revenue */}
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <Target className="h-4 w-4" />
            <span className="text-sm">Target ARR</span>
          </div>
          <p className="text-2xl font-bold text-primary">{formatCurrency(forecast.targetRevenue)}</p>
        </div>

        {/* Growth Required */}
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Growth Multiple</span>
          </div>
          <p className="text-2xl font-bold text-accent">{growthMultiple.toFixed(1)}x</p>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-2 text-secondary mb-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Timeline</span>
          </div>
          <p className="text-2xl font-bold">{forecast.timeHorizonMonths} months</p>
        </div>
      </div>

      {/* Additional metrics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-secondary">Revenue Gap</span>
            <p className="font-semibold">{formatCurrency(revenueGap)}</p>
          </div>
          <div>
            <span className="text-secondary">Monthly Growth Rate</span>
            <p className="font-semibold">{formatPercent(monthlyGrowth)}</p>
          </div>
          {forecast.companyName && (
            <div>
              <span className="text-secondary">Company</span>
              <p className="font-semibold">{forecast.companyName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
