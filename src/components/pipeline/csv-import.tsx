"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CsvDropzone } from "./csv-dropzone";
import { CsvPreviewTable } from "./csv-preview-table";
import { PipelineMetricsDisplay } from "./pipeline-metrics";
import { parseCSV, type ParsedDeal, type ParseError } from "@/lib/pipeline/csv-parser";
import {
  calculateMetrics,
  type PipelineMetrics,
} from "@/lib/pipeline/metrics-calculator";
import { ArrowLeft, Save, TrendingUp, Loader2 } from "lucide-react";

type ImportState = "input" | "preview" | "saving" | "done";

interface SavedImport {
  importId: string;
  metrics: PipelineMetrics;
}

export function CsvImport() {
  const router = useRouter();
  const [state, setState] = useState<ImportState>("input");
  const [deals, setDeals] = useState<ParsedDeal[]>([]);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics | null>(null);
  const [source, setSource] = useState<"csv" | "paste">("csv");
  const [fileName, setFileName] = useState<string | undefined>();
  const [savedImport, setSavedImport] = useState<SavedImport | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleData = (text: string, src: "csv" | "paste", name?: string) => {
    const result = parseCSV(text);
    setDeals(result.deals);
    setErrors(result.errors);
    setWarnings(result.warnings);
    setSource(src);
    setFileName(name);

    if (result.deals.length > 0) {
      setMetrics(calculateMetrics(result.deals));
    }

    setState("preview");
  };

  const handleSave = async () => {
    setState("saving");
    setSaveError(null);

    try {
      const response = await fetch("/api/pipeline/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deals, source, fileName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save import");
      }

      const data = await response.json();
      setSavedImport({ importId: data.importId, metrics: data.metrics });
      setState("done");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save");
      setState("preview");
    }
  };

  const handleReset = () => {
    setState("input");
    setDeals([]);
    setErrors([]);
    setWarnings([]);
    setMetrics(null);
    setSavedImport(null);
    setSaveError(null);
  };

  return (
    <div className="space-y-6">
      {/* Input state */}
      {state === "input" && <CsvDropzone onData={handleData} />}

      {/* Preview state */}
      {(state === "preview" || state === "saving") && (
        <>
          {metrics && <PipelineMetricsDisplay metrics={metrics} />}

          <CsvPreviewTable
            deals={deals}
            errors={errors}
            warnings={warnings}
          />

          {saveError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {saveError}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              disabled={state === "saving"}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Start Over
            </button>

            {deals.length > 0 && errors.length === 0 && (
              <button
                onClick={handleSave}
                disabled={state === "saving"}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {state === "saving" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {state === "saving" ? "Saving..." : "Save Import"}
              </button>
            )}
          </div>
        </>
      )}

      {/* Done state */}
      {state === "done" && savedImport && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-4">
          <div className="text-green-600 font-semibold text-lg">
            Pipeline imported successfully!
          </div>
          <p className="text-sm text-green-700">
            {savedImport.metrics.totalDeals} deals worth{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            }).format(savedImport.metrics.totalValue)}{" "}
            have been saved.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Import Another
            </button>
            <button
              onClick={() =>
                router.push(
                  `/forecast?importId=${savedImport.importId}`
                )
              }
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              Create Forecast
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
