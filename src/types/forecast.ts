import { z } from "zod";

// Step 1: Revenue Data
export const revenueStepSchema = z.object({
  currentRevenue: z.number().min(0, "Current revenue must be positive"),
  targetRevenue: z.number().min(0, "Target revenue must be positive"),
  timeHorizonMonths: z.number().min(3).max(36),
});

export type RevenueStepData = z.infer<typeof revenueStepSchema>;

// Step 2: Leading Metrics
export const metricsStepSchema = z.object({
  monthlyInboundLeads: z.number().optional(),
  marketingQualifiedAccounts: z.number().optional(),
  salesQualifiedLeads: z.number().optional(),
  leadToMqaRate: z.number().min(0).max(100).optional(),
  mqaToSqlRate: z.number().min(0).max(100).optional(),
  sqlToCloseRate: z.number().min(0).max(100).optional(),
  averageDealSize: z.number().optional(),
  salesCycleLength: z.number().optional(),
});

export type MetricsStepData = z.infer<typeof metricsStepSchema>;

// Step 3: Market/ICP Data
export const marketStepSchema = z.object({
  industry: z.string().optional(),
  targetMarket: z.string().optional(),
  idealCustomerProfile: z.string().optional(),
  competitivePosition: z.string().optional(),
});

export type MarketStepData = z.infer<typeof marketStepSchema>;

// Step 4: Contact Info
export const contactStepSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().optional(),
});

export type ContactStepData = z.infer<typeof contactStepSchema>;

// Complete forecast submission
export const forecastSchema = revenueStepSchema
  .merge(metricsStepSchema)
  .merge(marketStepSchema)
  .merge(contactStepSchema);

export type ForecastData = z.infer<typeof forecastSchema>;

// Form state
export interface ForecastFormState {
  step: 1 | 2 | 3 | 4;
  revenue: RevenueStepData;
  metrics: MetricsStepData;
  market: MarketStepData;
  contact: ContactStepData;
}

// API response types
export interface ForecastResponse {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
}

export interface ForecastWithOkrs {
  id: string;
  email: string;
  companyName: string | null;
  currentRevenue: number;
  targetRevenue: number;
  timeHorizonMonths: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  okrs: OkrWithKeyResults[];
  gapAnalysis: GapAnalysis | null;
  recommendations: string[] | null;
  createdAt: string;
}

export interface OkrWithKeyResults {
  id: string;
  objective: string;
  category: OkrCategory;
  priority: number;
  timeframe: string;
  rationale: string | null;
  howToAchieve: string | null;
  keyResults: KeyResult[];
}

export interface KeyResult {
  id: string;
  description: string;
  metricName: string;
  currentValue: number | null;
  targetValue: number;
  unit: string;
}

export type OkrCategory =
  | "REVENUE"
  | "PIPELINE"
  | "CONVERSION"
  | "CUSTOMER"
  | "OPERATIONS"
  | "PRODUCT";

export interface GapAnalysis {
  revenueGap: number;
  requiredGrowthRate: number;
  pipelineGap?: number;
  conversionGaps?: {
    stage: string;
    currentRate: number;
    requiredRate: number;
  }[];
  summary: string;
}
