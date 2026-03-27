import { z } from "zod";

// Step 1: Revenue Data
export const revenueStepSchema = z.object({
  currentRevenue: z.number().min(1, "Current revenue must be greater than zero"),
  targetRevenue: z.number().min(1, "Target revenue must be greater than zero"),
  timeHorizonMonths: z.number().min(3).max(36),
}).refine((data) => data.targetRevenue > data.currentRevenue, {
  message: "Target revenue must be greater than current revenue",
  path: ["targetRevenue"],
});
// Export a plain object schema (without the refine) for use with .merge()
// The cross-field check is re-applied on the final forecastSchema below.
const revenueStepBaseSchema = z.object({
  currentRevenue: z.number().min(1, "Current revenue must be greater than zero"),
  targetRevenue: z.number().min(1, "Target revenue must be greater than zero"),
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

// Complete forecast submission — refine is re-applied here because Zod's .merge()
// drops refinements from the left-hand schema.
export const forecastSchema = revenueStepBaseSchema
  .merge(metricsStepSchema)
  .merge(marketStepSchema)
  .merge(contactStepSchema)
  .refine((data) => data.targetRevenue > data.currentRevenue, {
    message: "Target revenue must be greater than current revenue",
    path: ["targetRevenue"],
  });

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
  // Status is stored as a plain string in the database; use string here so the
  // interface is compatible with direct Prisma results and client state updates.
  status: string;
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
