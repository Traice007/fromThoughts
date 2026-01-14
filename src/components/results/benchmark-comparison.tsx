"use client";

import { TrendingUp, TrendingDown, Minus, Users } from "lucide-react";
import { getBenchmark, compareToBenchmark, getTotalSampleSize, type BenchmarkComparison } from "@/data/benchmarks";

interface BenchmarkComparisonProps {
  industry?: string | null;
  metrics: {
    leadToMqaRate?: number | null;
    mqaToSqlRate?: number | null;
    sqlToCloseRate?: number | null;
    averageDealSize?: number | null;
    salesCycleLength?: number | null;
  };
}

export function BenchmarkComparisonCard({ industry, metrics }: BenchmarkComparisonProps) {
  const benchmark = getBenchmark(industry);
  const totalCompanies = getTotalSampleSize();
  const comparisons = compareToBenchmark(industry, metrics);

  // Only show if we have metrics to compare
  if (comparisons.length === 0) {
    return null;
  }

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Benchmark Comparison</h2>
      </div>
      <p className="text-sm text-secondary mb-6">
        How you compare to {totalCompanies.toLocaleString()}+ companies in {benchmark.industry}
      </p>

      <div className="space-y-4">
        {comparisons.map((comparison) => (
          <ComparisonRow key={comparison.metric} comparison={comparison} />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-secondary">
          Benchmarks based on {benchmark.sampleSize.toLocaleString()} companies in your industry segment.
          Data aggregated from industry reports and anonymized company data.
        </p>
      </div>
    </div>
  );
}

function ComparisonRow({ comparison }: { comparison: BenchmarkComparison }) {
  const isPercentMetric = comparison.metric.includes("Rate");
  const isDealSize = comparison.metric.includes("Deal Size");
  const isCycleLength = comparison.metric.includes("Cycle");

  const formatValue = (value: number | null) => {
    if (value === null) return "N/A";
    if (isDealSize) return `$${value.toLocaleString()}`;
    if (isCycleLength) return `${value} days`;
    if (isPercentMetric) return `${value}%`;
    return value.toString();
  };

  const getIcon = () => {
    if (comparison.percentile === "above") {
      return <TrendingUp className="h-4 w-4 text-accent" />;
    } else if (comparison.percentile === "below") {
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    }
    return <Minus className="h-4 w-4 text-secondary" />;
  };

  const getBgColor = () => {
    if (comparison.percentile === "above") return "bg-accent/10";
    if (comparison.percentile === "below") return "bg-destructive/10";
    return "bg-muted";
  };

  return (
    <div className={`rounded-lg p-4 ${getBgColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-medium">{comparison.metric}</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold">{formatValue(comparison.userValue)}</span>
          <span className="text-secondary text-sm ml-2">
            vs {formatValue(comparison.benchmarkValue)} benchmark
          </span>
        </div>
      </div>
      <p className="text-sm text-secondary">{comparison.recommendation}</p>
    </div>
  );
}
