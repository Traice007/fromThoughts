"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  { title: "Generate", description: "Get Roadmap" },
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
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<ForecastFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importBanner, setImportBanner] = useState<string | null>(null);

  // Pre-populate from pipeline import if importId is in URL
  useEffect(() => {
    const importId = searchParams.get("importId");
    if (!importId) return;

    fetch(`/api/pipeline/${importId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load import");
        return res.json();
      })
      .then((data) => {
        const metrics = data.metrics?.forecastFormData;
        if (metrics && Object.keys(metrics).length > 0) {
          setFormState((prev) => ({
            ...prev,
            metrics: { ...prev.metrics, ...metrics },
          }));
          setImportBanner(
            `Pre-filled with data from ${data.deals?.length || 0} imported deals. You can edit any field.`
          );
        }
      })
      .catch(() => {
        // Silently fail — user can still fill the form manually
      });
  }, [searchParams]);

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

      // Redirect immediately — results page triggers AI generation and polls
      router.push(`/results/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white">
      {/* Step Indicator */}
      <div className="mb-10">
        <StepIndicator currentStep={formState.step} steps={STEPS} />
      </div>

      {/* Import Banner */}
      {importBanner && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-center text-sm font-medium">
          {importBanner}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center font-medium">
          {error}
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-xl p-6 sm:p-8">
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
