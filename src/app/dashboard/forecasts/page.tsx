import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, TrendingUp, ChevronRight, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value}`;
}

export default async function ForecastsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const forecasts = await prisma.forecast.findMany({
    where: { userId: user.id },
    include: {
      okrs: {
        include: { keyResults: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forecasts</h1>
          <p className="text-secondary mt-1">
            All your revenue forecasts and generated OKRs
          </p>
        </div>
        <Link
          href="/forecast"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Forecast
        </Link>
      </div>

      {forecasts.length === 0 ? (
        <div className="bg-background border border-border rounded-xl p-12 text-center">
          <TrendingUp className="h-16 w-16 text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No forecasts yet</h2>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            Create your first revenue forecast to generate data-driven OKRs based
            on industry benchmarks from 10,000+ companies.
          </p>
          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Your First Forecast
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {forecasts.map((forecast) => {
            const growthMultiple = forecast.currentRevenue > 0 ? forecast.targetRevenue / forecast.currentRevenue : 0;
            const totalKeyResults = forecast.okrs.reduce(
              (sum, okr) => sum + okr.keyResults.length,
              0
            );

            return (
              <Link
                key={forecast.id}
                href={`/results/${forecast.id}`}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold truncate">
                        {forecast.companyName || "Revenue Forecast"}
                      </h3>
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
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-secondary">Current: </span>
                        <span className="font-medium">
                          {formatCurrency(forecast.currentRevenue)}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Target: </span>
                        <span className="font-medium">
                          {formatCurrency(forecast.targetRevenue)}
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Growth: </span>
                        <span className="font-medium text-primary">
                          {growthMultiple.toFixed(1)}x
                        </span>
                      </div>
                      <div>
                        <span className="text-secondary">Timeline: </span>
                        <span className="font-medium">
                          {forecast.timeHorizonMonths} months
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm text-secondary">
                      <span>{forecast.okrs.length} OKRs</span>
                      <span>•</span>
                      <span>{totalKeyResults} Key Results</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDistanceToNow(new Date(forecast.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="h-6 w-6 text-secondary flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
