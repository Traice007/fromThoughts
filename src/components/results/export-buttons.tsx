"use client";

import { useState } from "react";
import { Download, FileText, Table, Loader2 } from "lucide-react";

interface ExportButtonsProps {
  forecastId: string;
}

export function ExportButtons({ forecastId }: ExportButtonsProps) {
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingCsv, setExportingCsv] = useState(false);

  const handleExportPdf = async () => {
    setExportingPdf(true);
    try {
      // Open print-friendly HTML in new window
      const printWindow = window.open(`/api/export/pdf?forecastId=${forecastId}`, "_blank");
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    } catch (error) {
      console.error("PDF export error:", error);
    } finally {
      setExportingPdf(false);
    }
  };

  const handleExportCsv = async () => {
    setExportingCsv(true);
    try {
      const response = await fetch(`/api/export/csv?forecastId=${forecastId}`);
      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `foundervision-okrs-${forecastId}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("CSV export error:", error);
    } finally {
      setExportingCsv(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleExportPdf}
        disabled={exportingPdf}
        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
      >
        {exportingPdf ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        Export PDF
      </button>

      <button
        onClick={handleExportCsv}
        disabled={exportingCsv}
        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
      >
        {exportingCsv ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Table className="h-4 w-4" />
        )}
        Export CSV
      </button>
    </div>
  );
}
