import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getServerSupabase } from "@/lib/supabase";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

type MembershipStatus = "active" | "trialing" | "past_due" | "canceled";

function membershipStatus(status: Stripe.Subscription.Status): MembershipStatus {
  if (status === "active") return "active";
  if (status === "trialing") return "trialing";
  if (status === "canceled" || status === "unpaid" || status === "incomplete_expired") return "canceled";
  return "past_due";
}

function periodEnd(subscription: Stripe.Subscription): string | null {
  const value = (subscription as unknown as Record<string, unknown>)["current_period_end"];
  return typeof value === "number" ? new Date(value * 1000).toISOString() : null;
}

async function saveMembership(input: { userId: string; tierId: string; subscriptionId: string; status: MembershipStatus; currentPeriodEnd: string | null }) {
  const supabase = getServerSupabase();
  const { data: existing, error: lookupError } = await supabase.from("memberships").select("id").eq("user_id", input.userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (lookupError) throw lookupError;

  const payload = {
    tier_id: input.tierId,
    stripe_subscription_id: input.subscriptionId,
    status: input.status,
    current_period_end: input.currentPeriodEnd,
  };

  if (existing?.id) {
    const { error } = await supabase.from("memberships").update(payload).eq("id", existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("memberships").insert({ user_id: input.userId, ...payload });
    if (error) throw error;
  }
}

export async function POST(request: NextRequest) {
  if (!webhookSecret) return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 });
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const tierId = session.metadata?.tier_id;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      if (!userId || !tierId || !subscriptionId) throw new Error("Checkout session is missing membership metadata");
      const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
      await saveMembership({ userId, tierId, subscriptionId, status: membershipStatus(subscription.status), currentPeriodEnd: periodEnd(subscription) });
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      const { error } = await getServerSupabase().from("memberships").update({
        status: event.type === "customer.subscription.deleted" ? "canceled" : membershipStatus(subscription.status),
        current_period_end: periodEnd(subscription),
      }).eq("stripe_subscription_id", subscription.id);
      if (error) throw error;
    }
  } catch (error) {
    console.error("Stripe webhook processing failed", { eventId: event.id, type: event.type, error });
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
