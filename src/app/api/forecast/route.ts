import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forecastSchema } from "@/types/forecast";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = forecastSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if user is authenticated
    const user = await getCurrentUser();

    // Create forecast in database
    const forecast = await prisma.forecast.create({
      data: {
        userId: user?.id || null, // Link to user if authenticated
        email: data.email,
        companyName: data.companyName,
        currentRevenue: data.currentRevenue,
        targetRevenue: data.targetRevenue,
        timeHorizonMonths: data.timeHorizonMonths,
        monthlyInboundLeads: data.monthlyInboundLeads,
        marketingQualifiedAccounts: data.marketingQualifiedAccounts,
        salesQualifiedLeads: data.salesQualifiedLeads,
        leadToMqaRate: data.leadToMqaRate,
        mqaToSqlRate: data.mqaToSqlRate,
        sqlToCloseRate: data.sqlToCloseRate,
        averageDealSize: data.averageDealSize,
        salesCycleLength: data.salesCycleLength,
        industry: data.industry,
        targetMarket: data.targetMarket,
        idealCustomerProfile: data.idealCustomerProfile,
        competitivePosition: data.competitivePosition,
        status: "PENDING",
      },
    });

    return NextResponse.json({ id: forecast.id, status: forecast.status });
  } catch (error) {
    console.error("Error creating forecast:", error);
    return NextResponse.json(
      { error: "Failed to create forecast" },
      { status: 500 }
    );
  }
}
