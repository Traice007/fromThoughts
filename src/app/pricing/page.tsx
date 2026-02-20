import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, UserRound, Users, Briefcase, HeadphonesIcon, TrendingDown, ArrowRight } from "lucide-react";
import { PricingCards } from "./pricing-cards";

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Pricing | fromThoughts",
  description: "Transparent, annual pricing for B2B founders who need a revenue playbook their team can execute on.",
};

export default function PricingPage() {
  return (
    <div className="relative">
      {/* Header + Cards — combined to keep cards visible above fold */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-3">
              Simple,{" "}
              <span className="text-amber-500">Transparent</span>{" "}
              Pricing
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Annual commitment. No trials. Like hiring a fractional advisor, but always there.
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-slate-50" />

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
              The Real Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What You&apos;re Actually Comparing Against
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Founders at this stage are choosing between hiring someone, bringing in a fractional leader, or figuring it out alone. Here&apos;s what each costs.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Alternative</span>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Annual Cost</span>
            </div>

            {/* Row: Head of Sales */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <UserRound className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Head of Sales</p>
                  <p className="text-sm text-gray-500">Salary + recruitment fee + ramp time</p>
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
                  <p className="text-sm text-gray-500">1–3 days per week, senior leadership</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€80K – €120K</span>
            </div>

            {/* Row: Recruitment Agency */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Recruitment agency placement fee</p>
                  <p className="text-sm text-gray-500">One-time. Before one euro of salary.</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€20K – €30K</span>
            </div>

            {/* Row: Sales Consultant */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <HeadphonesIcon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sales consultant engagement</p>
                  <p className="text-sm text-gray-500">Project-based, no ongoing support</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">€50K – €100K</span>
            </div>

            {/* fromThoughts Row */}
            <div className="flex items-center justify-between px-6 py-5 bg-amber-50 border-b border-amber-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-amber-900">fromThoughts Growth</p>
                  <p className="text-sm text-amber-700">AI platform + dedicated revenue advisor</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-amber-700">
                €19,000<span className="text-sm font-medium text-amber-600"> / year</span>
              </span>
            </div>

            {/* Savings Row */}
            <div className="flex items-center justify-between px-6 py-5 bg-gray-900">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Your Savings</p>
                  <p className="text-sm text-gray-400">Compared to a fractional VP of Sales</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-amber-400">Up to 84%</span>
                <p className="text-sm text-gray-400">saved per year</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Cost estimates based on European market averages for early-stage B2B companies (NL, DE, Nordics).
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
              <h3 className="font-semibold text-gray-900 mb-3">Why annual billing only?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&apos;re not a SaaS tool you trial for a month. We&apos;re a commitment, like a fractional advisor or a new sales hire. Annual billing means we both invest properly in making it work. A 30-day satisfaction guarantee covers the risk on your side.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What does &ldquo;dedicated revenue advisor&rdquo; mean in Growth?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                It means a real person who knows your pipeline, your team, and your numbers. Available monthly for a 45-minute pipeline review call and async via email or Slack for urgent questions between calls. Not a support agent. An advisor.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What if I&apos;m not happy with the results?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We offer a 30-day satisfaction guarantee. If you don&apos;t see clear value in the first 30 days, we&apos;ll work with you to fix it, or refund you. We want every founder to get real results, not just access to a platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">What CRMs do you integrate with?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                HubSpot and Pipedrive integrations are in progress. In the meantime, you can import pipeline data via CSV. Most founders at this stage use one of these two. If you&apos;re on something else, mention it when you get in touch.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">Do you work with founders outside the Netherlands?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, we work with B2B founders across the Netherlands, Germany, and the Nordics. Everything runs in English. Market-specific benchmarks and context are built into the platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-3">Which plan is right for me?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Foundation is built for founders who need structure and visibility. Growth is for founders who also want an experienced advisor in their corner, reviewing their pipeline monthly and helping them direct their team. If you&apos;re unsure, start with a conversation.
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
            Ready to talk?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            No demo call required. Tell us where you are and we&apos;ll tell you whether we can help.
          </p>
          <Link
            href="/lets-talk"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-xl text-lg"
          >
            Let&apos;s Talk
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
