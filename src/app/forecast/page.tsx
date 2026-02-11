import type { Metadata } from "next";
import { Suspense } from "react";
import { ForecastForm } from "@/components/forecast/forecast-form";
import { Sparkles, Target, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Your Revenue Forecast | fromThoughts",
  description: "Enter your revenue targets and metrics to generate your AI-powered revenue roadmap that bridges the gap between goals and execution.",
};

export default function ForecastPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Header with Dark Gradient */}
      <section className="relative py-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Dark Gradient Background - same as landing page CTA */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              AI-Powered Revenue Roadmap
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight text-white">
              Build Your Revenue Roadmap
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Answer a few questions about your business and our AI will generate
              a tailored roadmap to help you hit your revenue targets.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/90">Results in 30 seconds</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/90">Tailored to your stage</span>
            </span>
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/90">Data stays private</span>
            </span>
          </div>
        </div>
      </section>

      {/* Form Section with Light Background */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-16 -mt-4">
        <div className="absolute inset-0 bg-gray-50" />

        <div className="relative max-w-4xl mx-auto">
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <Suspense>
              <ForecastForm />
            </Suspense>
          </div>

          {/* Bottom Trust Message */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Trusted by growth-stage companies to bridge the gap between revenue goals and execution
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
