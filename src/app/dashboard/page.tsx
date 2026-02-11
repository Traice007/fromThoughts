import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentForecasts } from "@/components/dashboard/recent-forecasts";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const [forecasts, totalForecasts, totalOkrs, totalKeyResults] =
    await Promise.all([
      prisma.forecast.findMany({
        where: { userId: user.id },
        include: {
          okrs: {
            include: { keyResults: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.forecast.count({
        where: { userId: user.id },
      }),
      prisma.okr.count({
        where: { forecast: { userId: user.id } },
      }),
      prisma.keyResult.count({
        where: { okr: { forecast: { userId: user.id } } },
      }),
    ]);

  const revenueData = forecasts.reduce(
    (acc, f) => ({
      currentTotal: acc.currentTotal + f.currentRevenue,
      targetTotal: acc.targetTotal + f.targetRevenue,
    }),
    { currentTotal: 0, targetTotal: 0 }
  );

  const stats = {
    totalForecasts,
    totalOkrs,
    totalKeyResults,
    revenueGap: revenueData.targetTotal - revenueData.currentTotal,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-secondary mt-1">
            Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
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

      <DashboardStats stats={stats} />

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentForecasts forecasts={forecasts} />

        {/* Quick actions */}
        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/forecast"
              className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <p className="font-medium">Create New Forecast</p>
              <p className="text-sm text-secondary">
                Generate data-driven OKRs for your revenue targets
              </p>
            </Link>
            <Link
              href="/dashboard/okrs"
              className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <p className="font-medium">Track OKR Progress</p>
              <p className="text-sm text-secondary">
                Update key results and monitor your progress
              </p>
            </Link>
            <Link
              href="/dashboard/billing"
              className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <p className="font-medium">Manage Subscription</p>
              <p className="text-sm text-secondary">
                View billing details and upgrade your plan
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
