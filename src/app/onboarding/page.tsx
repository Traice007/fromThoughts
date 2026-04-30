import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "./onboarding-wizard";

export const metadata = { title: "Build Your Sales Mechanism — fromThoughts" };

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/signin?callbackUrl=/onboarding");

  const [pipedriveIntegration, latestImport] = await Promise.all([
    prisma.userIntegration.findUnique({
      where: { userId_provider: { userId: user.id, provider: "PIPEDRIVE" } },
      select: { lastSyncAt: true },
    }),
    prisma.pipelineImport.findFirst({
      where: { userId: user.id },
      orderBy: { importedAt: "desc" },
      select: { totalDeals: true, avgDealSize: true, avgSalesCycleDays: true },
    }),
  ]);

  return (
    <OnboardingWizard
      userEmail={user.email}
      pipedrive={{
        connected: !!pipedriveIntegration,
        lastSyncAt: pipedriveIntegration?.lastSyncAt?.toISOString() ?? null,
      }}
      pipelineData={
        latestImport
          ? {
              totalDeals: latestImport.totalDeals,
              avgDealSize: latestImport.avgDealSize,
              avgSalesCycleDays: latestImport.avgSalesCycleDays ?? null,
            }
          : null
      }
    />
  );
}
