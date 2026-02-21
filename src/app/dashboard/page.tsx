import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentForecasts } from "@/components/dashboard/recent-forecasts";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

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

  if (totalForecasts === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="max-w-lg w-full text-center px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome{user.name ? `, ${user.name.split(" ")[0]}` : ""}.
          </h1>
          <p className="text-gray-500 leading-relaxed mb-10">
            Your dashboard fills up once you&apos;ve run your first revenue forecast. It takes about 5 minutes and the output is yours to keep.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-5 sm:gap-0 mb-10 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0">1</span>
              <span className="text-gray-700">Tell us your revenue situation</span>
            </div>
            <div className="hidden sm:block w-8 h-px bg-gray-200 mx-3 flex-shrink-0" />
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0">2</span>
              <span className="text-gray-700">We build your sales mechanism</span>
            </div>
            <div className="hidden sm:block w-8 h-px bg-gray-200 mx-3 flex-shrink-0" />
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0">3</span>
              <span className="text-gray-700">Your dashboard comes to life</span>
            </div>
          </div>

          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25 text-lg"
          >
            Build Your Sales Mechanism
            <ArrowRight className="h-5 w-5" />
          </Link>

          <p className="text-sm text-gray-400 mt-6">
            Questions?{" "}
            <a href="mailto:ranjith@fromthoughts.com" className="text-amber-600 hover:underline">
              ranjith@fromthoughts.com
            </a>
          </p>
        </div>
      </div>
    );
  }

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
