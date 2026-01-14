import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Target, ChevronRight, TrendingUp, DollarSign, Users, Settings, Package } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const CATEGORY_CONFIG: Record<string, { icon: typeof Target; color: string }> = {
  REVENUE: { icon: DollarSign, color: "text-green-600 bg-green-100" },
  PIPELINE: { icon: TrendingUp, color: "text-blue-600 bg-blue-100" },
  CONVERSION: { icon: Target, color: "text-purple-600 bg-purple-100" },
  CUSTOMER: { icon: Users, color: "text-orange-600 bg-orange-100" },
  OPERATIONS: { icon: Settings, color: "text-gray-600 bg-gray-100" },
  PRODUCT: { icon: Package, color: "text-pink-600 bg-pink-100" },
};

export default async function OkrsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const okrs = await prisma.okr.findMany({
    where: { forecast: { userId: user.id } },
    include: {
      keyResults: true,
      forecast: {
        select: {
          id: true,
          companyName: true,
        },
      },
    },
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });

  // Group OKRs by forecast
  const okrsByForecast = okrs.reduce((acc, okr) => {
    const forecastId = okr.forecast.id;
    if (!acc[forecastId]) {
      acc[forecastId] = {
        forecastName: okr.forecast.companyName || "Revenue Forecast",
        forecastId,
        okrs: [],
      };
    }
    acc[forecastId].okrs.push(okr);
    return acc;
  }, {} as Record<string, { forecastName: string; forecastId: string; okrs: typeof okrs }>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">OKRs</h1>
          <p className="text-secondary mt-1">
            Track and manage your objectives and key results
          </p>
        </div>
        <Link
          href="/forecast"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Generate New OKRs
        </Link>
      </div>

      {okrs.length === 0 ? (
        <div className="bg-background border border-border rounded-xl p-12 text-center">
          <Target className="h-16 w-16 text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No OKRs yet</h2>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            Create a revenue forecast to generate strategic OKRs based on industry
            benchmarks.
          </p>
          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Create Forecast
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.values(okrsByForecast).map((group) => (
            <div key={group.forecastId}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{group.forecastName}</h2>
                <Link
                  href={`/results/${group.forecastId}`}
                  className="text-sm text-primary hover:underline"
                >
                  View Full Report
                </Link>
              </div>

              <div className="grid gap-4">
                {group.okrs.map((okr) => {
                  const config = CATEGORY_CONFIG[okr.category] || CATEGORY_CONFIG.REVENUE;
                  const Icon = config.icon;

                  return (
                    <Link
                      key={okr.id}
                      href={`/dashboard/okrs/${okr.id}`}
                      className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${config.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color}`}
                            >
                              {okr.category}
                            </span>
                            <span className="text-xs text-secondary">
                              {okr.timeframe}
                            </span>
                            <span className="text-xs text-secondary">
                              Priority: {okr.priority}/10
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold mb-2">
                            {okr.objective}
                          </h3>

                          <div className="flex items-center gap-4 text-sm text-secondary">
                            <span>{okr.keyResults.length} Key Results</span>
                            {okr.howToAchieve && (
                              <>
                                <span>•</span>
                                <span className="truncate max-w-md">
                                  {okr.howToAchieve}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="h-6 w-6 text-secondary flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
