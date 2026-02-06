import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendSubscriptionExpiryWarningEmail } from "@/lib/email";

// Days before expiry to send warnings
const WARNING_DAYS = [7, 3, 1];

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron or has valid auth
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // In production, verify the cron secret
  if (process.env.NODE_ENV === "production") {
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const now = new Date();
    const results = {
      processed: 0,
      emailsSent: 0,
      errors: [] as string[],
    };

    // Process each warning threshold
    for (const daysAhead of WARNING_DAYS) {
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + daysAhead);

      // Set time to start and end of the target day
      const dayStart = new Date(targetDate);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(targetDate);
      dayEnd.setHours(23, 59, 59, 999);

      // Find users whose subscription expires on this day
      const users = await prisma.user.findMany({
        where: {
          subscriptionPeriodEnd: {
            gte: dayStart,
            lte: dayEnd,
          },
          subscriptionTier: {
            in: ["STARTER", "PRO"],
          },
          // Don't send to canceled subscriptions that are already processing
          cancelAtPeriodEnd: false,
          // Don't send to users with payment issues (they get different emails)
          paymentFailedAt: null,
        },
        select: {
          id: true,
          email: true,
          name: true,
          subscriptionTier: true,
          subscriptionPeriodEnd: true,
        },
      });

      for (const user of users) {
        results.processed++;

        try {
          const result = await sendSubscriptionExpiryWarningEmail(
            user.email,
            user.name || "there",
            user.subscriptionTier!,
            daysAhead,
            user.subscriptionPeriodEnd!
          );

          if (result.success) {
            results.emailsSent++;
          } else {
            results.errors.push(`Failed to send to ${user.email}: ${result.error}`);
          }
        } catch (error) {
          results.errors.push(
            `Error sending to ${user.email}: ${error instanceof Error ? error.message : "Unknown error"}`
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      ...results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Subscription warning cron error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
