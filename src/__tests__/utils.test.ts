import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  calculateGrowthRate,
  calculateRequiredPipeline,
} from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats a typical revenue number", () => {
    const result = formatCurrency(1500000);
    expect(result).toContain("1.500.000");
    expect(result).toContain("€");
  });

  it("formats zero", () => {
    const result = formatCurrency(0);
    expect(result).toContain("0");
    expect(result).toContain("€");
  });

  it("rounds decimals (no fraction digits)", () => {
    const result = formatCurrency(1500.99);
    expect(result).toContain("1.501");
  });

  it("formats small numbers", () => {
    const result = formatCurrency(25000);
    expect(result).toContain("25.000");
  });
});

describe("formatNumber", () => {
  it("formats with US-style thousands separators", () => {
    expect(formatNumber(1500000)).toBe("1,500,000");
  });

  it("formats zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("preserves decimals", () => {
    expect(formatNumber(1234.56)).toBe("1,234.56");
  });
});

describe("formatPercent", () => {
  it("formats with one decimal place", () => {
    expect(formatPercent(21)).toBe("21.0%");
  });

  it("rounds to one decimal", () => {
    expect(formatPercent(33.33)).toBe("33.3%");
  });

  it("handles zero", () => {
    expect(formatPercent(0)).toBe("0.0%");
  });

  it("handles values over 100", () => {
    expect(formatPercent(108)).toBe("108.0%");
  });
});

describe("calculateGrowthRate", () => {
  it("calculates monthly compound growth rate for 2x in 12 months", () => {
    const rate = calculateGrowthRate(1_000_000, 2_000_000, 12);
    expect(rate).toBeCloseTo(5.95, 1);
  });

  it("returns 0 when current revenue is 0", () => {
    expect(calculateGrowthRate(0, 2_000_000, 12)).toBe(0);
  });

  it("returns 0 when current revenue is negative", () => {
    expect(calculateGrowthRate(-100_000, 2_000_000, 12)).toBe(0);
  });

  it("returns 0 when target equals current (no growth needed)", () => {
    const rate = calculateGrowthRate(1_000_000, 1_000_000, 12);
    expect(rate).toBeCloseTo(0, 5);
  });

  it("returns negative rate when target is less than current", () => {
    const rate = calculateGrowthRate(2_000_000, 1_000_000, 12);
    expect(rate).toBeLessThan(0);
  });

  it("calculates correctly for 1 month", () => {
    // 1M to 1.1M in 1 month = 10% monthly growth
    const rate = calculateGrowthRate(1_000_000, 1_100_000, 1);
    expect(rate).toBeCloseTo(10, 1);
  });

  it("calculates correctly for the typical fromThoughts scenario (1.5M to 3M in 12 months)", () => {
    const rate = calculateGrowthRate(1_500_000, 3_000_000, 12);
    // Should be same as 1M to 2M — it's a 2x regardless of base
    const rateFrom1M = calculateGrowthRate(1_000_000, 2_000_000, 12);
    expect(rate).toBeCloseTo(rateFrom1M, 5);
  });
});

describe("calculateRequiredPipeline", () => {
  it("calculates pipeline for typical B2B scenario", () => {
    // 1M target, 25% close rate, 25K deal size
    // dealsNeeded = 1M / 25K = 40
    // pipeline = 40 / 0.25 = 160
    const result = calculateRequiredPipeline(1_000_000, 25, 25_000);
    expect(result).toBe(160);
  });

  it("returns 0 when close rate is 0", () => {
    expect(calculateRequiredPipeline(1_000_000, 0, 25_000)).toBe(0);
  });

  it("returns 0 when close rate is negative", () => {
    expect(calculateRequiredPipeline(1_000_000, -10, 25_000)).toBe(0);
  });

  it("returns 0 when deal size is 0", () => {
    expect(calculateRequiredPipeline(1_000_000, 25, 0)).toBe(0);
  });

  it("at 100% close rate, pipeline equals deals needed", () => {
    const result = calculateRequiredPipeline(1_000_000, 100, 25_000);
    expect(result).toBe(40); // 1M / 25K = 40 deals, no loss
  });

  it("returns 0 when target revenue is 0", () => {
    expect(calculateRequiredPipeline(0, 25, 25_000)).toBe(0);
  });
});
