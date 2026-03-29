import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, Check, HelpCircle, Shield } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { MEMBERSHIP_TIERS, IMAGES } from "@/lib/constants";

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
          <Image
            src={IMAGES.overcomeherLogo}
            alt="OvercomeHER Circle logo"
            width={80}
            height={80}
            className="mx-auto mb-6"
          />
          <AnimateOnScroll animation="fade-up">
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
          </AnimateOnScroll>
        </div>
      </section>

      {/* Tier Cards */}
      <Section variant="default" size="lg">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {MEMBERSHIP_TIERS.map((tier, index) => (
            <AnimateOnScroll key={tier.id} animation="fade-up" delay={index * 120}>
              <div
                className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 h-full ${
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

                {/* Trial badge */}
                <div className="mt-4">
                  <span
                    className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full font-[family-name:var(--font-body)] ${
                      tier.highlighted
                        ? "bg-blush-400/20 text-blush-200"
                        : "bg-sage-50 text-sage-600"
                    }`}
                  >
                    {tier.trialText}
                  </span>
                </div>

                <p
                  className={`mt-4 text-sm leading-relaxed font-[family-name:var(--font-body)] ${
                    tier.highlighted ? "text-warm-200" : "text-warm-500"
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-3">
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

                {/* Perfect For section */}
                <div
                  className={`mt-6 pt-6 border-t flex-1 ${
                    tier.highlighted ? "border-warm-600" : "border-warm-100"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider mb-3 font-[family-name:var(--font-body)] ${
                      tier.highlighted ? "text-blush-300" : "text-plum-400"
                    }`}
                  >
                    Perfect for you if you...
                  </p>
                  <ul className="space-y-2">
                    {tier.perfectFor.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-2 text-sm font-[family-name:var(--font-body)] ${
                          tier.highlighted ? "text-warm-300" : "text-warm-500"
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${
                            tier.highlighted ? "text-blush-300" : "text-blush-400"
                          }`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

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
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* Feature Comparison */}
      <Section variant="warm" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-warm-900">
              Full feature{" "}
              <span className="italic text-blush-400">comparison</span>
            </h2>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={100}>
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
                  ["Monthly healing theme + journaling prompts", true, true, true],
                  ["Community support spaces", true, true, true],
                  ["Guided challenges for building habits", true, true, true],
                  ["ReadHER Book Club", true, true, true],
                  ["Monthly group gathering (virtual)", true, true, true],
                  ["Prayer & Encouragement room", true, true, true],
                  ["Monthly Live Community Sessions", false, true, true],
                  ["Guided group reflection + conversation", false, true, true],
                  ["Weekly journal prompts + accountability", false, true, true],
                  ["Integration activities + practice space", false, true, true],
                  ["Priority event access", false, true, true],
                  ["Healing Conversations room", false, true, true],
                  ["Teaching replay library", false, true, true],
                  ["Live Coaching with Jazmine + Chris Marvel", false, false, true],
                  ["Private coaching community", false, false, true],
                  ["Hot seat coaching + Q&A sessions", false, false, true],
                  ["Exclusive Deep Work exercises", false, false, true],
                  ["VIP access to live events", false, false, true],
                ].map(([feature, nurturher, transformher, ascendher]) => (
                  <tr
                    key={feature as string}
                    className="border-t border-warm-200"
                  >
                    <td className="py-3 px-4 text-sm text-warm-600 font-[family-name:var(--font-body)]">
                      {feature as string}
                    </td>
                    {[nurturher, transformher, ascendher].map((included, i) => (
                      <td key={i} className="text-center py-3 px-4">
                        {included ? (
                          <Check className="h-5 w-5 text-sage-400 mx-auto" />
                        ) : (
                          <span className="text-warm-200">&mdash;</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>
      </Section>

      {/* FAQ */}
      <Section variant="default" size="lg">
        <AnimateOnScroll animation="fade-up">
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
                  a: "Yes! Every tier comes with a 7-day free trial so you can explore the community and content before committing. If it\u2019s not the right fit, simply cancel before the trial ends.",
                },
                {
                  q: "How is this different from other online communities?",
                  a: "OvercomeHER is healing-centered, not hype-centered. We don\u2019t do \u2018girl boss\u2019 energy or surface-level motivation. This community is built for women doing real emotional and spiritual work, led by someone who\u2019s walked the road.",
                },
                {
                  q: "What if I'm not religious?",
                  a: "OvercomeHER is spiritually grounded but not exclusively faith-based. We welcome women of all backgrounds. The core of our work is emotional health, self-trust, and wholeness \u2014 values that transcend any single tradition.",
                },
                {
                  q: "How much time does it require?",
                  a: "As much or as little as you need. Some women engage daily. Others check in weekly. The content and community are always there when you\u2019re ready.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. There are no contracts or commitments. You can cancel from your dashboard at any time. We hope you\u2019ll stay, but we\u2019ll never make it hard to leave.",
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
        </AnimateOnScroll>
      </Section>

      {/* Guarantee Section */}
      <Section variant="warm" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-sage-50 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-sage-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-warm-900">
              7-Day Money-Back{" "}
              <span className="italic text-blush-400">Guarantee</span>
            </h2>
            <p className="mt-6 text-lg text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
              We believe in OvercomeHER so much that every membership comes with a
              7-day money-back guarantee. Try any tier risk-free. If it&apos;s not
              the right fit, simply reach out within 7 days and we&apos;ll refund
              your payment in full — no questions asked, no hard feelings.
            </p>
          </div>
        </AnimateOnScroll>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 text-center">
          <AnimateOnScroll animation="fade-up">
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
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
