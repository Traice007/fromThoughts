import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const forecastId = request.nextUrl.searchParams.get("forecastId");

  if (!forecastId) {
    return NextResponse.json(
      { error: "Forecast ID is required" },
      { status: 400 }
    );
  }

  try {
    const forecast = await prisma.forecast.findUnique({
      where: { id: forecastId },
      include: {
        okrs: {
          include: { keyResults: true },
          orderBy: { priority: "desc" },
        },
      },
    });

    if (!forecast) {
      return NextResponse.json(
        { error: "Forecast not found" },
        { status: 404 }
      );
    }

    // Generate simple HTML that can be printed as PDF
    const html = generatePdfHtml(forecast);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="foundervision-okrs-${forecastId}.html"`,
      },
    });
  } catch (error) {
    console.error("PDF export error:", error);
    return NextResponse.json(
      { error: "Failed to export PDF" },
      { status: 500 }
    );
  }
}

function generatePdfHtml(forecast: {
  id: string;
  companyName: string | null;
  currentRevenue: number;
  targetRevenue: number;
  timeHorizonMonths: number;
  gapAnalysis: unknown;
  recommendations: unknown;
  okrs: {
    objective: string;
    category: string;
    priority: number;
    timeframe: string;
    rationale: string | null;
    howToAchieve: string | null;
    keyResults: {
      description: string;
      metricName: string;
      currentValue: number | null;
      targetValue: number;
      unit: string;
    }[];
  }[];
}): string {
  const growthMultiple = (forecast.targetRevenue / forecast.currentRevenue).toFixed(1);
  // Parse JSON strings if needed (SQLite stores as strings)
  let gapAnalysis = forecast.gapAnalysis as { summary?: string } | string | null;
  let recommendations = forecast.recommendations as string[] | string | null;

  if (typeof gapAnalysis === 'string') {
    try { gapAnalysis = JSON.parse(gapAnalysis); } catch { gapAnalysis = null; }
  }
  if (typeof recommendations === 'string') {
    try { recommendations = JSON.parse(recommendations); } catch { recommendations = null; }
  }

  const gapSummary = (gapAnalysis as { summary?: string } | null)?.summary;
  const recs = recommendations as string[] | null;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>FounderVision - Revenue Forecast & OKRs</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 20px; margin: 32px 0 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e5e5; }
    h3 { font-size: 16px; margin: 16px 0 8px; }
    .subtitle { color: #666; margin-bottom: 32px; }
    .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px; }
    .summary-item { background: #f5f5f5; padding: 16px; border-radius: 8px; }
    .summary-item label { font-size: 12px; color: #666; display: block; margin-bottom: 4px; }
    .summary-item .value { font-size: 24px; font-weight: bold; color: #2563eb; }
    .okr { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .okr-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .okr-title { font-size: 16px; font-weight: 600; }
    .okr-meta { font-size: 12px; color: #666; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; background: #dbeafe; color: #1d4ed8; margin-right: 8px; }
    .key-results { margin-top: 12px; }
    .kr { display: flex; justify-content: space-between; padding: 8px 12px; background: white; border-radius: 4px; margin-bottom: 8px; font-size: 14px; }
    .kr-target { color: #2563eb; font-weight: 500; }
    .when-how { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
    .when-box { background: #dbeafe; padding: 12px; border-radius: 6px; font-size: 13px; }
    .how-box { background: #fef3c7; padding: 12px; border-radius: 6px; font-size: 13px; }
    .rationale { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #666; }
    .recommendations { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; }
    .recommendation { display: flex; gap: 12px; margin-bottom: 12px; }
    .recommendation:last-child { margin-bottom: 0; }
    .rec-number { width: 24px; height: 24px; background: #22c55e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 12px; color: #666; }
    @media print { body { padding: 20px; } .okr { page-break-inside: avoid; } }
  </style>
</head>
<body>
  <h1>Revenue Forecast & Strategic OKRs</h1>
  <p class="subtitle">${forecast.companyName || "Your Company"} • Generated by FounderVision</p>

  <div class="summary-grid">
    <div class="summary-item">
      <label>Current ARR</label>
      <div class="value">$${forecast.currentRevenue.toLocaleString()}</div>
    </div>
    <div class="summary-item">
      <label>Target ARR</label>
      <div class="value">$${forecast.targetRevenue.toLocaleString()}</div>
    </div>
    <div class="summary-item">
      <label>Growth Multiple</label>
      <div class="value">${growthMultiple}x</div>
    </div>
    <div class="summary-item">
      <label>Timeline</label>
      <div class="value">${forecast.timeHorizonMonths} months</div>
    </div>
  </div>

  ${gapSummary ? `
  <h2>Gap Analysis</h2>
  <p>${gapSummary}</p>
  ` : ''}

  ${recs && recs.length > 0 ? `
  <h2>Immediate Actions</h2>
  <div class="recommendations">
    ${recs.map((rec, i) => `
    <div class="recommendation">
      <div class="rec-number">${i + 1}</div>
      <div>${rec}</div>
    </div>
    `).join('')}
  </div>
  ` : ''}

  <h2>Your OKRs</h2>
  ${forecast.okrs.map((okr, i) => `
  <div class="okr">
    <div class="okr-header">
      <div>
        <span class="badge">${okr.category}</span>
        <span class="okr-meta">${okr.timeframe}</span>
      </div>
      <div class="okr-meta">Priority: ${okr.priority}/10</div>
    </div>
    <div class="okr-title">${i + 1}. ${okr.objective}</div>
    <div class="when-how">
      <div class="when-box"><strong>When:</strong> ${okr.timeframe}</div>
      ${okr.howToAchieve ? `<div class="how-box"><strong>How:</strong> ${okr.howToAchieve}</div>` : ''}
    </div>
    <div class="key-results">
      ${okr.keyResults.map(kr => `
      <div class="kr">
        <span>${kr.description}</span>
        <span class="kr-target">${kr.currentValue !== null ? `${kr.currentValue}${kr.unit} → ` : ''}${kr.targetValue}${kr.unit}</span>
      </div>
      `).join('')}
    </div>
    ${okr.rationale ? `<div class="rationale"><strong>Why:</strong> ${okr.rationale}</div>` : ''}
  </div>
  `).join('')}

  <div class="footer">
    <p>Generated by FounderVision • foundervision.io</p>
    <p>AI-Powered Revenue Operations for Growing Companies</p>
  </div>
</body>
</html>
  `;
}
