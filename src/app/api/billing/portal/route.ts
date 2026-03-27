import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

// NOTE: The Stripe billing portal uses whichever key is set in STRIPE_SECRET_KEY.
// For production, ensure STRIPE_SECRET_KEY is set to your live key (sk_live_...).
// A test key (sk_test_...) will open the Stripe test account portal.

const BASE_URL = process.env.NEXTAUTH_URL || "https://fromthoughts.com";

export async function GET() {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) {
      return NextResponse.redirect(new URL("/auth/signin", BASE_URL));
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.redirect(new URL("/dashboard/billing", BASE_URL));
    }

    const stripe = getStripe();

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${BASE_URL}/dashboard/billing`,
    });

    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.redirect(new URL("/dashboard/billing?error=portal", BASE_URL));
  }
}
