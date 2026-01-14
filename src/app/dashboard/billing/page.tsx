import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { CreditCard, Check, Zap, Building } from "lucide-react";

const PLANS = [
  {
    name: "Trial",
    price: "$120",
    period: "90 days",
    description: "Full access to try FounderVision",
    features: [
      "Unlimited forecasts",
      "AI-powered OKR generation",
      "Export to PDF/CSV",
      "Email support",
    ],
    current: "TRIAL",
    cta: "Current Plan",
    disabled: true,
  },
  {
    name: "Pro",
    price: "$45",
    period: "/month",
    description: "For growing companies",
    features: [
      "Everything in Trial",
      "OKR progress tracking",
      "CRM integrations",
      "Priority support",
      "Team collaboration (coming soon)",
    ],
    current: "PRO",
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For larger organizations",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "API access",
    ],
    current: "ENTERPRISE",
    cta: "Contact Sales",
  },
];

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      subscriptionTier: true,
      subscriptionStatus: true,
      subscriptionPeriodEnd: true,
      stripeCustomerId: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-secondary mt-1">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-secondary mt-1">
              {userData?.subscriptionTier === "TRIAL" && "You're on the 90-day trial"}
              {userData?.subscriptionTier === "PRO" && "You're on the Pro plan"}
              {userData?.subscriptionTier === "ENTERPRISE" && "You're on the Enterprise plan"}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold capitalize">
                {userData?.subscriptionTier?.toLowerCase()}
              </span>
            </div>
            {userData?.subscriptionPeriodEnd && (
              <p className="text-sm text-secondary mt-1">
                {userData.subscriptionTier === "TRIAL" ? "Trial ends: " : "Next billing: "}
                {new Date(userData.subscriptionPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const isCurrent = userData?.subscriptionTier === plan.current;
            const Icon = plan.name === "Trial" ? Zap : plan.name === "Pro" ? CreditCard : Building;

            return (
              <div
                key={plan.name}
                className={`bg-background border rounded-xl p-6 relative ${
                  plan.popular
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-secondary">{plan.period}</span>
                </div>

                <p className="text-secondary text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Enterprise" ? (
                  <a
                    href="mailto:sales@foundervision.io"
                    className="block w-full text-center py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    {plan.cta}
                  </a>
                ) : (
                  <button
                    disabled={isCurrent || plan.disabled}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      isCurrent
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : plan.popular
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {isCurrent ? "Current Plan" : plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing Portal Link */}
      {userData?.stripeCustomerId && (
        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Billing Portal</h2>
          <p className="text-secondary text-sm mb-4">
            Update your payment method, view invoices, and manage your
            subscription.
          </p>
          <Link
            href="/api/billing/portal"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            Open Billing Portal
          </Link>
        </div>
      )}
    </div>
  );
}
