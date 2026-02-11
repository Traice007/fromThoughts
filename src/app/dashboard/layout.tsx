import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { SubscriptionBannerWrapper } from "@/components/dashboard/subscription-banner-wrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <div className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense>
            <SubscriptionBannerWrapper />
          </Suspense>
          {children}
        </div>
      </div>
    </div>
  );
}
