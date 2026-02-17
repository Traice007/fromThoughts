import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, TrendingUp } from "lucide-react";

interface Forecast {
  id: string;
  companyName: string | null;
  currentRevenue: number;
  targetRevenue: number;
  timeHorizonMonths: number;
  status: string;
  createdAt: Date;
  okrs: { id: string }[];
}

interface RecentForecastsProps {
  forecasts: Forecast[];
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value}`;
}

export function RecentForecasts({ forecasts }: RecentForecastsProps) {
  if (forecasts.length === 0) {
    return (
      <div className="bg-background border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Forecasts</h2>
        <div className="text-center py-8">
          <TrendingUp className="h-12 w-12 text-secondary mx-auto mb-3" />
          <p className="text-secondary mb-4">No forecasts yet</p>
          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Create Your First Forecast
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Forecasts</h2>
        <Link
          href="/dashboard/forecasts"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {forecasts.map((forecast) => {
          const growthMultiple = forecast.currentRevenue > 0 ? forecast.targetRevenue / forecast.currentRevenue : 0;

          return (
            <Link
              key={forecast.id}
              href={`/results/${forecast.id}`}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {forecast.companyName || "Revenue Forecast"}
                </p>
                <p className="text-sm text-secondary">
                  {formatCurrency(forecast.currentRevenue)} →{" "}
                  {formatCurrency(forecast.targetRevenue)} ({growthMultiple.toFixed(1)}x)
                </p>
                <p className="text-xs text-secondary mt-1">
                  {forecast.okrs.length} OKRs •{" "}
                  {formatDistanceToNow(new Date(forecast.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    forecast.status === "COMPLETED"
                      ? "bg-green-100 text-green-600"
                      : forecast.status === "PROCESSING"
                      ? "bg-blue-100 text-blue-600"
                      : forecast.status === "FAILED"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {forecast.status}
                </span>
                <ChevronRight className="h-5 w-5 text-secondary" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
