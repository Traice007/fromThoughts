"use client";

import type { ParsedDeal, ParseError } from "@/lib/pipeline/csv-parser";
import { STAGE_COLORS } from "@/lib/pipeline/stage-mapper";
import { AlertTriangle, XCircle } from "lucide-react";

interface CsvPreviewTableProps {
  deals: ParsedDeal[];
  errors: ParseError[];
  warnings: string[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function CsvPreviewTable({
  deals,
  errors,
  warnings,
}: CsvPreviewTableProps) {
  return (
    <div className="space-y-4">
      {/* Errors */}
      {errors.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-1">
          {errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-red-700">
              <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>
                {err.row > 0 && <strong>Row {err.row}: </strong>}
                {err.message}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
          {warnings.map((warn, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-sm text-amber-700"
            >
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{warn}</span>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {deals.length > 0 && (
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-medium">#</th>
                  <th className="text-left px-4 py-3 font-medium">Deal</th>
                  <th className="text-left px-4 py-3 font-medium">Stage</th>
                  <th className="text-right px-4 py-3 font-medium">Value</th>
                  <th className="text-left px-4 py-3 font-medium">Company</th>
                  <th className="text-left px-4 py-3 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 font-medium">Created</th>
                  <th className="text-left px-4 py-3 font-medium">Close</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-b-0 hover:bg-muted/20"
                  >
                    <td className="px-4 py-3 text-secondary">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{deal.dealName}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          STAGE_COLORS[deal.stage]
                        }`}
                      >
                        {deal.stage.replace("_", " ")}
                      </span>
                      {deal.stageWasUnknown && (
                        <span className="ml-1 text-xs text-amber-600">
                          (was: {deal.stageOriginal})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatCurrency(deal.value)}
                    </td>
                    <td className="px-4 py-3 text-secondary">
                      {deal.companyName || "—"}
                    </td>
                    <td className="px-4 py-3 text-secondary">
                      {deal.contactName || "—"}
                    </td>
                    <td className="px-4 py-3 text-secondary">
                      {formatDate(deal.createdDate)}
                    </td>
                    <td className="px-4 py-3 text-secondary">
                      {formatDate(deal.closeDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
