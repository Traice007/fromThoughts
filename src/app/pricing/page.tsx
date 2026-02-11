import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Sparkles, UserRound, Users, Briefcase, HeadphonesIcon, TrendingDown } from "lucide-react";

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Pricing | fromThoughts",
  description: "Simple, transparent pricing for AI-powered revenue operations. Get started with 30 days of full access.",
};

export default function PricingPage() {
  return (
    <div className="relative">
      {/* Hero Section with Gradient */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-slate-50" />
        

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Simple, Transparent{" "}
            <span className="text-amber-500">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build the sales playbook your first hire needs. Get started with 30 days of full access.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
                Get Started
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Starter</h2>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">€1,500</span>
                <span className="text-gray-600 font-medium"> one-time</span>
              </div>
              <p className="text-gray-700 text-sm mb-8">
                30 days of full access to fromThoughts
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited forecasts",
                  "AI-powered revenue roadmap",
                  "Industry benchmark comparisons",
                  "Gap analysis & recommendations",
                  "Export to PDF/CSV",
                  "Email support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
              >
                Build Your Execution Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-900/25 scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                For Growing Teams
              </div>
              <h2 className="text-2xl font-bold mb-2">Pro</h2>
              <div className="mb-4">
                <span className="text-5xl font-bold">€15,000</span>
                <span className="text-white/70"> / year</span>
              </div>
              <p className="text-white/90 text-sm mb-8">
                For growing companies serious about hitting targets
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Starter",
                  "Roadmap progress tracking",
                  "CRM integrations: HubSpot, Pipedrive (coming soon)",
                  "Team collaboration (coming soon)",
                  "Priority support",
                  "Monthly strategy insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-amber-300 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-lg"
              >
                Get Started with Pro
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
                Full Service
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h2>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">Custom</span>
              </div>
              <p className="text-gray-700 text-sm mb-8">
                For larger organizations with specific needs
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Pro",
                  "Dedicated account manager",
                  "Custom integrations",
                  "SLA guarantee",
                  "API access",
                  "On-premise deployment option",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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

        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-slate-50" />
        

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              Compare & Save
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cut Costs with fromThoughts
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              See how fromThoughts compares to traditional alternatives for building your revenue strategy.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Alternative</span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cost / Year</span>
            </div>

            {/* Row: Head of Sales */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <UserRound className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Head of Sales</p>
                  <p className="text-sm text-gray-500">First commercial hire</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€150K – €250K</span>
            </div>

            {/* Row: Fractional VP */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fractional VP of Sales</p>
                  <p className="text-sm text-gray-500">Part-time senior leadership</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€80K – €120K</span>
            </div>

            {/* Row: Sales Consultant */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <HeadphonesIcon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sales Consultant</p>
                  <p className="text-sm text-gray-500">Project-based engagement</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€50K – €100K</span>
            </div>

            {/* Row: RevOps Consultant */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Revenue Ops Consultant</p>
                  <p className="text-sm text-gray-500">Strategy & process setup</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€50K – €100K</span>
            </div>

            {/* fromThoughts Row - Highlighted */}
            <div className="flex items-center justify-between px-6 py-5 bg-amber-50 border-b border-amber-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-amber-900">fromThoughts Pro</p>
                  <p className="text-sm text-amber-700">AI-powered revenue roadmap</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-amber-700">€15,000<span className="text-sm font-medium text-amber-600"> / year</span></span>
            </div>

            {/* Savings Row */}
            <div className="flex items-center justify-between px-6 py-5 bg-gray-900">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Your Savings</p>
                  <p className="text-sm text-gray-400">Compared to a Head of Sales hire</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-amber-400">Up to 90%</span>
                <p className="text-sm text-gray-400">saved per year</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Cost estimates based on European market averages for early-stage B2B companies.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-700 text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What happens after my 30 days?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                After 30 days, you can upgrade to Pro to continue using all features
                and unlock progress tracking and CRM integrations. Your data is always preserved.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, Pro subscriptions can be canceled anytime. You&apos;ll retain access
                until the end of your billing period.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What if I&apos;m not happy with the output?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Reach out and we&apos;ll make it right. We want every founder to get real value
                from their execution plan.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What CRMs do you integrate with?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                HubSpot and Pipedrive integrations are coming soon. In the meantime, you can import your pipeline data via CSV or export your plan as PDF/CSV to share with your team.
                Enterprise customers can request custom integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Ready to build your sales playbook?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Get the foundation your first hire needs to succeed.
          </p>
          <Link
            href="/forecast"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-xl text-lg"
          >
            Build Your Execution Plan
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
