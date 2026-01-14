"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepIndicator } from "./step-indicator";
import { Step1Revenue } from "./step-1-revenue";
import { Step2Metrics } from "./step-2-metrics";
import { Step3Market } from "./step-3-market";
import { Step4Email } from "./step-4-email";
import type {
  ForecastFormState,
  RevenueStepData,
  MetricsStepData,
  MarketStepData,
  ContactStepData,
} from "@/types/forecast";

const STEPS = [
  { title: "Revenue", description: "Set your targets" },
  { title: "Metrics", description: "Funnel data" },
  { title: "Market", description: "ICP info" },
  { title: "Generate", description: "Get OKRs" },
];

const initialState: ForecastFormState = {
  step: 1,
  revenue: {
    currentRevenue: 0,
    targetRevenue: 0,
    timeHorizonMonths: 12,
  },
  metrics: {},
  market: {},
  contact: {
    email: "",
  },
};

export function ForecastForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<ForecastFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRevenueNext = (data: RevenueStepData) => {
    setFormState((prev) => ({
      ...prev,
      revenue: data,
      step: 2,
    }));
  };

  const handleMetricsNext = (data: MetricsStepData) => {
    setFormState((prev) => ({
      ...prev,
      metrics: data,
      step: 3,
    }));
  };

  const handleMarketNext = (data: MarketStepData) => {
    setFormState((prev) => ({
      ...prev,
      market: data,
      step: 4,
    }));
  };

  const handleBack = () => {
    setFormState((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1) as 1 | 2 | 3 | 4,
    }));
  };

  const handleSubmit = async (contactData: ContactStepData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const forecastData = {
        ...formState.revenue,
        ...formState.metrics,
        ...formState.market,
        ...contactData,
      };

      // Create forecast
      const response = await fetch("/api/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forecastData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create forecast");
      }

      const { id } = await response.json();

      // Trigger OKR generation
      await fetch("/api/generate-okrs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forecastId: id }),
      });

      // Redirect to results page
      router.push(`/results/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-12">
        <StepIndicator currentStep={formState.step} steps={STEPS} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-center">
          {error}
        </div>
      )}

      {/* Step Content */}
      <div className="bg-background border border-border rounded-xl p-8 shadow-sm">
        {formState.step === 1 && (
          <Step1Revenue data={formState.revenue} onNext={handleRevenueNext} />
        )}
        {formState.step === 2 && (
          <Step2Metrics
            data={formState.metrics}
            onNext={handleMetricsNext}
            onBack={handleBack}
          />
        )}
        {formState.step === 3 && (
          <Step3Market
            data={formState.market}
            onNext={handleMarketNext}
            onBack={handleBack}
          />
        )}
        {formState.step === 4 && (
          <Step4Email
            data={formState.contact}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
