export const CANONICAL_STAGES = [
  "LEAD",
  "MQL",
  "SQL",
  "OPPORTUNITY",
  "PROPOSAL",
  "NEGOTIATION",
  "CLOSED_WON",
  "CLOSED_LOST",
] as const;

export type CanonicalStage = (typeof CANONICAL_STAGES)[number];

const STAGE_ALIASES: Record<string, CanonicalStage> = {
  // LEAD
  lead: "LEAD",
  "new lead": "LEAD",
  prospect: "LEAD",
  prospecting: "LEAD",
  "cold lead": "LEAD",
  "warm lead": "LEAD",
  new: "LEAD",
  // MQL
  mql: "MQL",
  "marketing qualified": "MQL",
  "marketing qualified lead": "MQL",
  interested: "MQL",
  engaged: "MQL",
  // SQL
  sql: "SQL",
  "sales qualified": "SQL",
  "sales qualified lead": "SQL",
  qualified: "SQL",
  "sales accepted": "SQL",
  demo: "SQL",
  "demo scheduled": "SQL",
  "demo booked": "SQL",
  "demo completed": "SQL",
  discovery: "SQL",
  // OPPORTUNITY
  opportunity: "OPPORTUNITY",
  opp: "OPPORTUNITY",
  "in progress": "OPPORTUNITY",
  active: "OPPORTUNITY",
  // PROPOSAL
  proposal: "PROPOSAL",
  "proposal sent": "PROPOSAL",
  quote: "PROPOSAL",
  "quote sent": "PROPOSAL",
  pricing: "PROPOSAL",
  // NEGOTIATION
  negotiation: "NEGOTIATION",
  negotiating: "NEGOTIATION",
  "contract sent": "NEGOTIATION",
  "contract review": "NEGOTIATION",
  "pending contract": "NEGOTIATION",
  // CLOSED_WON
  "closed won": "CLOSED_WON",
  won: "CLOSED_WON",
  closed: "CLOSED_WON",
  "deal won": "CLOSED_WON",
  converted: "CLOSED_WON",
  // CLOSED_LOST
  "closed lost": "CLOSED_LOST",
  lost: "CLOSED_LOST",
  "deal lost": "CLOSED_LOST",
  disqualified: "CLOSED_LOST",
  churned: "CLOSED_LOST",
};

export interface StageMapResult {
  canonical: CanonicalStage;
  original: string;
  wasUnknown: boolean;
}

export function mapStage(rawStage: string): StageMapResult {
  const normalized = rawStage.trim().toLowerCase();
  const mapped = STAGE_ALIASES[normalized];

  if (mapped) {
    return { canonical: mapped, original: rawStage, wasUnknown: false };
  }

  // Try partial match
  for (const [alias, stage] of Object.entries(STAGE_ALIASES)) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return { canonical: stage, original: rawStage, wasUnknown: false };
    }
  }

  return { canonical: "LEAD", original: rawStage, wasUnknown: true };
}

export const STAGE_COLORS: Record<CanonicalStage, string> = {
  LEAD: "bg-gray-100 text-gray-700",
  MQL: "bg-blue-100 text-blue-700",
  SQL: "bg-indigo-100 text-indigo-700",
  OPPORTUNITY: "bg-purple-100 text-purple-700",
  PROPOSAL: "bg-amber-100 text-amber-700",
  NEGOTIATION: "bg-orange-100 text-orange-700",
  CLOSED_WON: "bg-green-100 text-green-700",
  CLOSED_LOST: "bg-red-100 text-red-700",
};

export const STAGE_ORDER: Record<CanonicalStage, number> = {
  LEAD: 0,
  MQL: 1,
  SQL: 2,
  OPPORTUNITY: 3,
  PROPOSAL: 4,
  NEGOTIATION: 5,
  CLOSED_WON: 6,
  CLOSED_LOST: 7,
};
