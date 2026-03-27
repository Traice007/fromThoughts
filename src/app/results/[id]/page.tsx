import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { forbidden } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { ResultsClient } from "./results-client";
import type { ForecastWithOkrs, GapAnalysis, OkrCategory } from "@/types/forecast";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  // Keep metadata generation cheap — don't expose forecast details in title
  void id;
  return {
    title: `Your Revenue Roadmap | fromThoughts`,
    description: "View your AI-generated revenue roadmap and strategic recommendations",
  };
}

export default async function ResultsPage({ params }: PageProps) {
  const { id } = await params;

  const forecast = await prisma.forecast.findUnique({
    where: { id },
    include: {
      okrs: {
        include: {
          keyResults: true,
        },
        orderBy: {
          priority: "desc",
        },
      },
      crmIntegrations: true,
    },
  });

  if (!forecast) {
    notFound();
  }

  // Enforce ownership: if the forecast belongs to a specific user, only that user may view it
  const user = await getCurrentUser();
  if (forecast.userId && (!user || forecast.userId !== user.id)) {
    forbidden();
  }

  // Parse JSON strings — guard against malformed data from partial writes
  let gapAnalysis: GapAnalysis | null = null;
  let recommendations: string[] | null = null;

  if (forecast.gapAnalysis) {
    try {
      gapAnalysis = JSON.parse(forecast.gapAnalysis) as GapAnalysis;
    } catch {
      console.error(`Failed to parse gapAnalysis for forecast ${id}`);
    }
  }
  if (forecast.recommendations) {
    try {
      recommendations = JSON.parse(forecast.recommendations) as string[];
    } catch {
      console.error(`Failed to parse recommendations for forecast ${id}`);
    }
  }

  // Transform dates for client component serialisation
  const forecastData: ForecastWithOkrs & {
    industry?: string | null;
    leadToMqaRate?: number | null;
    mqaToSqlRate?: number | null;
    sqlToCloseRate?: number | null;
    averageDealSize?: number | null;
    salesCycleLength?: number | null;
    updatedAt: string;
    crmIntegrations: typeof forecast.crmIntegrations;
  } = {
    ...forecast,
    gapAnalysis,
    recommendations,
    createdAt: forecast.createdAt.toISOString(),
    updatedAt: forecast.updatedAt.toISOString(),
    okrs: forecast.okrs.map((okr) => ({
      ...okr,
      category: okr.category as OkrCategory,
      createdAt: okr.createdAt.toISOString(),
      keyResults: okr.keyResults.map((kr) => ({
        ...kr,
        createdAt: kr.createdAt.toISOString(),
      })),
    })),
  };

  return <ResultsClient forecast={forecastData} />;
}
