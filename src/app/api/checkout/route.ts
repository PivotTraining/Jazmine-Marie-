import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { MEMBERSHIP_TIERS } from "@/lib/constants";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Please sign in before starting checkout." }, { status: 401 });

    const formData = await request.formData();
    const tierId = String(formData.get("tierId") || "");
    const billing = String(formData.get("billing") || "monthly");
    const tier = MEMBERSHIP_TIERS.find((item) => item.id === tierId);
    if (!tier || !["monthly", "yearly"].includes(billing)) return NextResponse.json({ error: "Invalid membership selection" }, { status: 400 });

    const origin = new URL(request.url).origin;
    const lineItem = billing === "monthly"
      ? { price: tier.stripePriceId, quantity: 1 }
      : {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(tier.priceYearly * 100),
            recurring: { interval: "year" as const },
            product_data: { name: `OvercomeHER Circle — ${tier.name}`, description: tier.tagline },
          },
          quantity: 1,
        };

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      line_items: [lineItem],
      allow_promotion_codes: true,
      metadata: { user_id: user.id, tier_id: tier.id, billing_interval: billing },
      subscription_data: { trial_period_days: 7, metadata: { user_id: user.id, tier_id: tier.id, billing_interval: billing } },
      success_url: `${origin}/community?checkout=success`,
      cancel_url: `${origin}/overcomeher/join?checkout=canceled`,
    });

    if (!session.url) return NextResponse.json({ error: "Checkout could not be started" }, { status: 500 });
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Checkout creation failed", error);
    return NextResponse.json({ error: "Checkout is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
