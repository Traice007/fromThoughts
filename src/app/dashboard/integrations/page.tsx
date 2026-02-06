import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { IntegrationCards } from "./integration-cards";

export default async function IntegrationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Check if the user has already expressed a CRM preference
  // by looking at their forecasts' CRM integration records
  const existingInterest = await prisma.crmIntegration.findFirst({
    where: {
      forecast: {
        userId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      provider: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-secondary mt-1">
          Connect FounderVision to the tools your team already uses
        </p>
      </div>

      <IntegrationCards
        userId={user.id}
        existingProvider={existingInterest?.provider?.toLowerCase() ?? null}
      />
    </div>
  );
}
