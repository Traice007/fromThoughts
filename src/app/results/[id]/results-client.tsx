"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Loader2, RefreshCw, CheckCircle, XCircle, User, ArrowRight } from "lucide-react";
import { ForecastSummary } from "@/components/results/forecast-summary";
import { OkrCard } from "@/components/results/okr-card";
import { GapAnalysis } from "@/components/results/gap-analysis";
import { Recommendations } from "@/components/results/recommendations";
import { ExportButtons } from "@/components/results/export-buttons";
import { CrmConnect } from "@/components/results/crm-connect";
import { BenchmarkComparisonCard } from "@/components/results/benchmark-comparison";
import type { ForecastWithOkrs, GapAnalysis as GapAnalysisType } from "@/types/forecast";
import { getTotalSampleSize } from "@/data/benchmarks";

interface ResultsClientProps {
  forecast: ForecastWithOkrs & {
    status: string;
    industry?: string | null;
    leadToMqaRate?: number | null;
    mqaToSqlRate?: number | null;
    sqlToCloseRate?: number | null;
    averageDealSize?: number | null;
    salesCycleLength?: number | null;
  };
}

export function ResultsClient({ forecast: initialForecast }: ResultsClientProps) {
  const { data: session, status: sessionStatus } = useSession();
  const [forecast, setForecast] = useState(initialForecast);
  const [polling, setPolling] = useState(
    initialForecast.status === "PENDING" || initialForecast.status === "PROCESSING"
  );

  useEffect(() => {
    if (!polling) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/forecast/${forecast.id}`);
        if (response.ok) {
          const data = await response.json();
          setForecast({
            ...data,
            createdAt: data.createdAt,
          });

          if (data.status === "COMPLETED" || data.status === "FAILED") {
            setPolling(false);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [polling, forecast.id]);

  // Loading state
  if (forecast.status === "PENDING" || forecast.status === "PROCESSING") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Generating Your OKRs</h1>
          <p className="text-secondary mb-8">
            Our AI is analyzing your revenue data and creating personalized OKRs.
            This usually takes 15-30 seconds.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-secondary">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </div>
        </div>
      </div>
    );
  }

  // Failed state
  if (forecast.status === "FAILED") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Generation Failed</h1>
          <p className="text-secondary mb-8">
            We encountered an issue while generating your OKRs. Please try again or contact support.
          </p>
          <a
            href="/forecast"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Try Again
          </a>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <CheckCircle className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-3xl font-bold">Your Strategic OKRs</h1>
          <p className="mt-2 text-secondary">
            AI-generated objectives based on data from {getTotalSampleSize().toLocaleString()}+ companies in your industry
          </p>
        </div>

        {/* Save to Account Prompt (for anonymous users) */}
        {sessionStatus !== "loading" && !session && (
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Save Your OKRs</h3>
                <p className="text-secondary text-sm mb-4">
                  Create a free account to save these OKRs, track your progress over time,
                  and get ongoing insights as you work toward your revenue goals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/auth/signup?claim=${forecast.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/auth/signin?callbackUrl=/results/${forecast.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
          <ExportButtons forecastId={forecast.id} />
          <p className="text-sm text-secondary">
            Generated on {new Date(forecast.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          {/* Forecast Summary */}
          <ForecastSummary forecast={forecast} />

          {/* Benchmark Comparison */}
          <BenchmarkComparisonCard
            industry={forecast.industry}
            metrics={{
              leadToMqaRate: forecast.leadToMqaRate,
              mqaToSqlRate: forecast.mqaToSqlRate,
              sqlToCloseRate: forecast.sqlToCloseRate,
              averageDealSize: forecast.averageDealSize,
              salesCycleLength: forecast.salesCycleLength,
            }}
          />

          {/* Gap Analysis */}
          {forecast.gapAnalysis && (
            <GapAnalysis gapAnalysis={forecast.gapAnalysis} />
          )}

          {/* Recommendations */}
          {forecast.recommendations && forecast.recommendations.length > 0 && (
            <Recommendations recommendations={forecast.recommendations} />
          )}

          {/* OKRs */}
          <div>
            <h2 className="text-xl font-bold mb-6">Your OKRs ({forecast.okrs.length})</h2>
            <div className="space-y-6">
              {forecast.okrs.map((okr, index) => (
                <OkrCard key={okr.id} okr={okr} index={index} />
              ))}
            </div>
          </div>

          {/* CRM Integration */}
          <CrmConnect forecastId={forecast.id} />
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          {session ? (
            <>
              <p className="text-secondary mb-4">
                Track your progress and manage all your forecasts
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/forecast"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Create Another Forecast
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-secondary mb-4">
                Want to track these OKRs and get ongoing guidance?
              </p>
              <Link
                href="/forecast"
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Create Another Forecast
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
