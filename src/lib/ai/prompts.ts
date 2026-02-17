import type { Forecast } from "@prisma/client";
import { formatBenchmarkForPrompt, compareToBenchmark, getTotalSampleSize } from "@/data/benchmarks";

export function buildOkrPrompt(forecast: Forecast): string {
  const revenueGap = forecast.targetRevenue - forecast.currentRevenue;
  const growthRequired = ((revenueGap / forecast.currentRevenue) * 100).toFixed(1);
  const monthlyGrowthRate = (Math.pow(forecast.targetRevenue / forecast.currentRevenue, 1 / forecast.timeHorizonMonths) - 1) * 100;

  let metricsSection = "";
  if (forecast.monthlyInboundLeads || forecast.marketingQualifiedAccounts || forecast.salesQualifiedLeads) {
    metricsSection = `
## Current Funnel Metrics
${forecast.monthlyInboundLeads ? `- Monthly Inbound Leads: ${forecast.monthlyInboundLeads}` : ""}
${forecast.marketingQualifiedAccounts ? `- Marketing Qualified Accounts (MQAs): ${forecast.marketingQualifiedAccounts}` : ""}
${forecast.salesQualifiedLeads ? `- Sales Qualified Leads (SQLs): ${forecast.salesQualifiedLeads}` : ""}
${forecast.leadToMqaRate ? `- Lead to MQA Conversion: ${forecast.leadToMqaRate}%` : ""}
${forecast.mqaToSqlRate ? `- MQA to SQL Conversion: ${forecast.mqaToSqlRate}%` : ""}
${forecast.sqlToCloseRate ? `- SQL to Close Rate: ${forecast.sqlToCloseRate}%` : ""}
${forecast.averageDealSize ? `- Average Deal Size: €${forecast.averageDealSize.toLocaleString()}` : ""}
${forecast.salesCycleLength ? `- Sales Cycle Length: ${forecast.salesCycleLength} days` : ""}
`.trim();
  }

  let marketSection = "";
  if (forecast.industry || forecast.targetMarket || forecast.idealCustomerProfile) {
    marketSection = `
## Market Context
${forecast.industry ? `- Industry: ${forecast.industry}` : ""}
${forecast.targetMarket ? `- Target Market: ${forecast.targetMarket}` : ""}
${forecast.idealCustomerProfile ? `- ICP: ${forecast.idealCustomerProfile}` : ""}
${forecast.competitivePosition ? `- Competitive Position: ${forecast.competitivePosition}` : ""}
`.trim();
  }

  // Get benchmark data for their industry
  const benchmarkSection = formatBenchmarkForPrompt(forecast.industry);
  const totalCompanies = getTotalSampleSize();

  // Get comparison to benchmarks if they provided metrics
  const comparisons = compareToBenchmark(forecast.industry, {
    leadToMqaRate: forecast.leadToMqaRate,
    mqaToSqlRate: forecast.mqaToSqlRate,
    sqlToCloseRate: forecast.sqlToCloseRate,
    averageDealSize: forecast.averageDealSize,
    salesCycleLength: forecast.salesCycleLength,
    monthlyInboundLeads: forecast.monthlyInboundLeads,
  });

  let comparisonSection = "";
  if (comparisons.length > 0) {
    comparisonSection = `
## How This Company Compares to ${totalCompanies.toLocaleString()}+ Peers
${comparisons.map(c => `
### ${c.metric}
- Their Value: ${c.userValue}${c.metric.includes("Rate") || c.metric.includes("%") ? "%" : c.metric.includes("Size") ? "" : " days"}
- Industry Benchmark: ${c.benchmarkValue}${c.metric.includes("Rate") || c.metric.includes("%") ? "%" : c.metric.includes("Size") ? "" : " days"}
- Performance: ${c.percentile === "above" ? "ABOVE average" : c.percentile === "below" ? "BELOW average" : "AT average"}
- Insight: ${c.recommendation}
`).join("")}
`.trim();
  }

  return `You are a strategic revenue operations advisor helping SMB founders translate revenue goals into actionable execution plans. Your recommendations are backed by real data from ${totalCompanies.toLocaleString()}+ companies across industries.

Your audience is typically founders who are considering hiring a VP of Commercial but may be too early for that hire.

## Business Context
- Company: ${forecast.companyName || "Growth-stage company"}
- Current ARR: €${forecast.currentRevenue.toLocaleString()}
- Target ARR: €${forecast.targetRevenue.toLocaleString()}
- Time Horizon: ${forecast.timeHorizonMonths} months
- Revenue Gap: €${revenueGap.toLocaleString()} (${growthRequired}% growth required)
- Required Monthly Growth Rate: ${monthlyGrowthRate.toFixed(1)}%

${metricsSection}

${marketSection}

${benchmarkSection}

${comparisonSection}

## Your Task
Generate 4-6 strategic OKRs that will help this company achieve their revenue target. **Base your recommendations on the benchmark data above.** Each OKR should:
1. Be specific and measurable with targets based on industry benchmarks
2. Be achievable within the time horizon
3. Be directly tied to revenue growth
4. Be actionable without requiring a VP of Commercial
5. Reference specific benchmark gaps where the company is underperforming

For each OKR:
- Write a clear objective statement (the WHAT)
- Specify a timeframe (the WHEN) - be specific like "Next 90 days", "By end of Q2", etc.
- Explain how to achieve it (the HOW) - 2-3 tactical steps the team should take
- Include 2-4 specific key results with metrics (use benchmark data to set realistic targets)
- Categorize as: REVENUE, PIPELINE, CONVERSION, CUSTOMER, OPERATIONS, or PRODUCT
- Assign a priority (1-10, higher = more important)
- Provide rationale (the WHY) explaining why this OKR matters AND how it compares to what top-performing companies in their industry achieve

Also provide:
1. Gap Analysis: Identify the biggest gaps vs industry benchmarks and quantify the impact
2. Top 3 Recommendations: Immediate actions based on where they're furthest from benchmark

Return your response as valid JSON matching this exact schema:
{
  "okrs": [
    {
      "objective": "string",
      "category": "REVENUE" | "PIPELINE" | "CONVERSION" | "CUSTOMER" | "OPERATIONS" | "PRODUCT",
      "priority": number (1-10),
      "timeframe": "string (e.g., 'Next 90 days', 'By end of Q2', 'Within 6 months')",
      "howToAchieve": "string (2-3 tactical steps to accomplish this)",
      "rationale": "string",
      "keyResults": [
        {
          "description": "string",
          "metricName": "string",
          "currentValue": number | null,
          "targetValue": number,
          "unit": "string (%, count, €, etc.)"
        }
      ]
    }
  ],
  "gapAnalysis": {
    "revenueGap": number,
    "requiredGrowthRate": number,
    "pipelineGap": number | null,
    "conversionGaps": [
      {
        "stage": "string",
        "currentRate": number,
        "requiredRate": number
      }
    ] | null,
    "summary": "string"
  },
  "recommendations": ["string", "string", "string"]
}`;
}

export const OKR_OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    okrs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          objective: { type: "string" },
          category: { type: "string", enum: ["REVENUE", "PIPELINE", "CONVERSION", "CUSTOMER", "OPERATIONS", "PRODUCT"] },
          priority: { type: "number" },
          timeframe: { type: "string" },
          howToAchieve: { type: "string" },
          rationale: { type: "string" },
          keyResults: {
            type: "array",
            items: {
              type: "object",
              properties: {
                description: { type: "string" },
                metricName: { type: "string" },
                currentValue: { type: ["number", "null"] },
                targetValue: { type: "number" },
                unit: { type: "string" }
              },
              required: ["description", "metricName", "targetValue", "unit"]
            }
          }
        },
        required: ["objective", "category", "priority", "timeframe", "keyResults"]
      }
    },
    gapAnalysis: {
      type: "object",
      properties: {
        revenueGap: { type: "number" },
        requiredGrowthRate: { type: "number" },
        pipelineGap: { type: ["number", "null"] },
        conversionGaps: { type: ["array", "null"] },
        summary: { type: "string" }
      },
      required: ["revenueGap", "requiredGrowthRate", "summary"]
    },
    recommendations: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["okrs", "gapAnalysis", "recommendations"]
};
