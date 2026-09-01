import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.redirect(new URL("/login", request.url), 303);

    const { data: membership, error } = await getServerSupabase()
      .from("memberships")
      .select("stripe_subscription_id")
      .eq("user_id", user.id)
      .in("status", ["active", "trialing", "past_due"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !membership?.stripe_subscription_id) {
      return NextResponse.redirect(new URL("/overcomeher/membership?billing=unavailable", request.url), 303);
    }

    const subscription = await getStripe().subscriptions.retrieve(membership.stripe_subscription_id);
    const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
    const portal = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${new URL(request.url).origin}/community`,
    });

    return NextResponse.redirect(portal.url, 303);
  } catch (error) {
    console.error("Billing portal creation failed", error);
    return NextResponse.redirect(new URL("/community?billing=error", request.url), 303);
  }
}
