"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileText, ClipboardPaste } from "lucide-react";

interface CsvDropzoneProps {
  onData: (text: string, source: "csv" | "paste", fileName?: string) => void;
}

export function CsvDropzone({ onData }: CsvDropzoneProps) {
  const [mode, setMode] = useState<"upload" | "paste">("upload");
  const [pasteText, setPasteText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          onData(text, "csv", file.name);
        }
      };
      reader.readAsText(file);
    },
    [onData]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handlePasteSubmit = () => {
    if (pasteText.trim()) {
      onData(pasteText, "paste");
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode("upload")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "upload"
              ? "bg-primary text-white"
              : "bg-muted text-secondary hover:text-foreground"
          }`}
        >
          <Upload className="h-4 w-4" />
          Upload CSV
        </button>
        <button
          onClick={() => setMode("paste")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === "paste"
              ? "bg-primary text-white"
              : "bg-muted text-secondary hover:text-foreground"
          }`}
        >
          <ClipboardPaste className="h-4 w-4" />
          Paste from Sheets
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
          <p className="text-lg font-medium mb-1">
            Drop your CSV file here, or click to browse
          </p>
          <p className="text-sm text-secondary">
            Supports .csv, .tsv, and .txt files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.tsv,.txt"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-secondary">
            Copy rows from Google Sheets or Excel and paste below. Include the header row.
          </p>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder={`Deal Name\tStage\tValue\tClose Date\nAcme Corp\tProposal\t48000\t2025-03-20`}
            className="w-full h-48 p-4 border border-border rounded-xl text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            onClick={handlePasteSubmit}
            disabled={!pasteText.trim()}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Parse Data
          </button>
        </div>
      )}

      {/* Template download link */}
      <p className="text-sm text-secondary">
        Not sure about the format?{" "}
        <a
          href="/api/pipeline/template"
          download
          className="text-primary hover:underline font-medium"
        >
          Download sample CSV template
        </a>
      </p>
    </div>
  );
}
