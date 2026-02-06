import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { getSubscriptionStatus } from "@/lib/subscription";
import { SubscriptionBanner } from "@/components/dashboard/subscription-banner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  const subscription = await getSubscriptionStatus(user.id);

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SubscriptionBanner
            hasAccess={subscription.hasAccess}
            isExpired={subscription.isExpired}
            tier={subscription.tier}
            expiresAt={subscription.expiresAt?.toISOString() || null}
            daysRemaining={subscription.daysRemaining}
            cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
            paymentFailed={subscription.paymentFailed}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
