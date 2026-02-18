import { Target, TrendingUp, Users, DollarSign, Settings, Package, Clock, Lightbulb } from "lucide-react";
import type { OkrWithKeyResults, OkrCategory } from "@/types/forecast";

interface OkrCardProps {
  okr: OkrWithKeyResults;
  index: number;
}

const CATEGORY_CONFIG: Record<OkrCategory, { icon: typeof Target; color: string; label: string }> = {
  REVENUE: { icon: DollarSign, color: "text-green-600 bg-green-100", label: "Revenue" },
  PIPELINE: { icon: TrendingUp, color: "text-blue-600 bg-blue-100", label: "Pipeline" },
  CONVERSION: { icon: Target, color: "text-purple-600 bg-purple-100", label: "Conversion" },
  CUSTOMER: { icon: Users, color: "text-orange-600 bg-orange-100", label: "Customer" },
  OPERATIONS: { icon: Settings, color: "text-gray-600 bg-gray-100", label: "Operations" },
  PRODUCT: { icon: Package, color: "text-pink-600 bg-pink-100", label: "Product" },
};

export function OkrCard({ okr, index }: OkrCardProps) {
  const config = CATEGORY_CONFIG[okr.category];
  const Icon = config.icon;

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`p-2 rounded-lg flex-shrink-0 ${config.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted">
                OKR {index + 1}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                {config.label}
              </span>
              <span className="text-xs text-secondary">
                {okr.timeframe}
              </span>
            </div>
            <h3 className="text-lg font-semibold">{okr.objective}</h3>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-xs text-secondary">Priority</span>
          <p className="text-2xl font-bold text-primary">{okr.priority}</p>
        </div>
      </div>

      {/* When & How */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-blue-600">When</h4>
          </div>
          <p className="text-sm font-medium">{okr.timeframe}</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <h4 className="text-sm font-semibold text-amber-600">How</h4>
          </div>
          <p className="text-sm">{okr.howToAchieve || "Focus on key results below"}</p>
        </div>
      </div>

      {/* Key Results */}
      <div className="space-y-3 mb-4">
        <h4 className="text-sm font-medium text-secondary">Key Results</h4>
        {okr.keyResults.map((kr, krIndex) => (
          <div
            key={kr.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-muted rounded-lg"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background text-xs font-medium flex-shrink-0">
                {krIndex + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{kr.description}</p>
                <p className="text-xs text-secondary">{kr.metricName}</p>
              </div>
            </div>
            <div className="sm:text-right flex-shrink-0 pl-9 sm:pl-0">
              <p className="text-sm font-semibold">
                {kr.currentValue !== null ? (
                  <>
                    <span className="text-secondary">{kr.currentValue}{kr.unit}</span>
                    <span className="mx-1">→</span>
                  </>
                ) : null}
                <span className="text-primary">{kr.targetValue}{kr.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Rationale */}
      {okr.rationale && (
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-secondary mb-2">Why This Matters</h4>
          <p className="text-sm text-secondary">{okr.rationale}</p>
        </div>
      )}
    </div>
  );
}
