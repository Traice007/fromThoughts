import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { CsvImport } from "@/components/pipeline/csv-import";
import Link from "next/link";
import { Calendar, TrendingUp, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `€${(value / 1_000).toFixed(0)}K`;
  return `€${value.toFixed(0)}`;
}

export default async function PipelinePage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const imports = await prisma.pipelineImport.findMany({
    where: { userId: user.id },
    orderBy: { importedAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Pipeline</h1>
        <p className="text-secondary mt-1">
          Import your deals from CSV or Google Sheets to auto-calculate sales
          metrics
        </p>
      </div>

      {/* Import section */}
      <div className="bg-background border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Import Deals</h2>
        <CsvImport />
      </div>

      {/* Import history */}
      {imports.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Import History</h2>
          <div className="grid gap-3">
            {imports.map((imp) => (
              <Link
                key={imp.id}
                href={`/forecast?importId=${imp.id}`}
                className="flex items-center justify-between bg-background border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {imp.fileName || `${imp.source === "paste" ? "Pasted" : "CSV"} Import`}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-secondary">
                      <span>{imp.totalDeals} deals</span>
                      <span>{formatCurrency(imp.totalValue)}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(imp.importedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-secondary" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
