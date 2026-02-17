"use client";

import { formatCurrency } from "@/lib/utils";

interface GrowthChartProps {
  currentRevenue: number;
  targetRevenue: number;
  months: number;
  monthlyGrowthRate: number;
}

function formatCompact(value: number): string {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
}

export function GrowthChart({
  currentRevenue,
  targetRevenue,
  months,
  monthlyGrowthRate,
}: GrowthChartProps) {
  // Generate data points for the growth curve
  const dataPoints: { month: number; revenue: number }[] = [];
  for (let i = 0; i <= months; i++) {
    const revenue = currentRevenue * Math.pow(1 + monthlyGrowthRate / 100, i);
    dataPoints.push({ month: i, revenue });
  }

  // Chart dimensions
  const width = 400;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale functions
  const xScale = (month: number) => (month / months) * chartWidth + padding.left;
  const yScale = (revenue: number) => {
    const minY = currentRevenue * 0.9;
    const maxY = targetRevenue * 1.1;
    return height - padding.bottom - ((revenue - minY) / (maxY - minY)) * chartHeight;
  };

  // Generate SVG path for the curve
  const pathData = dataPoints
    .map((point, i) => {
      const x = xScale(point.month);
      const y = yScale(point.revenue);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  // Generate area path (filled under the curve)
  const areaPath = `${pathData} L ${xScale(months)} ${height - padding.bottom} L ${xScale(0)} ${height - padding.bottom} Z`;

  // Key milestone months to show on chart (quarterly for 12mo, or evenly spaced)
  const milestoneInterval = months <= 6 ? 2 : months <= 12 ? 3 : 6;
  const chartMilestones = dataPoints.filter(
    (_, i) => i === 0 || i === months || (i % milestoneInterval === 0 && i !== 0 && i !== months)
  );

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Gradient definition */}
        <defs>
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padding.top + chartHeight * (1 - pct);
          return (
            <line
              key={pct}
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area under curve */}
        <path d={areaPath} fill="url(#growthGradient)" />

        {/* Curve line */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Milestone points with revenue labels */}
        {chartMilestones.map((point, idx) => {
          const isFirst = point.month === 0;
          const isLast = point.month === months;
          return (
            <g key={point.month}>
              {/* Point */}
              <circle
                cx={xScale(point.month)}
                cy={yScale(point.revenue)}
                r={isFirst || isLast ? 5 : 4}
                fill={isLast ? "var(--color-primary)" : "var(--color-background)"}
                stroke="var(--color-primary)"
                strokeWidth="2"
              />
              {/* Revenue label above point */}
              <text
                x={xScale(point.month)}
                y={yScale(point.revenue) - 12}
                textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                style={{
                  fontSize: isFirst || isLast ? "11px" : "10px",
                  fill: isLast ? "var(--color-primary)" : "var(--color-secondary)",
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {formatCompact(point.revenue)}
              </text>
              {/* Month label below */}
              <text
                x={xScale(point.month)}
                y={height - 10}
                textAnchor="middle"
                style={{ fontSize: "11px", fill: "var(--color-secondary)" }}
              >
                {isFirst ? "Now" : `${point.month}mo`}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Monthly breakdown table */}
      <div className="mt-4 border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-3 py-2 text-xs font-medium text-secondary border-b border-border">
          Monthly Revenue Targets
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-px bg-border">
          {dataPoints.slice(1).map((point) => (
            <div key={point.month} className="bg-background px-2 py-1.5 text-center">
              <div className="text-[10px] text-secondary">Mo {point.month}</div>
              <div className="text-xs font-medium">{formatCompact(point.revenue)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3 text-xs text-secondary">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-primary rounded" />
          <span>Compound growth</span>
        </div>
        <div>
          {monthlyGrowthRate.toFixed(1)}% monthly
        </div>
      </div>
    </div>
  );
}
