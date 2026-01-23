import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | FounderVision",
  description: "Simple, transparent pricing for AI-powered revenue operations. Start with a 90-day trial.",
};

export default function PricingPage() {
  return (
    <div className="relative">
      {/* Hero Section with Gradient */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-200/30 via-teal-200/20 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200/50 text-emerald-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a 90-day trial to see how FounderVision can help you hit your revenue targets.
            No credit card required to get started.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Trial Tier */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                Get Started
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trial</h2>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">$1700</span>
                <span className="text-gray-600 font-medium"> one-time</span>
              </div>
              <p className="text-gray-700 text-sm mb-8">
                Full access for 90 days to try FounderVision
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited forecasts",
                  "AI-powered OKR generation",
                  "Industry benchmark comparisons",
                  "Gap analysis & recommendations",
                  "Export to PDF/CSV",
                  "Email support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                Start Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-gradient-to-b from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-500/25 scale-105">
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
                <span className="text-5xl font-bold">$8720</span>
                <span className="text-white/70"> / year</span>
              </div>
              <p className="text-white/90 text-sm mb-8">
                For growing companies serious about hitting targets
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Trial",
                  "OKR progress tracking",
                  "CRM integrations (HubSpot, Pipedrive)",
                  "Team collaboration (coming soon)",
                  "Priority support",
                  "Monthly strategy insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-5 w-5 text-emerald-200 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Upgrade to Pro
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
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:sales@foundervision.io"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Sales
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-12">
            We offer a full refund within the first 14 days if you&apos;re not satisfied.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What happens after my trial?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                After 90 days, you can upgrade to Pro to continue using all features
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
              <h3 className="font-semibold text-gray-900 mb-3">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer a full refund within the first 14 days if you&apos;re not satisfied
                with FounderVision.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What CRMs do you integrate with?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We currently support HubSpot and Pipedrive, with Salesforce coming soon.
                Enterprise customers can request custom integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Ready to transform your revenue targets?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Start generating actionable OKRs for your business today.
          </p>
          <Link
            href="/forecast"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl text-lg"
          >
            Get Started
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
