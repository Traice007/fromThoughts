import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getStripe, PLANS, PlanId } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) {
      console.error("Checkout: No session user found");
      return NextResponse.json({ error: "Please sign in to continue" }, { status: 401 });
    }

    let planId: string;
    try {
      const body = await request.json();
      planId = body.planId;
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (!planId || !PLANS[planId as PlanId]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const plan = PLANS[planId as PlanId];
    const stripe = getStripe();

    // Get user with stripeCustomerId from database
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        name: user.name ?? undefined,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const baseUrl = process.env.NEXTAUTH_URL || "https://fromthoughts.com";

    // Create checkout session based on plan type
    if (plan.mode === "payment") {
      // One-time payment for Starter
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: plan.currency,
              product_data: {
                name: `fromThoughts ${plan.name}`,
                description: `${plan.accessDays} days of full access to fromThoughts`,
              },
              unit_amount: plan.price,
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard/billing?success=true&plan=${planId}`,
        cancel_url: `${baseUrl}/dashboard/billing?canceled=true`,
        metadata: {
          userId: user.id,
          planId,
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Subscription for Pro
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: plan.currency,
              product_data: {
                name: `fromThoughts ${plan.name}`,
                description: "Annual subscription to fromThoughts Pro",
              },
              unit_amount: plan.price,
              recurring: {
                interval: plan.interval,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard/billing?success=true&plan=${planId}`,
        cancel_url: `${baseUrl}/dashboard/billing?canceled=true`,
        metadata: {
          userId: user.id,
          planId,
        },
      });

      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
