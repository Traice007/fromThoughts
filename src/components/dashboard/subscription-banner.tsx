"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Clock, CreditCard, XCircle } from "lucide-react";

interface SubscriptionBannerProps {
  hasAccess: boolean;
  isExpired: boolean;
  tier: string;
  expiresAt: string | null;
  daysRemaining: number | null;
  cancelAtPeriodEnd: boolean;
  paymentFailed: boolean;
}

export function SubscriptionBanner({
  hasAccess,
  isExpired,
  tier,
  expiresAt,
  daysRemaining,
  cancelAtPeriodEnd,
  paymentFailed,
}: SubscriptionBannerProps) {
  const pathname = usePathname();

  // Don't show banners on the billing page
  if (pathname === "/dashboard/billing") {
    return null;
  }

  // Payment failed banner (highest priority)
  if (paymentFailed && hasAccess) {
    return (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <CreditCard className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-red-900">Payment failed</p>
          <p className="text-sm text-red-700">
            We couldn&apos;t process your latest payment. Please update your payment method to avoid losing access.
          </p>
        </div>
        <Link
          href="/api/billing/portal"
          className="flex-shrink-0 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
        >
          Update Payment
        </Link>
      </div>
    );
  }

  // No active plan banner
  if (!hasAccess && !isExpired) {
    return (
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-amber-900">No active plan</p>
          <p className="text-sm text-amber-700">
            Select a plan to unlock all features and start building your execution plan.
          </p>
        </div>
        <Link
          href="/dashboard/billing"
          className="flex-shrink-0 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap"
        >
          View Plans
        </Link>
      </div>
    );
  }

  // Expired plan banner
  if (isExpired) {
    return (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-red-900">Your plan has expired</p>
          <p className="text-sm text-red-700">
            Your {tier.toLowerCase()} plan expired on{" "}
            {expiresAt ? new Date(expiresAt).toLocaleDateString() : "N/A"}. Renew to continue using FounderVision.
          </p>
        </div>
        <Link
          href="/dashboard/billing"
          className="flex-shrink-0 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
        >
          Renew Plan
        </Link>
      </div>
    );
  }

  // Cancellation scheduled banner (Pro plan only)
  if (cancelAtPeriodEnd && hasAccess && tier === "PRO") {
    return (
      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <XCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-amber-900">Cancellation scheduled</p>
          <p className="text-sm text-amber-700">
            Your Pro plan will end on{" "}
            {expiresAt ? new Date(expiresAt).toLocaleDateString() : "N/A"}.
            You&apos;ll continue to have access until then.
          </p>
        </div>
        <Link
          href="/api/billing/portal"
          className="flex-shrink-0 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap"
        >
          Reactivate
        </Link>
      </div>
    );
  }

  // Expiring soon banner (7 days or less)
  if (hasAccess && daysRemaining !== null && daysRemaining <= 7) {
    return (
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-blue-900">Your plan expires soon</p>
          <p className="text-sm text-blue-700">
            {daysRemaining === 1
              ? "Your plan expires tomorrow."
              : `Your plan expires in ${daysRemaining} days.`}{" "}
            Renew now to avoid interruption.
          </p>
        </div>
        <Link
          href="/dashboard/billing"
          className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Renew Plan
        </Link>
      </div>
    );
  }

  return null;
}
