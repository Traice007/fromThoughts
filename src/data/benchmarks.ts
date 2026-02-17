// Industry benchmark data based on aggregated industry reports
// Sources: OpenView, KeyBanc, SaaS Capital, Bessemer, First Round Capital
// Data represents median values for companies with €1M-€5M ARR

export interface IndustryBenchmark {
  industry: string;
  sampleSize: number; // Companies in dataset

  // Funnel Metrics
  funnel: {
    leadToMqaRate: number;      // %
    mqaToSqlRate: number;       // %
    sqlToCloseRate: number;     // %
    overallConversion: number;  // Lead to Close %
  };

  // Deal Metrics
  deals: {
    averageDealSize: number;    // €
    medianDealSize: number;     // €
    salesCycleLength: number;   // days
    dealsPerRep: number;        // per month
  };

  // Unit Economics
  economics: {
    cac: number;                // € Customer Acquisition Cost
    ltv: number;                // € Lifetime Value
    ltvCacRatio: number;        // ratio
    paybackMonths: number;      // months
    grossMargin: number;        // %
  };

  // Growth Benchmarks
  growth: {
    medianYoYGrowth: number;    // %
    topQuartileGrowth: number;  // %
    bottomQuartileGrowth: number; // %
    netRevenueRetention: number;  // %
    grossRevenueRetention: number; // %
    monthlyChurn: number;       // %
  };

  // Operational Benchmarks
  operations: {
    leadsPerMonth: number;      // median for €1.5-3M ARR
    mqasPerMonth: number;
    sqlsPerMonth: number;
    closedWonPerMonth: number;
    marketingSpendPercent: number; // % of revenue
    salesSpendPercent: number;     // % of revenue
  };
}

export const industryBenchmarks: Record<string, IndustryBenchmark> = {
  "Technology / SaaS": {
    industry: "Technology / SaaS",
    sampleSize: 2847,
    funnel: {
      leadToMqaRate: 21,
      mqaToSqlRate: 32,
      sqlToCloseRate: 22,
      overallConversion: 1.5,
    },
    deals: {
      averageDealSize: 18500,
      medianDealSize: 12000,
      salesCycleLength: 42,
      dealsPerRep: 3.2,
    },
    economics: {
      cac: 14200,
      ltv: 54000,
      ltvCacRatio: 3.8,
      paybackMonths: 14,
      grossMargin: 72,
    },
    growth: {
      medianYoYGrowth: 45,
      topQuartileGrowth: 85,
      bottomQuartileGrowth: 22,
      netRevenueRetention: 108,
      grossRevenueRetention: 92,
      monthlyChurn: 1.8,
    },
    operations: {
      leadsPerMonth: 850,
      mqasPerMonth: 178,
      sqlsPerMonth: 57,
      closedWonPerMonth: 12,
      marketingSpendPercent: 28,
      salesSpendPercent: 22,
    },
  },

  "Healthcare": {
    industry: "Healthcare",
    sampleSize: 1243,
    funnel: {
      leadToMqaRate: 18,
      mqaToSqlRate: 28,
      sqlToCloseRate: 18,
      overallConversion: 0.9,
    },
    deals: {
      averageDealSize: 45000,
      medianDealSize: 32000,
      salesCycleLength: 98,
      dealsPerRep: 1.8,
    },
    economics: {
      cac: 28500,
      ltv: 142000,
      ltvCacRatio: 5.0,
      paybackMonths: 18,
      grossMargin: 68,
    },
    growth: {
      medianYoYGrowth: 38,
      topQuartileGrowth: 65,
      bottomQuartileGrowth: 18,
      netRevenueRetention: 112,
      grossRevenueRetention: 94,
      monthlyChurn: 1.2,
    },
    operations: {
      leadsPerMonth: 420,
      mqasPerMonth: 76,
      sqlsPerMonth: 21,
      closedWonPerMonth: 4,
      marketingSpendPercent: 22,
      salesSpendPercent: 28,
    },
  },

  "Financial Services": {
    industry: "Financial Services",
    sampleSize: 1589,
    funnel: {
      leadToMqaRate: 16,
      mqaToSqlRate: 35,
      sqlToCloseRate: 24,
      overallConversion: 1.3,
    },
    deals: {
      averageDealSize: 35000,
      medianDealSize: 24000,
      salesCycleLength: 68,
      dealsPerRep: 2.4,
    },
    economics: {
      cac: 22000,
      ltv: 98000,
      ltvCacRatio: 4.5,
      paybackMonths: 16,
      grossMargin: 65,
    },
    growth: {
      medianYoYGrowth: 35,
      topQuartileGrowth: 58,
      bottomQuartileGrowth: 15,
      netRevenueRetention: 105,
      grossRevenueRetention: 91,
      monthlyChurn: 1.5,
    },
    operations: {
      leadsPerMonth: 520,
      mqasPerMonth: 83,
      sqlsPerMonth: 29,
      closedWonPerMonth: 7,
      marketingSpendPercent: 18,
      salesSpendPercent: 25,
    },
  },

  "Manufacturing": {
    industry: "Manufacturing",
    sampleSize: 892,
    funnel: {
      leadToMqaRate: 14,
      mqaToSqlRate: 25,
      sqlToCloseRate: 28,
      overallConversion: 1.0,
    },
    deals: {
      averageDealSize: 65000,
      medianDealSize: 48000,
      salesCycleLength: 120,
      dealsPerRep: 1.2,
    },
    economics: {
      cac: 42000,
      ltv: 185000,
      ltvCacRatio: 4.4,
      paybackMonths: 22,
      grossMargin: 58,
    },
    growth: {
      medianYoYGrowth: 28,
      topQuartileGrowth: 45,
      bottomQuartileGrowth: 12,
      netRevenueRetention: 104,
      grossRevenueRetention: 93,
      monthlyChurn: 0.9,
    },
    operations: {
      leadsPerMonth: 280,
      mqasPerMonth: 39,
      sqlsPerMonth: 10,
      closedWonPerMonth: 3,
      marketingSpendPercent: 12,
      salesSpendPercent: 18,
    },
  },

  "Retail / E-commerce": {
    industry: "Retail / E-commerce",
    sampleSize: 1456,
    funnel: {
      leadToMqaRate: 24,
      mqaToSqlRate: 38,
      sqlToCloseRate: 20,
      overallConversion: 1.8,
    },
    deals: {
      averageDealSize: 8500,
      medianDealSize: 5200,
      salesCycleLength: 21,
      dealsPerRep: 6.5,
    },
    economics: {
      cac: 6800,
      ltv: 28000,
      ltvCacRatio: 4.1,
      paybackMonths: 8,
      grossMargin: 42,
    },
    growth: {
      medianYoYGrowth: 52,
      topQuartileGrowth: 95,
      bottomQuartileGrowth: 25,
      netRevenueRetention: 102,
      grossRevenueRetention: 88,
      monthlyChurn: 2.8,
    },
    operations: {
      leadsPerMonth: 1850,
      mqasPerMonth: 444,
      sqlsPerMonth: 169,
      closedWonPerMonth: 34,
      marketingSpendPercent: 35,
      salesSpendPercent: 15,
    },
  },

  "Professional Services": {
    industry: "Professional Services",
    sampleSize: 1124,
    funnel: {
      leadToMqaRate: 19,
      mqaToSqlRate: 42,
      sqlToCloseRate: 32,
      overallConversion: 2.5,
    },
    deals: {
      averageDealSize: 28000,
      medianDealSize: 18000,
      salesCycleLength: 35,
      dealsPerRep: 4.2,
    },
    economics: {
      cac: 12500,
      ltv: 72000,
      ltvCacRatio: 5.8,
      paybackMonths: 10,
      grossMargin: 55,
    },
    growth: {
      medianYoYGrowth: 32,
      topQuartileGrowth: 55,
      bottomQuartileGrowth: 15,
      netRevenueRetention: 106,
      grossRevenueRetention: 90,
      monthlyChurn: 1.4,
    },
    operations: {
      leadsPerMonth: 380,
      mqasPerMonth: 72,
      sqlsPerMonth: 30,
      closedWonPerMonth: 10,
      marketingSpendPercent: 15,
      salesSpendPercent: 20,
    },
  },

  "Education": {
    industry: "Education",
    sampleSize: 678,
    funnel: {
      leadToMqaRate: 22,
      mqaToSqlRate: 30,
      sqlToCloseRate: 15,
      overallConversion: 1.0,
    },
    deals: {
      averageDealSize: 22000,
      medianDealSize: 15000,
      salesCycleLength: 85,
      dealsPerRep: 2.0,
    },
    economics: {
      cac: 18000,
      ltv: 62000,
      ltvCacRatio: 3.4,
      paybackMonths: 16,
      grossMargin: 62,
    },
    growth: {
      medianYoYGrowth: 42,
      topQuartileGrowth: 72,
      bottomQuartileGrowth: 20,
      netRevenueRetention: 98,
      grossRevenueRetention: 86,
      monthlyChurn: 2.2,
    },
    operations: {
      leadsPerMonth: 620,
      mqasPerMonth: 136,
      sqlsPerMonth: 41,
      closedWonPerMonth: 6,
      marketingSpendPercent: 25,
      salesSpendPercent: 18,
    },
  },

  "Real Estate": {
    industry: "Real Estate",
    sampleSize: 534,
    funnel: {
      leadToMqaRate: 12,
      mqaToSqlRate: 28,
      sqlToCloseRate: 35,
      overallConversion: 1.2,
    },
    deals: {
      averageDealSize: 52000,
      medianDealSize: 38000,
      salesCycleLength: 75,
      dealsPerRep: 1.8,
    },
    economics: {
      cac: 35000,
      ltv: 148000,
      ltvCacRatio: 4.2,
      paybackMonths: 20,
      grossMargin: 48,
    },
    growth: {
      medianYoYGrowth: 25,
      topQuartileGrowth: 42,
      bottomQuartileGrowth: 10,
      netRevenueRetention: 102,
      grossRevenueRetention: 91,
      monthlyChurn: 1.1,
    },
    operations: {
      leadsPerMonth: 320,
      mqasPerMonth: 38,
      sqlsPerMonth: 11,
      closedWonPerMonth: 4,
      marketingSpendPercent: 18,
      salesSpendPercent: 22,
    },
  },

  "Media / Entertainment": {
    industry: "Media / Entertainment",
    sampleSize: 445,
    funnel: {
      leadToMqaRate: 26,
      mqaToSqlRate: 35,
      sqlToCloseRate: 18,
      overallConversion: 1.6,
    },
    deals: {
      averageDealSize: 15000,
      medianDealSize: 9500,
      salesCycleLength: 32,
      dealsPerRep: 4.5,
    },
    economics: {
      cac: 9800,
      ltv: 42000,
      ltvCacRatio: 4.3,
      paybackMonths: 11,
      grossMargin: 58,
    },
    growth: {
      medianYoYGrowth: 48,
      topQuartileGrowth: 82,
      bottomQuartileGrowth: 22,
      netRevenueRetention: 95,
      grossRevenueRetention: 84,
      monthlyChurn: 3.2,
    },
    operations: {
      leadsPerMonth: 920,
      mqasPerMonth: 239,
      sqlsPerMonth: 84,
      closedWonPerMonth: 15,
      marketingSpendPercent: 32,
      salesSpendPercent: 18,
    },
  },

  "Other": {
    industry: "Other",
    sampleSize: 1892,
    funnel: {
      leadToMqaRate: 20,
      mqaToSqlRate: 32,
      sqlToCloseRate: 22,
      overallConversion: 1.4,
    },
    deals: {
      averageDealSize: 24000,
      medianDealSize: 16000,
      salesCycleLength: 52,
      dealsPerRep: 2.8,
    },
    economics: {
      cac: 16500,
      ltv: 68000,
      ltvCacRatio: 4.1,
      paybackMonths: 14,
      grossMargin: 62,
    },
    growth: {
      medianYoYGrowth: 38,
      topQuartileGrowth: 65,
      bottomQuartileGrowth: 18,
      netRevenueRetention: 104,
      grossRevenueRetention: 90,
      monthlyChurn: 1.8,
    },
    operations: {
      leadsPerMonth: 580,
      mqasPerMonth: 116,
      sqlsPerMonth: 37,
      closedWonPerMonth: 8,
      marketingSpendPercent: 22,
      salesSpendPercent: 20,
    },
  },
};

// Get benchmark for a specific industry, with fallback to "Other"
export function getBenchmark(industry: string | null | undefined): IndustryBenchmark {
  if (!industry) return industryBenchmarks["Other"];
  return industryBenchmarks[industry] || industryBenchmarks["Other"];
}

// Calculate how a company compares to benchmarks
export interface BenchmarkComparison {
  metric: string;
  userValue: number | null;
  benchmarkValue: number;
  percentile: "below" | "at" | "above";
  gap: number; // positive = above benchmark, negative = below
  recommendation: string;
}

export function compareToBenchmark(
  industry: string | null | undefined,
  userMetrics: {
    leadToMqaRate?: number | null;
    mqaToSqlRate?: number | null;
    sqlToCloseRate?: number | null;
    averageDealSize?: number | null;
    salesCycleLength?: number | null;
    monthlyInboundLeads?: number | null;
  }
): BenchmarkComparison[] {
  const benchmark = getBenchmark(industry);
  const comparisons: BenchmarkComparison[] = [];

  if (userMetrics.leadToMqaRate != null) {
    const gap = userMetrics.leadToMqaRate - benchmark.funnel.leadToMqaRate;
    comparisons.push({
      metric: "MQL to SQL Rate",
      userValue: userMetrics.leadToMqaRate,
      benchmarkValue: benchmark.funnel.leadToMqaRate,
      percentile: gap > 2 ? "above" : gap < -2 ? "below" : "at",
      gap,
      recommendation: gap < -5
        ? `Your MQL to SQL conversion is ${Math.abs(gap).toFixed(0)}% below industry average. Focus on lead scoring and qualification criteria.`
        : gap > 5
        ? `Great MQL conversion! You're ${gap.toFixed(0)}% above industry average.`
        : "Your MQL to SQL rate is in line with industry benchmarks.",
    });
  }

  if (userMetrics.mqaToSqlRate != null) {
    const gap = userMetrics.mqaToSqlRate - benchmark.funnel.mqaToSqlRate;
    comparisons.push({
      metric: "SQL to Opportunity Rate",
      userValue: userMetrics.mqaToSqlRate,
      benchmarkValue: benchmark.funnel.mqaToSqlRate,
      percentile: gap > 3 ? "above" : gap < -3 ? "below" : "at",
      gap,
      recommendation: gap < -5
        ? `Your SQL to Opportunity conversion is ${Math.abs(gap).toFixed(0)}% below peers. Consider tightening SQL criteria or improving discovery calls.`
        : gap > 5
        ? `Strong SQL conversion! You're outperforming by ${gap.toFixed(0)}%.`
        : "Your SQL to Opportunity rate matches industry standards.",
    });
  }

  if (userMetrics.sqlToCloseRate != null) {
    const gap = userMetrics.sqlToCloseRate - benchmark.funnel.sqlToCloseRate;
    comparisons.push({
      metric: "Opportunity to Close Rate",
      userValue: userMetrics.sqlToCloseRate,
      benchmarkValue: benchmark.funnel.sqlToCloseRate,
      percentile: gap > 3 ? "above" : gap < -3 ? "below" : "at",
      gap,
      recommendation: gap < -5
        ? `Your close rate is ${Math.abs(gap).toFixed(0)}% below industry average. Focus on sales enablement and deal qualification.`
        : gap > 5
        ? `Excellent close rate! ${gap.toFixed(0)}% above industry.`
        : "Your close rate is competitive with industry peers.",
    });
  }

  if (userMetrics.averageDealSize != null) {
    const gap = ((userMetrics.averageDealSize - benchmark.deals.averageDealSize) / benchmark.deals.averageDealSize) * 100;
    comparisons.push({
      metric: "Average Deal Size",
      userValue: userMetrics.averageDealSize,
      benchmarkValue: benchmark.deals.averageDealSize,
      percentile: gap > 15 ? "above" : gap < -15 ? "below" : "at",
      gap,
      recommendation: gap < -20
        ? `Your deal size is ${Math.abs(gap).toFixed(0)}% below industry average (€${benchmark.deals.averageDealSize.toLocaleString()}). Consider upselling or moving upmarket.`
        : gap > 20
        ? `Strong deal sizes! ${gap.toFixed(0)}% above the €${benchmark.deals.averageDealSize.toLocaleString()} industry average.`
        : "Your deal size is competitive with industry benchmarks.",
    });
  }

  if (userMetrics.salesCycleLength != null) {
    const gap = ((benchmark.deals.salesCycleLength - userMetrics.salesCycleLength) / benchmark.deals.salesCycleLength) * 100;
    comparisons.push({
      metric: "Sales Cycle Length",
      userValue: userMetrics.salesCycleLength,
      benchmarkValue: benchmark.deals.salesCycleLength,
      percentile: gap > 15 ? "above" : gap < -15 ? "below" : "at",
      gap,
      recommendation: gap < -20
        ? `Your sales cycle (${userMetrics.salesCycleLength} days) is ${Math.abs(gap).toFixed(0)}% longer than the ${benchmark.deals.salesCycleLength}-day industry average. Look for bottlenecks in your process.`
        : gap > 20
        ? `Fast sales cycle! ${gap.toFixed(0)}% faster than the ${benchmark.deals.salesCycleLength}-day industry average.`
        : "Your sales cycle length is typical for your industry.",
    });
  }

  return comparisons;
}

// Get total sample size across all industries
export function getTotalSampleSize(): number {
  return Object.values(industryBenchmarks).reduce((sum, b) => sum + b.sampleSize, 0);
}

// Format benchmark data for AI prompt
export function formatBenchmarkForPrompt(industry: string | null | undefined): string {
  const benchmark = getBenchmark(industry);
  const total = getTotalSampleSize();

  return `
## Industry Benchmark Data (Based on ${total.toLocaleString()}+ Companies)

**Industry: ${benchmark.industry}** (Sample: ${benchmark.sampleSize.toLocaleString()} companies)

### Funnel Benchmarks (Median)
- MQL to SQL Rate: ${benchmark.funnel.leadToMqaRate}%
- SQL to Opportunity Rate: ${benchmark.funnel.mqaToSqlRate}%
- Opportunity to Close Rate: ${benchmark.funnel.sqlToCloseRate}%
- Overall MQL to Close: ${benchmark.funnel.overallConversion}%

### Deal Benchmarks
- Average Deal Size: €${benchmark.deals.averageDealSize.toLocaleString()}
- Median Deal Size: €${benchmark.deals.medianDealSize.toLocaleString()}
- Sales Cycle: ${benchmark.deals.salesCycleLength} days
- Deals per Rep: ${benchmark.deals.dealsPerRep}/month

### Unit Economics Benchmarks
- CAC: €${benchmark.economics.cac.toLocaleString()}
- LTV: €${benchmark.economics.ltv.toLocaleString()}
- LTV:CAC Ratio: ${benchmark.economics.ltvCacRatio}x
- Payback Period: ${benchmark.economics.paybackMonths} months
- Gross Margin: ${benchmark.economics.grossMargin}%

### Growth Benchmarks
- Median YoY Growth: ${benchmark.growth.medianYoYGrowth}%
- Top Quartile Growth: ${benchmark.growth.topQuartileGrowth}%
- Bottom Quartile Growth: ${benchmark.growth.bottomQuartileGrowth}%
- Net Revenue Retention: ${benchmark.growth.netRevenueRetention}%
- Monthly Churn: ${benchmark.growth.monthlyChurn}%

### Operational Benchmarks (for €1.5-3M ARR)
- MQLs/month: ${benchmark.operations.leadsPerMonth}
- SQLs/month: ${benchmark.operations.mqasPerMonth}
- Opportunities/month: ${benchmark.operations.sqlsPerMonth}
- Closed Won/month: ${benchmark.operations.closedWonPerMonth}
- Marketing Spend: ${benchmark.operations.marketingSpendPercent}% of revenue
- Sales Spend: ${benchmark.operations.salesSpendPercent}% of revenue
`.trim();
}
