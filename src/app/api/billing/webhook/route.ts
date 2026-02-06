import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (!userId || !planId) {
          console.error("Missing metadata in checkout session");
          break;
        }

        if (planId === "STARTER") {
          // One-time payment - grant 30 days access
          const accessEnd = new Date();
          accessEnd.setDate(accessEnd.getDate() + PLANS.STARTER.accessDays);

          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionTier: "STARTER",
              subscriptionStatus: "active",
              subscriptionPeriodEnd: accessEnd,
            },
          });
        } else if (planId === "PRO") {
          // Subscription - will be updated by subscription events
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionTier: "PRO",
              subscriptionStatus: "active",
            },
          });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("User not found for customer:", customerId);
          break;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionTier: "PRO",
            subscriptionStatus: subscription.status,
            subscriptionPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
            // Track if user has scheduled cancellation
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            // Clear payment failed flag if subscription is now active
            paymentFailedAt: subscription.status === "active" ? null : undefined,
          },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (!user) {
          console.error("User not found for customer:", customerId);
          break;
        }

        // Downgrade to trial/free tier
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionTier: "TRIAL",
            subscriptionStatus: "canceled",
            subscriptionPeriodEnd: null,
          },
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              subscriptionStatus: "past_due",
              paymentFailedAt: new Date(),
            },
          });

          // Send payment failed notification email
          try {
            const { sendPaymentFailedEmail } = await import("@/lib/email");
            await sendPaymentFailedEmail(user.email, user.name || "there");
          } catch (emailError) {
            console.error("Failed to send payment failed email:", emailError);
          }
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
