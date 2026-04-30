"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface PipedriveStatus {
  connected: boolean;
  lastSyncAt: string | null;
}

interface PipelineData {
  totalDeals: number;
  avgDealSize: number;
  avgSalesCycleDays: number | null;
}

interface OnboardingWizardProps {
  userEmail: string;
  pipedrive: PipedriveStatus;
  pipelineData: PipelineData | null;
}

const TIME_OPTIONS = [
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
  { value: 18, label: "18 months" },
  { value: 24, label: "24 months" },
] as const;

const GENERATING_STEPS = [
  "Analyzing your pipeline data",
  "Calculating growth projections",
  "Writing your execution plan",
];

// Minimum time (ms) before redirect so all 3 animation steps are visible
const MIN_GENERATE_MS = 3600;

function formatEur(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("nl-NL").format(parseInt(digits, 10));
}

function parseRevenue(formatted: string): number {
  return parseInt(formatted.replace(/[^0-9]/g, ""), 10) || 0;
}

const STEPS = [
  { n: 1, label: "Your CRM" },
  { n: 2, label: "Your goals" },
  { n: 3, label: "Building" },
];

export function OnboardingWizard({ userEmail, pipedrive, pipelineData }: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [currentRevenue, setCurrentRevenue] = useState("");
  const [targetRevenue, setTargetRevenue] = useState("");
  const [timeHorizon, setTimeHorizon] = useState<6 | 12 | 18 | 24>(12);
  const [errors, setErrors] = useState<{ current?: string; target?: string }>({});
  const [generatingStep, setGeneratingStep] = useState(0);
  const [generateError, setGenerateError] = useState<string | null>(null);

  // Only show the pipeline callout when there's a meaningful avg deal size
  const hasMeaningfulPipelineData = pipelineData && pipelineData.avgDealSize > 0;

  const generate = async (current: number, target: number, horizon: number) => {
    // Stagger the step labels — always play the full animation regardless of API speed
    const t1 = setTimeout(() => setGeneratingStep(1), 300);
    const t2 = setTimeout(() => setGeneratingStep(2), 1400);
    const t3 = setTimeout(() => setGeneratingStep(3), 2600);

    // Run API call and minimum animation delay in parallel so both must finish
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, MIN_GENERATE_MS));

    try {
      const payload: Record<string, unknown> = {
        currentRevenue: current,
        targetRevenue: target,
        timeHorizonMonths: horizon,
        email: userEmail,
      };
      if (pipelineData?.avgDealSize && pipelineData.avgDealSize > 0) {
        payload.averageDealSize = Math.round(pipelineData.avgDealSize);
      }
      if (pipelineData?.avgSalesCycleDays) {
        payload.salesCycleLength = pipelineData.avgSalesCycleDays;
      }

      const [res] = await Promise.all([
        fetch("/api/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        minDelay,
      ]);

      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setGenerateError((data as { error?: string }).error ?? "Something went wrong — please try again.");
        setGeneratingStep(0);
        setStep(2);
        return;
      }

      const data = await res.json() as { id: string };
      setGeneratingStep(4); // all steps done
      setTimeout(() => router.push(`/results/${data.id}`), 500);
    } catch {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      setGenerateError("Network error — please try again.");
      setGeneratingStep(0);
      setStep(2);
    }
  };

  const handleGoalsSubmit = () => {
    const current = parseRevenue(currentRevenue);
    const target = parseRevenue(targetRevenue);
    const newErrors: { current?: string; target?: string } = {};

    if (!current) newErrors.current = "Enter your current annual revenue";
    if (!target) newErrors.target = "Enter your target annual revenue";
    else if (current && target <= current) newErrors.target = "Target must be higher than current revenue";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setGeneratingStep(0);
      setStep(3);
      generate(current, target, timeHorizon);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-white">
        <Link href="/" className="inline-flex items-baseline text-xl">
          <span className="font-[family-name:var(--font-playfair)] italic font-normal">from</span>
          <span className="font-semibold">Thoughts</span>
        </Link>
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Back to dashboard
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">

          {/* Step progress */}
          <div className="flex items-center justify-center mb-10">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                    s.n < step ? "bg-green-500 text-white" :
                    s.n === step ? "bg-amber-500 text-white" :
                    "bg-gray-200 text-gray-400"
                  }`}>
                    {s.n < step ? <CheckCircle className="h-4 w-4" /> : s.n}
                  </div>
                  <span className={`text-xs ${s.n === step ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 h-px mx-3 mb-5 transition-colors ${s.n < step ? "bg-green-300" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* ── Step 1: CRM ── */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-1">Your CRM</h2>
              <p className="text-gray-500 text-sm mb-6">
                A live pipeline connection makes your plan significantly more accurate.
              </p>

              {pipedrive.connected && pipelineData ? (
                <div className="rounded-xl bg-green-50 border border-green-200 p-4 mb-6">
                  <div className="flex items-center gap-2.5 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="font-semibold text-green-800 text-sm">Pipedrive connected</span>
                  </div>
                  <p className="text-xs text-green-700 pl-6">
                    {pipelineData.totalDeals} deal{pipelineData.totalDeals !== 1 ? "s" : ""} synced
                    {pipedrive.lastSyncAt && (
                      <> · last synced {formatDistanceToNow(new Date(pipedrive.lastSyncAt), { addSuffix: true })}</>
                    )}
                  </p>
                  <p className="text-xs text-green-600 pl-6 mt-1.5">
                    We&apos;ll use your deal data to personalize your plan.
                  </p>
                </div>
              ) : pipedrive.connected ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
                  <p className="text-sm font-medium text-amber-800 mb-1">Pipedrive connected — sync your deals first for a better plan.</p>
                  <Link href="/dashboard/integrations" className="text-xs text-amber-700 underline">
                    Sync now →
                  </Link>
                </div>
              ) : (
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-3">No CRM connected yet. Connect Pipedrive to auto-fill your deal metrics.</p>
                  <a
                    href="/api/integrations/pipedrive/connect"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Connect Pipedrive
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors"
              >
                {pipedrive.connected && pipelineData ? "Continue with Pipedrive data" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {!pipedrive.connected && (
                <button
                  onClick={() => setStep(2)}
                  className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors mt-3 py-1.5"
                >
                  Skip — I&apos;ll add my CRM later
                </button>
              )}
            </div>
          )}

          {/* ── Step 2: Goals ── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-1">Your revenue goals</h2>
              <p className="text-gray-500 text-sm mb-6">
                Two numbers — that&apos;s all we need to build your plan.
              </p>

              {generateError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-5">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">{generateError}</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Current annual revenue
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">€</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={currentRevenue}
                      onChange={(e) => {
                        setCurrentRevenue(formatEur(e.target.value));
                        if (errors.current) setErrors((prev) => ({ ...prev, current: undefined }));
                      }}
                      placeholder="300.000"
                      className={`w-full pl-8 pr-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-colors ${
                        errors.current ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-amber-400"
                      }`}
                    />
                  </div>
                  {errors.current && <p className="text-xs text-red-600 mt-1">{errors.current}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Target annual revenue
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">€</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={targetRevenue}
                      onChange={(e) => {
                        setTargetRevenue(formatEur(e.target.value));
                        if (errors.target) setErrors((prev) => ({ ...prev, target: undefined }));
                      }}
                      placeholder="600.000"
                      className={`w-full pl-8 pr-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-colors ${
                        errors.target ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-amber-400"
                      }`}
                    />
                  </div>
                  {errors.target && <p className="text-xs text-red-600 mt-1">{errors.target}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeframe
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTimeHorizon(opt.value)}
                        className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                          timeHorizon === opt.value
                            ? "bg-amber-500 border-amber-500 text-white"
                            : "bg-white border-gray-200 text-gray-600 hover:border-amber-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasMeaningfulPipelineData && (
                  <div className="flex items-start gap-2.5 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <RefreshCw className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 leading-relaxed">
                      From your Pipedrive: avg deal €{Math.round(pipelineData!.avgDealSize).toLocaleString("nl-NL")}
                      {pipelineData!.avgSalesCycleDays != null && (
                        <> · {Math.round(pipelineData!.avgSalesCycleDays)}-day sales cycle</>
                      )}
                      {" "}— factored in automatically.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleGoalsSubmit}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors mt-6"
              >
                Build my plan
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors mt-3 py-1.5"
              >
                ← Back
              </button>
            </div>
          )}

          {/* ── Step 3: Generating ── */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-5">
                <RefreshCw className="h-7 w-7 text-amber-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Building your plan…</h2>
              <p className="text-gray-500 text-sm mb-8">Usually takes about 30 seconds.</p>

              <div className="space-y-3.5 text-left">
                {GENERATING_STEPS.map((label, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                      i + 1 < generatingStep ? "text-green-600" :
                      i + 1 === generatingStep ? "text-gray-800" :
                      "text-gray-300"
                    }`}
                  >
                    {i + 1 < generatingStep ? (
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    ) : i + 1 === generatingStep ? (
                      <RefreshCw className="h-4 w-4 flex-shrink-0 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />
                    )}
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
