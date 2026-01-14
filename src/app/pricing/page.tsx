import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, CreditCard, Building, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | FounderVision",
  description: "Simple, transparent pricing for AI-powered revenue operations. Start with a 90-day trial.",
};

const PLANS = [
  {
    name: "Trial",
    price: "$120",
    period: "one-time",
    description: "Full access for 90 days to try FounderVision",
    features: [
      "Unlimited forecasts",
      "AI-powered OKR generation",
      "Industry benchmark comparisons",
      "Gap analysis & recommendations",
      "Export to PDF/CSV",
      "Email support",
    ],
    cta: "Start Trial",
    href: "/auth/signup",
    icon: Zap,
  },
  {
    name: "Pro",
    price: "$45",
    period: "/month",
    description: "For growing companies serious about hitting targets",
    features: [
      "Everything in Trial",
      "OKR progress tracking",
      "CRM integrations (HubSpot, Pipedrive)",
      "Team collaboration (coming soon)",
      "Priority support",
      "Monthly strategy insights",
    ],
    cta: "Upgrade to Pro",
    href: "/auth/signup",
    icon: CreditCard,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For larger organizations with specific needs",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "API access",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    href: "mailto:sales@foundervision.io",
    icon: Building,
  },
];

export default function PricingPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Start with a 90-day trial to see how FounderVision can help you hit your revenue targets.
            No credit card required to get started.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-background border rounded-2xl p-8 ${
                  plan.popular
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-secondary">{plan.period}</span>
                </div>

                <p className="text-secondary text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Enterprise" ? (
                  <a
                    href={plan.href}
                    className="block w-full text-center py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    href={plan.href}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">What happens after my trial?</h3>
              <p className="text-secondary text-sm">
                After 90 days, you can upgrade to Pro to continue using all features
                and unlock progress tracking and CRM integrations. Your data is always preserved.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-secondary text-sm">
                Yes, Pro subscriptions can be canceled anytime. You&apos;ll retain access
                until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-secondary text-sm">
                We offer a full refund within the first 14 days if you&apos;re not satisfied
                with FounderVision.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What CRMs do you integrate with?</h3>
              <p className="text-secondary text-sm">
                We currently support HubSpot and Pipedrive, with Salesforce coming soon.
                Enterprise customers can request custom integrations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-secondary mb-4">
            Ready to transform your revenue targets into actionable OKRs?
          </p>
          <Link
            href="/forecast"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-lg"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
