import { prisma } from "@/lib/db";

export type SubscriptionStatus = {
  hasAccess: boolean;
  tier: string;
  isExpired: boolean;
  expiresAt: Date | null;
  daysRemaining: number | null;
  cancelAtPeriodEnd: boolean;
  paymentFailed: boolean;
  status: string | null;
};

export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionTier: true,
      subscriptionStatus: true,
      subscriptionPeriodEnd: true,
      cancelAtPeriodEnd: true,
      paymentFailedAt: true,
    },
  });

  if (!user) {
    return {
      hasAccess: false,
      tier: "NONE",
      isExpired: false,
      expiresAt: null,
      daysRemaining: null,
      cancelAtPeriodEnd: false,
      paymentFailed: false,
      status: null,
    };
  }

  const tier = user.subscriptionTier || "NONE";
  const expiresAt = user.subscriptionPeriodEnd;

  // No plan = no access
  if (tier === "TRIAL" || tier === "NONE") {
    return {
      hasAccess: false,
      tier,
      isExpired: false,
      expiresAt: null,
      daysRemaining: null,
      cancelAtPeriodEnd: false,
      paymentFailed: false,
      status: user.subscriptionStatus,
    };
  }

  // Check if subscription has expired
  const now = new Date();
  const isExpired = expiresAt ? expiresAt < now : false;

  // Calculate days remaining
  let daysRemaining: number | null = null;
  if (expiresAt && !isExpired) {
    const diffTime = expiresAt.getTime() - now.getTime();
    daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return {
    hasAccess: !isExpired,
    tier,
    isExpired,
    expiresAt,
    daysRemaining,
    cancelAtPeriodEnd: user.cancelAtPeriodEnd,
    paymentFailed: user.subscriptionStatus === "past_due",
    status: user.subscriptionStatus,
  };
}
