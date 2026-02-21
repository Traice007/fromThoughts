"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const foundationFeatures = [
  "Sales mechanism & execution plan",
  "Pipeline dashboard & health score",
  "Weekly brief with deal prioritisation",
  "Stall detection & deal alerts",
  "Gap analysis & OKR framework",
  "HubSpot & Pipedrive integration (coming soon)",
  "Email support",
];

const growthFeatures = [
  "Everything in Foundation",
  "Dedicated revenue strategist",
  "Monthly 45-min pipeline review call",
  "Strategic input between calls (email/Slack)",
  "Curated weekly opportunity list",
  "ICP sharpening & win/loss analysis (coming soon)",
  "Rep performance tracking (coming soon)",
  "Priority support",
];

const enterpriseFeatures = [
  "Everything in Growth",
  "Multi-rep team management",
  "Custom CRM & tool integrations",
  "Dedicated implementation support",
  "API access",
  "SLA guarantee",
  "Custom onboarding & training",
];

export function PricingCards() {
  const [showMonthly, setShowMonthly] = useState(false);

  return (
    <div>
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span
          className={`text-sm font-medium transition-colors ${
            !showMonthly ? "text-gray-900" : "text-gray-400"
          }`}
        >
          Annual
        </span>
        <button
          onClick={() => setShowMonthly(!showMonthly)}
          aria-label="Toggle billing period view"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            showMonthly ? "bg-amber-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              showMonthly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors ${
            showMonthly ? "text-gray-900" : "text-gray-400"
          }`}
        >
          Monthly view
        </span>
        <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
          Billed annually
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Foundation */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:shadow-xl transition-shadow flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Foundation</h2>
          <p className="text-gray-500 text-sm mb-5">
            For founders who just made their first sales hire and need structure around what their team focuses on each week.
          </p>

          <div className="mb-1">
            {showMonthly ? (
              <>
                <span className="text-4xl font-bold text-gray-900">€1,250</span>
                <span className="text-gray-500 font-medium"> / month</span>
              </>
            ) : (
              <>
                <span className="text-4xl font-bold text-gray-900">€15,000</span>
                <span className="text-gray-500 font-medium"> / year</span>
              </>
            )}
          </div>
          {showMonthly ? (
            <p className="text-xs text-amber-600 font-medium bg-amber-50 rounded-lg px-3 py-2 mb-6">
              Less than one day of a fractional VP of Sales, every month.
            </p>
          ) : (
            <p className="text-xs text-gray-400 mb-6">
              €1,250 / month equivalent, billed annually
            </p>
          )}

          <ul className="space-y-3 mb-8 flex-1">
            {foundationFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/lets-talk"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Growth */}
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-7 text-white shadow-xl shadow-slate-900/25 flex flex-col">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
              RECOMMENDED
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Growth</h2>
          <p className="text-white/70 text-sm mb-5">
            For founders who want the platform and a revenue strategist in their corner. Someone who knows your numbers, challenges your assumptions, and tells you where to focus.
          </p>

          <div className="mb-1">
            {showMonthly ? (
              <>
                <span className="text-4xl font-bold">€1,583</span>
                <span className="text-white/70 font-medium"> / month</span>
              </>
            ) : (
              <>
                <span className="text-4xl font-bold">€19,000</span>
                <span className="text-white/70 font-medium"> / year</span>
              </>
            )}
          </div>
          {showMonthly ? (
            <p className="text-xs text-amber-300 font-medium bg-white/10 rounded-lg px-3 py-2 mb-6">
              About one day of a fractional VP, repeated every month for a full year.
            </p>
          ) : (
            <p className="text-xs text-white/50 mb-6">
              €1,583 / month equivalent, billed annually
            </p>
          )}

          <ul className="space-y-3 mb-8 flex-1">
            {growthFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span
                  className={
                    item === "Everything in Foundation"
                      ? "text-white/50 italic"
                      : "text-white"
                  }
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/lets-talk"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-lg"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Enterprise */}
        <div className="bg-white border border-gray-200 rounded-3xl p-7 hover:shadow-xl transition-shadow flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h2>
          <p className="text-gray-500 text-sm mb-5">
            For larger teams with multiple reps, custom integration requirements, or specific service level needs.
          </p>

          <div className="mb-1">
            <span className="text-4xl font-bold text-gray-900">Custom</span>
          </div>
          <p className="text-xs text-gray-400 mb-6">Pricing tailored to your team and requirements</p>

          <ul className="space-y-3 mb-8 flex-1">
            {enterpriseFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span
                  className={
                    item === "Everything in Growth"
                      ? "text-gray-400 italic"
                      : "text-gray-700"
                  }
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/lets-talk"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        Foundation and Growth are annual commitments. 30-day satisfaction guarantee. No setup fees.
      </p>
    </div>
  );
}
