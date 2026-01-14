import type { Metadata } from "next";
import { ForecastForm } from "@/components/forecast/forecast-form";

export const metadata: Metadata = {
  title: "Create Your Revenue Forecast | FounderVision",
  description: "Enter your revenue targets and metrics to generate AI-powered OKRs that bridge the gap between goals and execution.",
};

export default function ForecastPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Build Your Revenue Roadmap
          </h1>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
            Answer a few questions about your business and we&apos;ll generate
            actionable OKRs to help you hit your revenue targets.
          </p>
        </div>

        {/* Form */}
        <ForecastForm />

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-secondary">
            Trusted by growth-stage companies to bridge the gap between revenue goals and execution
          </p>
        </div>
      </div>
    </div>
  );
}
