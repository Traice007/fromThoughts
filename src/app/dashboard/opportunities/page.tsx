import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { OpportunityCard } from "./opportunity-card";
import { Lightbulb } from "lucide-react";

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };

export default async function OpportunitiesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const opportunities = await prisma.opportunity.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Sort: open/in_progress before done, then by priority
  const sorted = [...opportunities].sort((a, b) => {
    if (a.status === "done" && b.status !== "done") return 1;
    if (b.status === "done" && a.status !== "done") return -1;
    return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
  });

  const open = sorted.filter((o) => o.status !== "done");
  const done = sorted.filter((o) => o.status === "done");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Opportunities</h1>
        <p className="text-secondary mt-1">
          Your curated pipeline priorities, reviewed by fromThoughts
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-background border border-border rounded-xl p-16 text-center">
          <Lightbulb className="h-14 w-14 text-secondary mx-auto mb-4 opacity-40" />
          <h2 className="text-xl font-semibold mb-2">Your opportunities will appear here</h2>
          <p className="text-secondary max-w-md mx-auto leading-relaxed">
            After your pipeline review, fromThoughts will add your curated list of priorities here — specific actions ranked by impact.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active opportunities */}
          {open.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">This week&apos;s priorities</h2>
                <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                  {open.length} open
                </span>
              </div>
              <div className="grid gap-4">
                {open.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={{
                      ...opp,
                      dueDate: opp.dueDate ? opp.dueDate.toISOString() : null,
                      reviewedAt: opp.reviewedAt ? opp.reviewedAt.toISOString() : null,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {done.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-secondary mb-4">Completed</h2>
              <div className="grid gap-4">
                {done.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={{
                      ...opp,
                      dueDate: opp.dueDate ? opp.dueDate.toISOString() : null,
                      reviewedAt: opp.reviewedAt ? opp.reviewedAt.toISOString() : null,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
