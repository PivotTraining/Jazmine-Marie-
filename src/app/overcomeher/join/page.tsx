import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight, Lock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_TIERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Join OvercomeHER Circle",
  description: "Sign up for OvercomeHER Circle membership and begin your healing journey.",
};

export default function JoinPage() {
  return (
    <>
      <Section variant="warm" size="lg">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Join OvercomeHER Circle
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            Welcome to{" "}
            <span className="italic text-blush-400">the circle</span>
          </h1>
          <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)]">
            Select your membership tier to get started. You&apos;ll create your
            account and complete checkout on the next step.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-lg ${
                tier.highlighted
                  ? "bg-warm-800 text-white ring-2 ring-blush-400"
                  : "bg-white border border-warm-200"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blush-400 text-white text-[10px] font-semibold uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold">{tier.name}</h3>
              <p
                className={`mt-1 text-sm italic font-[family-name:var(--font-body)] ${
                  tier.highlighted ? "text-blush-200" : "text-blush-400"
                }`}
              >
                {tier.tagline}
              </p>
              <div className="mt-4">
                <span className="text-3xl font-bold">${tier.priceMonthly}</span>
                <span
                  className={`text-sm font-[family-name:var(--font-body)] ${
                    tier.highlighted ? "text-warm-300" : "text-warm-400"
                  }`}
                >
                  /mo
                </span>
              </div>
              <div className="mt-6">
                <Link href="/login" className="block">
                  <Button
                    variant={tier.highlighted ? "warm" : "primary"}
                    size="md"
                    className="w-full"
                  >
                    {tier.cta} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2 text-sm text-warm-400 font-[family-name:var(--font-body)]">
          <Lock className="h-4 w-4" />
          Secure checkout powered by Stripe. Cancel anytime.
        </div>
      </Section>
    </>
  );
}
