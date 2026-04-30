import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { PipedriveCard } from "./pipedrive-card";
import { IntegrationCards } from "./integration-cards";

interface PageProps {
  searchParams: Promise<{ connected?: string; error?: string }>;
}

export default async function IntegrationsPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user) return null;

  const params = await searchParams;

  const [pipedriveIntegration, existingInterest] = await Promise.all([
    prisma.userIntegration.findUnique({
      where: { userId_provider: { userId: user.id, provider: "PIPEDRIVE" } },
      select: {
        connectedAt: true,
        lastSyncAt: true,
        syncStatus: true,
        syncError: true,
      },
    }),
    prisma.crmIntegration.findFirst({
      where: { forecast: { userId: user.id } },
      orderBy: { createdAt: "desc" },
      select: { provider: true },
    }),
  ]);

  const successMessage =
    params.connected === "pipedrive" ? "Pipedrive connected successfully." : null;
  const errorMessage =
    params.error === "pipedrive_denied"
      ? "Connection cancelled."
      : params.error === "invalid_state"
        ? "Connection expired — please try again."
        : params.error
          ? "Something went wrong connecting Pipedrive."
          : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-secondary mt-1">
          Connect fromThoughts to the tools your team already uses
        </p>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
          <span>✓</span>
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* CRM */}
      <div>
        <h2 className="text-xl font-semibold mb-1">CRM</h2>
        <p className="text-secondary text-sm mb-4">
          Connect your CRM so fromThoughts can read your live pipeline.
        </p>
        <IntegrationCards
          existingProvider={existingInterest?.provider?.toLowerCase() ?? null}
          pipedriveSlot={
            <PipedriveCard
              connected={pipedriveIntegration !== null}
              lastSyncAt={pipedriveIntegration?.lastSyncAt?.toISOString() ?? null}
              syncStatus={pipedriveIntegration?.syncStatus ?? null}
              syncError={pipedriveIntegration?.syncError ?? null}
            />
          }
        />
      </div>
    </div>
  );
}
