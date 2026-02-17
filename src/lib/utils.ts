import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function calculateGrowthRate(current: number, target: number, months: number): number {
  if (current <= 0) return 0;
  const monthlyGrowthRate = Math.pow(target / current, 1 / months) - 1;
  return monthlyGrowthRate * 100;
}

export function calculateRequiredPipeline(
  targetRevenue: number,
  closeRate: number,
  avgDealSize: number
): number {
  if (closeRate <= 0 || avgDealSize <= 0) return 0;
  const dealsNeeded = targetRevenue / avgDealSize;
  return dealsNeeded / (closeRate / 100);
}
