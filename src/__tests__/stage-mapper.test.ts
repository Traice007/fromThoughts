import { describe, it, expect } from "vitest";
import { mapStage } from "@/lib/pipeline/stage-mapper";

describe("mapStage", () => {
  it("maps exact match (case-insensitive)", () => {
    const result = mapStage("Closed Won");
    expect(result.canonical).toBe("CLOSED_WON");
    expect(result.wasUnknown).toBe(false);
  });

  it("maps lowercase exact match", () => {
    const result = mapStage("lead");
    expect(result.canonical).toBe("LEAD");
    expect(result.wasUnknown).toBe(false);
  });

  it("trims whitespace", () => {
    const result = mapStage("  lead  ");
    expect(result.canonical).toBe("LEAD");
    expect(result.wasUnknown).toBe(false);
  });

  it("maps common CRM stage names", () => {
    expect(mapStage("prospecting").canonical).toBe("LEAD");
    expect(mapStage("mql").canonical).toBe("MQL");
    expect(mapStage("qualified").canonical).toBe("SQL");
    expect(mapStage("demo").canonical).toBe("SQL");
    expect(mapStage("proposal sent").canonical).toBe("PROPOSAL");
    expect(mapStage("negotiation").canonical).toBe("NEGOTIATION");
    expect(mapStage("won").canonical).toBe("CLOSED_WON");
    expect(mapStage("lost").canonical).toBe("CLOSED_LOST");
  });

  it("maps via partial match", () => {
    const result = mapStage("enterprise demo scheduled");
    expect(result.canonical).toBe("SQL");
    expect(result.wasUnknown).toBe(false);
  });

  it("preserves original stage name", () => {
    const result = mapStage("My Custom Stage");
    expect(result.original).toBe("My Custom Stage");
  });

  it("falls back to LEAD for unknown stages", () => {
    const result = mapStage("evaluation");
    expect(result.canonical).toBe("LEAD");
    expect(result.wasUnknown).toBe(true);
  });

  it("maps disqualified to CLOSED_LOST", () => {
    expect(mapStage("disqualified").canonical).toBe("CLOSED_LOST");
  });

  it("maps contract-related stages to NEGOTIATION", () => {
    expect(mapStage("contract sent").canonical).toBe("NEGOTIATION");
    expect(mapStage("contract review").canonical).toBe("NEGOTIATION");
    expect(mapStage("pending contract").canonical).toBe("NEGOTIATION");
  });
});
