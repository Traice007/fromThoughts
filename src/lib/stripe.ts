import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }
  return _stripe;
}

export const PLANS = {
  STARTER: {
    name: "Foundation",
    price: 2000000, // €20,000 in cents
    currency: "eur",
    mode: "subscription" as const,
    interval: "year" as const,
  },
  PRO: {
    name: "Growth",
    price: 3600000, // €36,000 in cents
    currency: "eur",
    mode: "subscription" as const,
    interval: "year" as const,
  },
} as const;

export type PlanId = keyof typeof PLANS;
