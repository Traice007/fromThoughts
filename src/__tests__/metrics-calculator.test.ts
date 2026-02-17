import { describe, it, expect } from "vitest";
import { calculateMetrics } from "@/lib/pipeline/metrics-calculator";
import type { ParsedDeal } from "@/lib/pipeline/csv-parser";

function makeDeal(overrides: Partial<ParsedDeal> = {}): ParsedDeal {
  return {
    dealName: "Test Deal",
    value: 25000,
    stage: "LEAD",
    stageOriginal: "Lead",
    stageWasUnknown: false,
    probability: null,
    createdDate: null,
    closeDate: null,
    contactName: null,
    companyName: null,
    notes: null,
    ...overrides,
  };
}

describe("calculateMetrics", () => {
  it("handles empty deal array", () => {
    const result = calculateMetrics([]);
    expect(result.totalDeals).toBe(0);
    expect(result.totalValue).toBe(0);
    expect(result.avgDealSize).toBe(0);
    expect(result.avgSalesCycleDays).toBeNull();
    expect(result.conversionRates.leadToMqa).toBeNull();
    expect(result.conversionRates.mqaToSql).toBeNull();
    expect(result.conversionRates.sqlToClose).toBeNull();
  });

  it("calculates totals correctly", () => {
    const deals = [
      makeDeal({ value: 10000 }),
      makeDeal({ value: 20000 }),
      makeDeal({ value: 30000 }),
    ];
    const result = calculateMetrics(deals);
    expect(result.totalDeals).toBe(3);
    expect(result.totalValue).toBe(60000);
    expect(result.avgDealSize).toBe(20000);
  });

  it("counts deals by stage", () => {
    const deals = [
      makeDeal({ stage: "LEAD" }),
      makeDeal({ stage: "LEAD" }),
      makeDeal({ stage: "SQL" }),
      makeDeal({ stage: "CLOSED_WON" }),
    ];
    const result = calculateMetrics(deals);
    expect(result.dealsByStage["LEAD"]).toBe(2);
    expect(result.dealsByStage["SQL"]).toBe(1);
    expect(result.dealsByStage["CLOSED_WON"]).toBe(1);
    expect(result.dealsByStage["MQL"]).toBe(0);
  });

  it("calculates value by stage", () => {
    const deals = [
      makeDeal({ stage: "LEAD", value: 10000 }),
      makeDeal({ stage: "LEAD", value: 15000 }),
      makeDeal({ stage: "CLOSED_WON", value: 50000 }),
    ];
    const result = calculateMetrics(deals);
    expect(result.valueByStage["LEAD"]).toBe(25000);
    expect(result.valueByStage["CLOSED_WON"]).toBe(50000);
  });

  it("calculates sales cycle from dates", () => {
    const deals = [
      makeDeal({
        createdDate: "2024-01-01",
        closeDate: "2024-02-01", // 31 days
      }),
      makeDeal({
        createdDate: "2024-01-01",
        closeDate: "2024-01-31", // 30 days
      }),
    ];
    const result = calculateMetrics(deals);
    expect(result.avgSalesCycleDays).toBe(31); // Math.round((31 + 30) / 2)
  });

  it("returns null sales cycle when no deals have dates", () => {
    const deals = [makeDeal(), makeDeal()];
    const result = calculateMetrics(deals);
    expect(result.avgSalesCycleDays).toBeNull();
  });

  it("clamps negative sales cycle to 0", () => {
    const deals = [
      makeDeal({
        createdDate: "2024-02-01",
        closeDate: "2024-01-01", // close before create
      }),
    ];
    const result = calculateMetrics(deals);
    expect(result.avgSalesCycleDays).toBe(0);
  });

  it("calculates conversion rates for a full funnel", () => {
    const deals = [
      makeDeal({ stage: "LEAD" }),
      makeDeal({ stage: "LEAD" }),
      makeDeal({ stage: "MQL" }),
      makeDeal({ stage: "MQL" }),
      makeDeal({ stage: "SQL" }),
      makeDeal({ stage: "CLOSED_WON" }),
      makeDeal({ stage: "CLOSED_LOST" }),
    ];
    const result = calculateMetrics(deals);

    // leadsAndBeyond = atOrPastStage("LEAD") + CLOSED_LOST
    // atOrPastStage("LEAD") = all non-CLOSED_LOST = 6
    // leadsAndBeyond = 6 + 1 = 7
    // mqaAndBeyond = atOrPastStage("MQL") = MQL(2) + SQL(1) + CLOSED_WON(1) = 4
    // sqlAndBeyond = atOrPastStage("SQL") = SQL(1) + CLOSED_WON(1) = 2
    // closedWon = 1

    expect(result.conversionRates.leadToMqa).toBeCloseTo((4 / 7) * 100, 1);
    expect(result.conversionRates.mqaToSql).toBeCloseTo((2 / 4) * 100, 1);
    expect(result.conversionRates.sqlToClose).toBeCloseTo((1 / 2) * 100, 1);
  });

  it("returns null conversion rates when no deals at that stage", () => {
    const deals = [makeDeal({ stage: "CLOSED_LOST" })];
    const result = calculateMetrics(deals);
    // leadsAndBeyond = 0 (atOrPastStage) + 1 (CLOSED_LOST) = 1
    // mqaAndBeyond = 0
    expect(result.conversionRates.leadToMqa).toBe(0); // 0/1 = 0
    expect(result.conversionRates.mqaToSql).toBeNull(); // 0 denominator
    expect(result.conversionRates.sqlToClose).toBeNull(); // 0 denominator
  });

  it("maps metrics to forecast form data", () => {
    const deals = [
      makeDeal({ stage: "LEAD", value: 20000 }),
      makeDeal({ stage: "LEAD", value: 30000 }),
      makeDeal({ stage: "SQL", value: 25000 }),
    ];
    const result = calculateMetrics(deals);
    expect(result.forecastFormData.averageDealSize).toBe(25000);
    expect(result.forecastFormData.monthlyInboundLeads).toBe(2);
    expect(result.forecastFormData.salesQualifiedLeads).toBe(1);
  });
});
