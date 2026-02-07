import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const sessionUser = await getCurrentUser();
    if (!sessionUser) {
      return NextResponse.redirect(new URL("/auth/signin", process.env.NEXTAUTH_URL));
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.redirect(new URL("/dashboard/billing", process.env.NEXTAUTH_URL));
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXTAUTH_URL || "https://fromthoughts.com";

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/dashboard/billing`,
    });

    return NextResponse.redirect(session.url);
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.redirect(
      new URL("/dashboard/billing?error=portal", process.env.NEXTAUTH_URL)
    );
  }
}
