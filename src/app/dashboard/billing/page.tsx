import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { CreditCard, Check, Zap, Building, CheckCircle, XCircle, Crown } from "lucide-react";
import { CheckoutButton } from "@/components/billing/checkout-button";

const PLANS = [
  {
    name: "Foundation",
    planId: "STARTER" as const, // Stripe/DB ID — do not change
    price: "€15,000",
    period: " / year",
    description: "AI platform for founders who just made their first sales hire",
    features: [
      "Revenue playbook & execution plan",
      "Pipeline dashboard & health score",
      "Weekly brief with deal prioritisation",
      "Stall detection & deal alerts",
      "Gap analysis & OKR framework",
      "HubSpot & Pipedrive integration (coming soon)",
      "Email support",
    ],
    tier: "STARTER", // DB value — do not change
  },
  {
    name: "Growth",
    planId: "PRO" as const, // Stripe/DB ID — do not change
    price: "€19,000",
    period: " / year",
    description: "AI platform + dedicated revenue advisor for post-hire founders",
    features: [
      "Everything in Foundation",
      "Dedicated revenue advisor",
      "Monthly 45-min pipeline review call",
      "Async advisor access (email/Slack)",
      "Curated weekly opportunity list",
      "ICP sharpening & win/loss analysis (coming soon)",
      "Rep performance tracking (coming soon)",
      "Priority support",
    ],
    tier: "PRO", // DB value — do not change
    popular: true,
  },
  {
    name: "Enterprise",
    planId: null,
    price: "Custom",
    period: "",
    description: "For larger teams with multiple reps and custom requirements",
    features: [
      "Everything in Growth",
      "Multi-rep team management",
      "Custom CRM & tool integrations",
      "Dedicated implementation support",
      "API access",
      "SLA guarantee",
    ],
    tier: "ENTERPRISE",
  },
];

interface BillingPageProps {
  searchParams: Promise<{ success?: string; canceled?: string; plan?: string; error?: string }>;
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const user = await getCurrentUser();
  const params = await searchParams;

  if (!user) {
    return null;
  }

  // If returning from successful checkout, update the user's plan
  if (params.success && params.plan) {
    const planId = params.plan.toUpperCase();
    if (planId === "STARTER" || planId === "PRO") {
      const accessEnd = new Date();
      accessEnd.setFullYear(accessEnd.getFullYear() + 1); // 1 year for all paid plans

      await prisma.user.update({
        where: { id: user.id },
        data: {
          subscriptionTier: planId,
          subscriptionStatus: "active",
          subscriptionPeriodEnd: accessEnd,
        },
      });
    }
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

  const currentTier = userData?.subscriptionTier || "NONE";
  const isExpired = userData?.subscriptionPeriodEnd
    ? userData.subscriptionPeriodEnd < new Date()
    : false;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-secondary mt-1">
          Manage your subscription and billing details
        </p>
      </div>

      {/* Success Message */}
      {params.success && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-900">Payment successful!</p>
            <p className="text-sm text-amber-700">
              Thank you for your purchase. Your account has been upgraded.
            </p>
          </div>
        </div>
      )}

      {/* Canceled Message */}
      {params.canceled && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <XCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-900">Payment canceled</p>
            <p className="text-sm text-amber-700">
              No charges were made. You can try again when you&apos;re ready.
            </p>
          </div>
        </div>
      )}

      {/* Current Plan Status */}
      <div className="bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-secondary mt-1">
              {(currentTier === "TRIAL" || currentTier === "NONE") && "Select a plan to get started"}
              {currentTier === "STARTER" && !isExpired && "You're on the Foundation plan"}
              {currentTier === "STARTER" && isExpired && "Your Foundation plan has expired"}
              {currentTier === "PRO" && !isExpired && "You're on the Growth plan"}
              {currentTier === "PRO" && isExpired && "Your Growth plan has expired"}
              {currentTier === "ENTERPRISE" && "You're on the Enterprise plan"}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className={`text-lg font-semibold capitalize ${isExpired ? "text-red-600" : ""}`}>
                {(currentTier === "TRIAL" || currentTier === "NONE")
                  ? "No Plan"
                  : isExpired
                  ? `${currentTier.toLowerCase()} (expired)`
                  : currentTier.toLowerCase()}
              </span>
            </div>
            {userData?.subscriptionPeriodEnd && currentTier !== "TRIAL" && currentTier !== "NONE" && (
              <p className="text-sm text-secondary mt-1">
                {currentTier === "STARTER" ? "Access ends: " : "Next billing: "}
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
            const isCurrent = currentTier === plan.tier && !isExpired;
            const canPurchase =
              // No plan yet - can buy Starter or Pro
              ((currentTier === "TRIAL" || currentTier === "NONE") && (plan.tier === "STARTER" || plan.tier === "PRO")) ||
              // Has Starter, not expired - can upgrade to Pro
              (currentTier === "STARTER" && !isExpired && plan.tier === "PRO") ||
              // Expired - can renew same plan or upgrade
              (isExpired && (plan.tier === "STARTER" || plan.tier === "PRO"));
            const Icon = plan.name === "Foundation" ? Zap : plan.name === "Growth" ? Crown : Building;

            // Determine card styling based on current plan status
            const cardClasses = isCurrent
              ? "bg-amber-50/50 border-amber-500 ring-2 ring-amber-500/20"
              : plan.popular && !isCurrent
              ? "border-amber-400 ring-2 ring-amber-400/20"
              : "border-border";

            return (
              <div
                key={plan.name}
                className={`bg-background border rounded-xl p-6 relative ${cardClasses}`}
              >
                {/* Current Plan Badge */}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-slate-900 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3" />
                      Your Plan
                    </span>
                  </div>
                )}

                {/* Most Popular Badge (only show if not current) */}
                {plan.popular && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${isCurrent ? "bg-amber-100" : "bg-primary/10"}`}>
                    <Icon className={`h-5 w-5 ${isCurrent ? "text-amber-600" : "text-primary"}`} />
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
                      <Check className={`h-4 w-4 flex-shrink-0 ${isCurrent ? "text-amber-600" : "text-green-600"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === "Enterprise" ? (
                  <Link
                    href="/lets-talk"
                    className="block w-full text-center py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Let&apos;s Talk
                  </Link>
                ) : isCurrent ? (
                  <div className="space-y-2">
                    <div className="w-full py-3 rounded-lg font-medium bg-amber-100 text-amber-700 flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Active
                    </div>
                    {userData?.subscriptionPeriodEnd && (
                      <p className="text-xs text-center text-amber-600">
                        {"Renews "}
                        {new Date(userData.subscriptionPeriodEnd).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                ) : plan.planId ? (
                  <CheckoutButton
                    planId={plan.planId}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {isExpired && currentTier === plan.tier
                    ? `Renew ${plan.name}`
                    : currentTier === "STARTER" && plan.tier === "PRO"
                    ? `Upgrade to ${plan.name}`
                    : `Get ${plan.name}`}
                  </CheckoutButton>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Money-back Guarantee */}
      <div className="text-center text-sm text-secondary">
        <p>30-day satisfaction guarantee on all plans. No questions asked.</p>
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
