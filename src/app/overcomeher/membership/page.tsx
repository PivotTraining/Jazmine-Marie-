import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight, Check, HelpCircle } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_TIERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Membership — OvercomeHER Circle",
  description:
    "Choose your OvercomeHER Circle membership tier. Three options designed to meet you wherever you are on your healing journey.",
};

export default function MembershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-warm-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            OvercomeHER Circle Membership
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900 leading-tight">
            Choose the path that{" "}
            <span className="italic text-blush-400">meets you</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-500 font-[family-name:var(--font-body)]">
            Every tier is designed to support your growth — not rush it. Start
            where you are. Go deeper when you&apos;re ready.
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <Section variant="default" size="lg">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                tier.highlighted
                  ? "bg-warm-800 text-white ring-2 ring-blush-400 shadow-2xl md:scale-105"
                  : "bg-white border border-warm-200 shadow-sm hover:shadow-lg"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-blush-400 text-white text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Most Popular
                </span>
              )}

              <div>
                <h2 className="text-3xl font-semibold">{tier.name}</h2>
                <p
                  className={`mt-1 italic font-[family-name:var(--font-body)] ${
                    tier.highlighted ? "text-blush-200" : "text-blush-400"
                  }`}
                >
                  {tier.tagline}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">${tier.priceMonthly}</span>
                  <span
                    className={`text-sm font-[family-name:var(--font-body)] ${
                      tier.highlighted ? "text-warm-300" : "text-warm-400"
                    }`}
                  >
                    /month
                  </span>
                </div>
                <p
                  className={`mt-1 text-sm font-[family-name:var(--font-body)] ${
                    tier.highlighted ? "text-warm-300" : "text-warm-400"
                  }`}
                >
                  or ${tier.priceYearly}/year (save $
                  {tier.priceMonthly * 12 - tier.priceYearly})
                </p>
              </div>

              <p
                className={`mt-6 text-sm leading-relaxed font-[family-name:var(--font-body)] ${
                  tier.highlighted ? "text-warm-200" : "text-warm-500"
                }`}
              >
                {tier.description}
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2.5 text-sm font-[family-name:var(--font-body)] ${
                      tier.highlighted ? "text-warm-200" : "text-warm-600"
                    }`}
                  >
                    <Check
                      className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? "text-blush-300" : "text-sage-400"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/overcomeher/join" className="block">
                  <Button
                    variant={tier.highlighted ? "warm" : "primary"}
                    size="lg"
                    className="w-full"
                  >
                    {tier.cta} <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Feature Comparison */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-warm-900">
            Full feature{" "}
            <span className="italic text-blush-400">comparison</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 text-sm font-medium text-warm-400 uppercase tracking-wider font-[family-name:var(--font-body)]">
                  Feature
                </th>
                {MEMBERSHIP_TIERS.map((tier) => (
                  <th
                    key={tier.id}
                    className="text-center py-4 px-4 text-lg font-semibold text-warm-800"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Welcome Room", true, true, true],
                ["Monthly Theme Room", true, true, true],
                ["Prayer & Encouragement", true, true, true],
                ["Announcements", true, true, true],
                ["Monthly group gathering", true, true, true],
                ["Starter resource library", true, true, true],
                ["Journaling & Reflection Room", false, true, true],
                ["Healing Conversations", false, true, true],
                ["Book Club & Devotional", false, true, true],
                ["Full replay library", false, true, true],
                ["Monthly live workshop", false, true, true],
                ["Moms / Marriage / Womanhood", false, true, true],
                ["Priority event access", false, true, true],
                ["Small-group mentorship", false, false, true],
                ["Quarterly 1-on-1 with Jazmine", false, false, true],
                ["Exclusive events & retreat info", false, false, true],
                ["Early access to new content", false, false, true],
                ["Accountability partnerships", false, false, true],
                ["Full archive access", false, false, true],
                ["VIP live event access", false, false, true],
              ].map(([feature, bloom, rooted, whole]) => (
                <tr
                  key={feature as string}
                  className="border-t border-warm-200"
                >
                  <td className="py-3 px-4 text-sm text-warm-600 font-[family-name:var(--font-body)]">
                    {feature as string}
                  </td>
                  {[bloom, rooted, whole].map((included, i) => (
                    <td key={i} className="text-center py-3 px-4">
                      {included ? (
                        <Check className="h-5 w-5 text-sage-400 mx-auto" />
                      ) : (
                        <span className="text-warm-200">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="default" size="lg">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-warm-900">
              Frequently asked{" "}
              <span className="italic text-blush-400">questions</span>
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "Can I upgrade my tier later?",
                a: "Absolutely. You can upgrade anytime from your member dashboard. Your billing will be prorated so you only pay the difference.",
              },
              {
                q: "Is there a free trial?",
                a: "We don't offer a free trial, but the Bloom tier is designed as an accessible entry point. If you join and feel it's not right for you, you can cancel within the first 7 days for a full refund.",
              },
              {
                q: "How is this different from other online communities?",
                a: "OvercomeHER is healing-centered, not hype-centered. We don't do 'girl boss' energy or surface-level motivation. This community is built for women doing real emotional and spiritual work, led by someone who's walked the road.",
              },
              {
                q: "What if I'm not religious?",
                a: "OvercomeHER is spiritually grounded but not exclusively faith-based. We welcome women of all backgrounds. The core of our work is emotional health, self-trust, and wholeness — values that transcend any single tradition.",
              },
              {
                q: "How much time does it require?",
                a: "As much or as little as you need. Some women engage daily. Others check in weekly. The content and community are always there when you're ready.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. There are no contracts or commitments. You can cancel from your dashboard at any time. We hope you'll stay, but we'll never make it hard to leave.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-warm-50 border border-warm-100"
              >
                <h3 className="flex items-start gap-3 text-lg font-semibold text-warm-800">
                  <HelpCircle className="h-5 w-5 text-plum-400 flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="mt-3 ml-8 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Your seat in the circle is{" "}
            <span className="italic text-blush-300">waiting</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-warm-300 font-[family-name:var(--font-body)]">
            You don&apos;t have to have it all figured out. You just have to be
            willing to start.
          </p>
          <div className="mt-8">
            <Link href="/overcomeher/join">
              <Button variant="warm" size="lg">
                Join OvercomeHER Today <Heart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
