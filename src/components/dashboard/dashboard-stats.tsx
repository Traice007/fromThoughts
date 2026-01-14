import { TrendingUp, Target, CheckSquare, DollarSign } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalForecasts: number;
    totalOkrs: number;
    totalKeyResults: number;
    revenueGap: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      name: "Total Forecasts",
      value: stats.totalForecasts,
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-100",
    },
    {
      name: "Active OKRs",
      value: stats.totalOkrs,
      icon: Target,
      color: "text-purple-600 bg-purple-100",
    },
    {
      name: "Key Results",
      value: stats.totalKeyResults,
      icon: CheckSquare,
      color: "text-green-600 bg-green-100",
    },
    {
      name: "Revenue Gap",
      value: stats.revenueGap > 0 ? `$${(stats.revenueGap / 1000000).toFixed(1)}M` : "$0",
      icon: DollarSign,
      color: "text-amber-600 bg-amber-100",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.name}
          className="bg-background border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-secondary">{item.name}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
