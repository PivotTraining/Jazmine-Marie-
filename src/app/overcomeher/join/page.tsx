import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_TIERS } from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Join OvercomeHER Circle",
  description: "Choose your OvercomeHER Circle membership and start with a 7-day free trial.",
};

export default async function JoinPage() {
  const user = await getCurrentUser();

  return (
    <Section variant="warm" size="lg">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">Join OvercomeHER Circle</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">Choose the support that <span className="italic text-blush-400">fits now</span></h1>
        <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)]">Every tier begins with a 7-day free trial. Your card is collected securely by Stripe and billing begins only after the trial unless you cancel.</p>
        {!user && <p className="mt-4 text-sm text-warm-600 font-[family-name:var(--font-body)]">Create or sign in to your account before checkout so your membership can be activated automatically.</p>}
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {MEMBERSHIP_TIERS.map((tier) => {
          const yearlySavings = Math.round(tier.priceMonthly * 12 - tier.priceYearly);
          return (
            <div key={tier.id} className={`relative p-6 rounded-2xl ${tier.highlighted ? "bg-warm-800 text-white ring-2 ring-blush-400" : "bg-white border border-warm-200"}`}>
              {tier.highlighted && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blush-400 text-white text-[10px] font-semibold uppercase tracking-wider">Most Popular</span>}
              <h2 className="text-2xl font-semibold">{tier.name}</h2>
              <p className={`mt-2 text-sm ${tier.highlighted ? "text-warm-200" : "text-warm-500"}`}>{tier.tagline}</p>
              <div className="mt-5 space-y-1"><p className="text-3xl font-bold">${tier.priceMonthly}<span className="text-sm font-normal">/mo</span></p><p className={`text-sm ${tier.highlighted ? "text-warm-300" : "text-warm-400"}`}>or ${tier.priceYearly}/year · save ${yearlySavings}</p></div>
              <ul className="mt-5 space-y-2 text-sm">{tier.features.slice(0, 4).map((feature) => <li key={feature} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-blush-400 flex-shrink-0" />{feature}</li>)}</ul>
              <div className="mt-6 space-y-3">
                {user ? <>
                  <form action="/api/checkout" method="post"><input type="hidden" name="tierId" value={tier.id}/><input type="hidden" name="billing" value="monthly"/><Button type="submit" variant={tier.highlighted ? "warm" : "primary"} size="md" className="w-full">Start monthly trial <ArrowRight className="h-4 w-4"/></Button></form>
                  <form action="/api/checkout" method="post"><input type="hidden" name="tierId" value={tier.id}/><input type="hidden" name="billing" value="yearly"/><Button type="submit" variant="outline" size="md" className="w-full">Start annual trial</Button></form>
                </> : <Link href={`/login?redirect=${encodeURIComponent("/overcomeher/join")}`} className="block"><Button variant={tier.highlighted ? "warm" : "primary"} size="md" className="w-full">Sign in to continue <ArrowRight className="h-4 w-4"/></Button></Link>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-warm-400 font-[family-name:var(--font-body)]"><Lock className="h-4 w-4"/>Secure checkout powered by Stripe. Cancel anytime.</div>
    </Section>
  );
}
