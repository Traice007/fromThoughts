import { getCurrentUser } from "@/lib/auth/session";
import { getSubscriptionStatus } from "@/lib/subscription";
import { SubscriptionBanner } from "./subscription-banner";

export async function SubscriptionBannerWrapper() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const subscription = await getSubscriptionStatus(user.id);

  return (
    <SubscriptionBanner
      hasAccess={subscription.hasAccess}
      isExpired={subscription.isExpired}
      tier={subscription.tier}
      expiresAt={subscription.expiresAt?.toISOString() || null}
      daysRemaining={subscription.daysRemaining}
      cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
      paymentFailed={subscription.paymentFailed}
    />
  );
}
