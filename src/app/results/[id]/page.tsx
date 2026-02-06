import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ResultsClient } from "./results-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Your Revenue Roadmap | FounderVision`,
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

  // Transform for client component (parse JSON strings from SQLite)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecastData: any = {
    ...forecast,
    gapAnalysis: forecast.gapAnalysis ? JSON.parse(forecast.gapAnalysis) : null,
    recommendations: forecast.recommendations ? JSON.parse(forecast.recommendations) : null,
    createdAt: forecast.createdAt.toISOString(),
    updatedAt: forecast.updatedAt.toISOString(),
    okrs: forecast.okrs.map((okr) => ({
      ...okr,
      createdAt: okr.createdAt.toISOString(),
      keyResults: okr.keyResults.map((kr) => ({
        ...kr,
        createdAt: kr.createdAt.toISOString(),
      })),
    })),
  };

  return <ResultsClient forecast={forecastData} />;
}
