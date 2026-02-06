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
    name: "Starter",
    price: 150000, // €1,500 in cents
    currency: "eur",
    mode: "payment" as const,
    accessDays: 30,
  },
  PRO: {
    name: "Pro",
    price: 1500000, // €15,000 in cents
    currency: "eur",
    mode: "subscription" as const,
    interval: "year" as const,
  },
} as const;

export type PlanId = keyof typeof PLANS;
