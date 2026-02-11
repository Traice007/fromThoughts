import type { ParsedDeal } from "./csv-parser";
import type { CanonicalStage } from "./stage-mapper";
import { STAGE_ORDER } from "./stage-mapper";
import type { MetricsStepData } from "@/types/forecast";

export interface PipelineMetrics {
  totalDeals: number;
  totalValue: number;
  avgDealSize: number;
  avgSalesCycleDays: number | null;
  dealsByStage: Record<CanonicalStage, number>;
  valueByStage: Record<CanonicalStage, number>;
  conversionRates: {
    leadToMqa: number | null;
    mqaToSql: number | null;
    sqlToClose: number | null;
  };
  forecastFormData: Partial<MetricsStepData>;
}

// Pipeline stages in order (excluding closed lost for funnel calculations)
const FUNNEL_STAGES: CanonicalStage[] = [
  "LEAD",
  "MQL",
  "SQL",
  "OPPORTUNITY",
  "PROPOSAL",
  "NEGOTIATION",
  "CLOSED_WON",
];

export function calculateMetrics(deals: ParsedDeal[]): PipelineMetrics {
  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const avgDealSize = totalDeals > 0 ? totalValue / totalDeals : 0;

  // Count deals by stage
  const dealsByStage = {} as Record<CanonicalStage, number>;
  const valueByStage = {} as Record<CanonicalStage, number>;
  for (const stage of Object.keys(STAGE_ORDER) as CanonicalStage[]) {
    dealsByStage[stage] = 0;
    valueByStage[stage] = 0;
  }
  for (const deal of deals) {
    dealsByStage[deal.stage] = (dealsByStage[deal.stage] || 0) + 1;
    valueByStage[deal.stage] = (valueByStage[deal.stage] || 0) + deal.value;
  }

  // Calculate sales cycle from deals that have both created and close dates
  let avgSalesCycleDays: number | null = null;
  const dealsWithDates = deals.filter((d) => d.createdDate && d.closeDate);
  if (dealsWithDates.length > 0) {
    const totalDays = dealsWithDates.reduce((sum, d) => {
      const created = new Date(d.createdDate!);
      const closed = new Date(d.closeDate!);
      const diffMs = closed.getTime() - created.getTime();
      return sum + Math.max(0, diffMs / (1000 * 60 * 60 * 24));
    }, 0);
    avgSalesCycleDays = Math.round(totalDays / dealsWithDates.length);
  }

  // Conversion rates: count deals at or past each stage
  // A deal at SQL has "passed through" Lead and MQL
  const atOrPastStage = (stage: CanonicalStage): number => {
    const stageIdx = FUNNEL_STAGES.indexOf(stage);
    if (stageIdx === -1) return 0;
    return deals.filter((d) => {
      if (d.stage === "CLOSED_LOST") return false; // Exclude lost deals from funnel
      const dealIdx = FUNNEL_STAGES.indexOf(d.stage);
      return dealIdx >= stageIdx;
    }).length;
  };

  const leadsAndBeyond = atOrPastStage("LEAD") + dealsByStage["CLOSED_LOST"];
  const mqaAndBeyond = atOrPastStage("MQL");
  const sqlAndBeyond = atOrPastStage("SQL");
  const closedWon = dealsByStage["CLOSED_WON"];

  const leadToMqa = leadsAndBeyond > 0 ? (mqaAndBeyond / leadsAndBeyond) * 100 : null;
  const mqaToSql = mqaAndBeyond > 0 ? (sqlAndBeyond / mqaAndBeyond) * 100 : null;
  const sqlToClose =
    sqlAndBeyond > 0 ? (closedWon / sqlAndBeyond) * 100 : null;

  // Map to forecast form data
  const forecastFormData: Partial<MetricsStepData> = {
    averageDealSize: Math.round(avgDealSize),
    ...(avgSalesCycleDays !== null && { salesCycleLength: avgSalesCycleDays }),
    ...(dealsByStage["LEAD"] > 0 && {
      monthlyInboundLeads: dealsByStage["LEAD"],
    }),
    ...(dealsByStage["MQL"] > 0 && {
      marketingQualifiedAccounts: dealsByStage["MQL"],
    }),
    ...(dealsByStage["SQL"] > 0 && {
      salesQualifiedLeads: dealsByStage["SQL"],
    }),
    ...(leadToMqa !== null && { leadToMqaRate: Math.round(leadToMqa) }),
    ...(mqaToSql !== null && { mqaToSqlRate: Math.round(mqaToSql) }),
    ...(sqlToClose !== null && { sqlToCloseRate: Math.round(sqlToClose) }),
  };

  return {
    totalDeals,
    totalValue,
    avgDealSize,
    avgSalesCycleDays,
    dealsByStage,
    valueByStage,
    conversionRates: {
      leadToMqa,
      mqaToSql,
      sqlToClose,
    },
    forecastFormData,
  };
}
