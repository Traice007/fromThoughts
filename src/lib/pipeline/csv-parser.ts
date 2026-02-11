import { mapStage, type CanonicalStage } from "./stage-mapper";

export interface ParsedDeal {
  dealName: string;
  stage: CanonicalStage;
  stageOriginal: string;
  stageWasUnknown: boolean;
  value: number;
  closeDate: string | null;
  createdDate: string | null;
  contactName: string | null;
  companyName: string | null;
  probability: number | null;
  notes: string | null;
}

export interface ParseError {
  row: number;
  message: string;
}

export interface ParseResult {
  deals: ParsedDeal[];
  errors: ParseError[];
  warnings: string[];
}

// Column header aliases — maps various names to our canonical field
const HEADER_MAP: Record<string, keyof ParsedDeal> = {
  "deal name": "dealName",
  deal: "dealName",
  name: "dealName",
  opportunity: "dealName",
  "opportunity name": "dealName",
  stage: "stage",
  status: "stage",
  "deal stage": "stage",
  phase: "stage",
  value: "value",
  amount: "value",
  "deal value": "value",
  "deal amount": "value",
  revenue: "value",
  price: "value",
  "close date": "closeDate",
  "closed date": "closeDate",
  "expected close": "closeDate",
  "close": "closeDate",
  "closing date": "closeDate",
  "created date": "createdDate",
  "create date": "createdDate",
  created: "createdDate",
  "date created": "createdDate",
  "open date": "createdDate",
  "contact name": "contactName",
  contact: "contactName",
  "primary contact": "contactName",
  "company name": "companyName",
  company: "companyName",
  organization: "companyName",
  org: "companyName",
  account: "companyName",
  probability: "probability",
  "win probability": "probability",
  confidence: "probability",
  "close probability": "probability",
  notes: "notes",
  description: "notes",
  comments: "notes",
};

function detectDelimiter(firstLine: string): string {
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  return tabCount > commaCount ? "\t" : ",";
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === delimiter) {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseNumericValue(raw: string): number | null {
  if (!raw) return null;
  // Strip currency symbols, thousands separators
  const cleaned = raw.replace(/[€$£¥,\s]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function parseDateValue(raw: string): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Try ISO format first (YYYY-MM-DD)
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const d = new Date(trimmed);
    if (!isNaN(d.getTime())) return d.toISOString();
  }

  // DD/MM/YYYY or DD-MM-YYYY (European format, primary market)
  const euMatch = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (euMatch) {
    const d = new Date(`${euMatch[3]}-${euMatch[2].padStart(2, "0")}-${euMatch[1].padStart(2, "0")}`);
    if (!isNaN(d.getTime())) return d.toISOString();
  }

  // Generic Date.parse fallback
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) return d.toISOString();

  return null;
}

function matchHeader(header: string): keyof ParsedDeal | null {
  const normalized = header.trim().toLowerCase().replace(/[_-]/g, " ");
  return HEADER_MAP[normalized] ?? null;
}

export function parseCSV(text: string): ParseResult {
  const deals: ParsedDeal[] = [];
  const errors: ParseError[] = [];
  const warnings: string[] = [];

  // Normalize line endings and split
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

  // Filter out empty lines
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

  if (nonEmptyLines.length < 2) {
    errors.push({ row: 0, message: "File must contain a header row and at least one data row" });
    return { deals, errors, warnings };
  }

  const delimiter = detectDelimiter(nonEmptyLines[0]);
  const headerFields = parseCsvLine(nonEmptyLines[0], delimiter);

  // Map headers to our fields
  const columnMap: (keyof ParsedDeal | null)[] = headerFields.map(matchHeader);

  // Check required columns
  const hasDealName = columnMap.includes("dealName");
  const hasValue = columnMap.includes("value");

  if (!hasDealName && !hasValue) {
    errors.push({
      row: 0,
      message: "Could not find 'Deal Name' or 'Value' columns. Please ensure your CSV has recognizable headers.",
    });
    return { deals, errors, warnings };
  }

  if (!hasDealName) {
    warnings.push("No 'Deal Name' column found — deals will be numbered sequentially.");
  }

  if (!hasValue) {
    warnings.push("No 'Value' column found — all deal values will default to 0.");
  }

  const hasStage = columnMap.includes("stage");
  if (!hasStage) {
    warnings.push("No 'Stage' column found — all deals will be marked as 'Lead'.");
  }

  // Parse data rows
  for (let i = 1; i < nonEmptyLines.length; i++) {
    const fields = parseCsvLine(nonEmptyLines[i], delimiter);
    const rowNum = i + 1;

    const raw: Record<string, string> = {};
    for (let j = 0; j < fields.length; j++) {
      const field = columnMap[j];
      if (field) {
        raw[field] = fields[j];
      }
    }

    // Parse value
    const value = parseNumericValue(raw.value || "") ?? 0;
    if (raw.value && value === 0 && raw.value.trim() !== "0") {
      warnings.push(`Row ${rowNum}: Could not parse value "${raw.value}", defaulting to 0`);
    }

    // Parse stage
    const stageResult = raw.stage
      ? mapStage(raw.stage)
      : { canonical: "LEAD" as const, original: "", wasUnknown: false };

    if (stageResult.wasUnknown) {
      warnings.push(`Row ${rowNum}: Unknown stage "${raw.stage}" mapped to Lead`);
    }

    // Parse probability
    let probability: number | null = null;
    if (raw.probability) {
      probability = parseNumericValue(raw.probability);
      if (probability !== null && probability > 1 && probability <= 100) {
        probability = probability / 100; // Normalize percentage to decimal
      }
    }

    const deal: ParsedDeal = {
      dealName: raw.dealName || `Deal ${i}`,
      stage: stageResult.canonical,
      stageOriginal: stageResult.original,
      stageWasUnknown: stageResult.wasUnknown,
      value,
      closeDate: parseDateValue(raw.closeDate || ""),
      createdDate: parseDateValue(raw.createdDate || ""),
      contactName: raw.contactName || null,
      companyName: raw.companyName || null,
      probability,
      notes: raw.notes || null,
    };

    deals.push(deal);
  }

  if (deals.length === 0) {
    errors.push({ row: 0, message: "No valid deals found in the file" });
  }

  return { deals, errors, warnings };
}
