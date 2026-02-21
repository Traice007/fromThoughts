import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { CreditCard, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { CheckoutButton } from "@/components/billing/checkout-button";

const PLANS = [
  {
    name: "Foundation",
    planId: "STARTER" as const, // Stripe/DB ID — do not change
    price: "€15,000",
    period: " / year",
    description: "AI platform for founders who just made their first sales hire",
    features: [
      "Sales mechanism & execution plan",
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

const tierNames: Record<string, string> = {
  STARTER: "Foundation",
  PRO: "Growth",
  ENTERPRISE: "Enterprise",
};

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

  const currentTierName = tierNames[currentTier] || null;

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
              <span className={`text-lg font-semibold ${isExpired ? "text-red-600" : ""}`}>
                {(currentTier === "TRIAL" || currentTier === "NONE")
                  ? "No Plan"
                  : isExpired
                  ? `${currentTierName} (expired)`
                  : currentTierName}
              </span>
            </div>
            {userData?.subscriptionPeriodEnd && currentTier !== "TRIAL" && currentTier !== "NONE" && (
              <p className="text-sm text-secondary mt-1">
                Renews {new Date(userData.subscriptionPeriodEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const isCurrent = currentTier === plan.tier && !isExpired;
            const canPurchase =
              ((currentTier === "TRIAL" || currentTier === "NONE") && (plan.tier === "STARTER" || plan.tier === "PRO")) ||
              (currentTier === "STARTER" && !isExpired && plan.tier === "PRO") ||
              (isExpired && (plan.tier === "STARTER" || plan.tier === "PRO"));

            const isGrowth = plan.popular;
            const inheritedFeature = plan.name === "Growth" ? "Everything in Foundation" : plan.name === "Enterprise" ? "Everything in Growth" : null;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-7 flex flex-col transition-shadow ${
                  isGrowth
                    ? "bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-xl shadow-slate-900/25"
                    : isCurrent
                    ? "bg-white border-2 border-amber-500 ring-2 ring-amber-500/20"
                    : "bg-white border border-gray-200 hover:shadow-xl"
                }`}
              >
                {/* Badge */}
                {isCurrent && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      <CheckCircle className="h-3 w-3" />
                      Your Plan
                    </span>
                  </div>
                )}
                {isGrowth && !isCurrent && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                {/* Name */}
                <h3 className={`text-2xl font-bold mb-2 ${isGrowth ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-5 ${isGrowth ? "text-white/70" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-1">
                  <span className={`text-4xl font-bold ${isGrowth ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`font-medium ${isGrowth ? "text-white/70" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-xs mb-6 ${isGrowth ? "text-white/50" : "text-gray-400"}`}>
                  {plan.price === "Custom"
                    ? "Pricing tailored to your team and requirements"
                    : "Billed annually. 30-day satisfaction guarantee."}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle
                        className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                          isGrowth ? "text-amber-300" : "text-amber-500"
                        }`}
                      />
                      <span
                        className={
                          feature === inheritedFeature
                            ? isGrowth ? "text-white/50 italic" : "text-gray-400 italic"
                            : isGrowth ? "text-white" : "text-gray-700"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.name === "Enterprise" ? (
                  <Link
                    href="/lets-talk"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Let&apos;s Talk
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : isCurrent ? (
                  <div className="space-y-2">
                    <div className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                      isGrowth ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"
                    }`}>
                      <CheckCircle className="h-4 w-4" />
                      Active
                    </div>
                    {userData?.subscriptionPeriodEnd && (
                      <p className={`text-xs text-center ${isGrowth ? "text-white/50" : "text-amber-600"}`}>
                        Renews {new Date(userData.subscriptionPeriodEnd).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                ) : plan.planId && canPurchase ? (
                  <CheckoutButton
                    planId={plan.planId}
                    className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isGrowth
                        ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg"
                        : "border-2 border-amber-500 text-amber-600 hover:bg-amber-50"
                    }`}
                  >
                    {isExpired && currentTier === plan.tier
                      ? `Renew ${plan.name}`
                      : currentTier === "STARTER" && plan.tier === "PRO"
                      ? `Upgrade to ${plan.name}`
                      : `Get ${plan.name}`}
                  </CheckoutButton>
                ) : plan.planId ? (
                  <div className={`w-full py-4 rounded-xl font-semibold text-center ${
                    isGrowth ? "bg-white/10 text-white/40" : "border border-gray-200 text-gray-300"
                  }`}>
                    {plan.name}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Money-back Guarantee */}
      <p className="text-center text-sm text-secondary">
        30-day satisfaction guarantee on all plans. No questions asked.
      </p>

      {/* Billing Portal Link */}
      {userData?.stripeCustomerId && (
        <div className="bg-background border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Billing Portal</h2>
          <p className="text-secondary text-sm mb-4">
            Update your payment method, view invoices, and manage your subscription.
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
