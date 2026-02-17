import { describe, it, expect } from "vitest";
import {
  getBenchmark,
  compareToBenchmark,
  getTotalSampleSize,
  formatBenchmarkForPrompt,
} from "@/data/benchmarks";

describe("getBenchmark", () => {
  it("returns correct benchmark for Technology / SaaS", () => {
    const benchmark = getBenchmark("Technology / SaaS");
    expect(benchmark.industry).toBe("Technology / SaaS");
    expect(benchmark.sampleSize).toBeGreaterThan(0);
  });

  it("falls back to Other for null", () => {
    const benchmark = getBenchmark(null);
    expect(benchmark.industry).toBe("Other");
  });

  it("falls back to Other for undefined", () => {
    const benchmark = getBenchmark(undefined);
    expect(benchmark.industry).toBe("Other");
  });

  it("falls back to Other for empty string", () => {
    const benchmark = getBenchmark("");
    expect(benchmark.industry).toBe("Other");
  });

  it("falls back to Other for unknown industry", () => {
    const benchmark = getBenchmark("Aerospace");
    expect(benchmark.industry).toBe("Other");
  });

  it("returns all expected benchmark fields", () => {
    const benchmark = getBenchmark("Technology / SaaS");
    expect(benchmark.funnel).toBeDefined();
    expect(benchmark.funnel.leadToMqaRate).toBeGreaterThan(0);
    expect(benchmark.funnel.mqaToSqlRate).toBeGreaterThan(0);
    expect(benchmark.funnel.sqlToCloseRate).toBeGreaterThan(0);
    expect(benchmark.deals).toBeDefined();
    expect(benchmark.deals.averageDealSize).toBeGreaterThan(0);
    expect(benchmark.deals.salesCycleLength).toBeGreaterThan(0);
    expect(benchmark.economics).toBeDefined();
    expect(benchmark.growth).toBeDefined();
  });
});

describe("compareToBenchmark", () => {
  it("returns empty array when no metrics provided", () => {
    const result = compareToBenchmark("Technology / SaaS", {});
    expect(result).toEqual([]);
  });

  it("returns empty array when all metrics are null", () => {
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: null,
      mqaToSqlRate: null,
      sqlToCloseRate: null,
      averageDealSize: null,
      salesCycleLength: null,
    });
    expect(result).toEqual([]);
  });

  it("compares a single metric correctly", () => {
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: 25,
    });
    expect(result).toHaveLength(1);
    expect(result[0].metric).toBe("MQL to SQL Rate");
    expect(result[0].userValue).toBe(25);
    expect(result[0].benchmarkValue).toBeGreaterThan(0);
    expect(["below", "at", "above"]).toContain(result[0].percentile);
  });

  it("classifies a much higher rate as above", () => {
    const benchmark = getBenchmark("Technology / SaaS");
    const highRate = benchmark.funnel.leadToMqaRate + 10;
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: highRate,
    });
    expect(result[0].percentile).toBe("above");
    expect(result[0].gap).toBeGreaterThan(0);
  });

  it("classifies a much lower rate as below", () => {
    const benchmark = getBenchmark("Technology / SaaS");
    const lowRate = benchmark.funnel.leadToMqaRate - 10;
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: lowRate,
    });
    expect(result[0].percentile).toBe("below");
    expect(result[0].gap).toBeLessThan(0);
  });

  it("compares all five metrics when all are provided", () => {
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: 20,
      mqaToSqlRate: 30,
      sqlToCloseRate: 25,
      averageDealSize: 25000,
      salesCycleLength: 45,
    });
    expect(result).toHaveLength(5);
    const metrics = result.map((r) => r.metric);
    expect(metrics).toContain("MQL to SQL Rate");
    expect(metrics).toContain("SQL to Opportunity Rate");
    expect(metrics).toContain("Opportunity to Close Rate");
    expect(metrics).toContain("Average Deal Size");
    expect(metrics).toContain("Sales Cycle Length");
  });

  it("generates recommendations for below-benchmark metrics", () => {
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: 1, // Very low rate
    });
    expect(result[0].recommendation).toContain("below");
  });

  it("generates positive recommendations for above-benchmark metrics", () => {
    const result = compareToBenchmark("Technology / SaaS", {
      leadToMqaRate: 80, // Very high rate
    });
    expect(result[0].recommendation).toContain("above");
  });

  it("uses Other benchmark for unknown industry", () => {
    const result = compareToBenchmark("Unknown Industry", {
      leadToMqaRate: 20,
    });
    const otherBenchmark = getBenchmark("Other");
    expect(result[0].benchmarkValue).toBe(otherBenchmark.funnel.leadToMqaRate);
  });

  it("inverts sales cycle comparison (shorter is better)", () => {
    const benchmark = getBenchmark("Technology / SaaS");
    // Much shorter cycle than benchmark = good
    const result = compareToBenchmark("Technology / SaaS", {
      salesCycleLength: Math.round(benchmark.deals.salesCycleLength * 0.5),
    });
    expect(result[0].percentile).toBe("above");
    expect(result[0].gap).toBeGreaterThan(0);
  });
});

describe("getTotalSampleSize", () => {
  it("returns a positive number", () => {
    expect(getTotalSampleSize()).toBeGreaterThan(0);
  });

  it("returns the expected total (sum of all industry sample sizes)", () => {
    expect(getTotalSampleSize()).toBe(12700);
  });
});

describe("formatBenchmarkForPrompt", () => {
  it("produces a non-empty string", () => {
    const result = formatBenchmarkForPrompt("Technology / SaaS");
    expect(result.length).toBeGreaterThan(100);
  });

  it("includes the industry name", () => {
    const result = formatBenchmarkForPrompt("Technology / SaaS");
    expect(result).toContain("Technology / SaaS");
  });

  it("includes EUR formatting", () => {
    const result = formatBenchmarkForPrompt("Technology / SaaS");
    expect(result).toContain("€");
  });

  it("includes total sample size", () => {
    const result = formatBenchmarkForPrompt("Technology / SaaS");
    expect(result).toContain("12,700");
  });

  it("falls back to Other for null industry", () => {
    const result = formatBenchmarkForPrompt(null);
    expect(result).toContain("Other");
  });
});
