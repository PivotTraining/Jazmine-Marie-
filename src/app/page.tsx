import Link from "next/link";
import Image from "next/image";
import {
  Mic,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  BookOpen,
  MessageCircle,
  Star,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SIGNATURE_TOPICS, MEMBERSHIP_TIERS, IMAGES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-warm-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blush-50/60 via-transparent to-plum-50/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-blush-500 font-[family-name:var(--font-body)] font-medium">
                Host &middot; Speaker &middot; Healing Advocate
              </p>
              <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-warm-900">
                Helping women heal,{" "}
                <span className="text-blush-400 italic">grow</span>, and step
                into wholeness
              </h1>
              <p className="mt-6 max-w-xl text-lg text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
                I create transformative spaces where women stop surviving and
                start becoming. Through speaking, hosting, and the OvercomeHER
                Circle community, I walk alongside women doing the real work of
                healing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/overcomeher">
                  <Button variant="primary" size="lg">
                    Join OvercomeHER <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/speaking">
                  <Button variant="outline" size="lg">
                    Book Jazmine
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={IMAGES.jazmineJournaling}
                  alt="Jazmine Marie — Speaker and Healing Advocate"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT I DO ========== */}
      <Section variant="default" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              What I Do
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
              I create spaces where women{" "}
              <span className="italic text-blush-400">become</span>
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: Mic,
              title: "Speaker",
              description:
                "I speak at conferences, retreats, and gatherings on topics that matter — shame, healing, vulnerability, and the courage to become whole. My talks aren't lectures. They're conversations that change rooms.",
            },
            {
              icon: Users,
              title: "Host",
              description:
                "I host intimate and large-scale events designed for women who need more than surface-level connection. From panels to pajama parties, every gathering I create is designed to make women feel seen.",
            },
            {
              icon: Heart,
              title: "Community Builder",
              description:
                "Through OvercomeHER Circle, I've built a community where women do the real work — healing, journaling, praying, and growing together. It's not a fan club. It's a sisterhood of women becoming.",
            },
          ].map((item, i) => (
            <AnimateOnScroll key={item.title} animation="fade-up" delay={i * 150}>
              <div className="group p-8 rounded-2xl bg-warm-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-blush-100 flex items-center justify-center group-hover:bg-blush-200 transition-colors">
                  <item.icon className="h-7 w-7 text-blush-500" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-warm-800">
                  {item.title}
                </h3>
                <p className="mt-3 text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
                  {item.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* ========== SIGNATURE TOPICS STRIP ========== */}
      <section className="bg-warm-800 py-6 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {[...SIGNATURE_TOPICS, ...SIGNATURE_TOPICS].map((topic, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-warm-300 text-sm font-[family-name:var(--font-body)] uppercase tracking-widest"
            >
              <Sparkles className="h-4 w-4 text-blush-400 flex-shrink-0" />
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* ========== OVERCOMEHER PREVIEW ========== */}
      <Section variant="warm" size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll animation="slide-right">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={IMAGES.overcomeherLogo}
                  alt="OvercomeHER Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
                  OvercomeHER Circle
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-warm-900 leading-tight">
                A healing space for women ready to{" "}
                <span className="italic text-blush-400">do the work</span>{" "}
                together
              </h2>
              <p className="mt-6 text-lg text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
                You&apos;re done with surface-level wellness — you want real
                transformation. You desire sisterhood, safety, and connection
                with women who get it. You&apos;re ready to take care of you —
                for real this time.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Structure & accountability to keep your growth on track",
                  "Sisterhood & safe space — no judgment, just love",
                  "Live sessions, guided journaling, and healing challenges",
                  "Coaching & guidance every step of the way",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-warm-600 font-[family-name:var(--font-body)]"
                  >
                    <Heart className="h-5 w-5 text-blush-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/overcomeher">
                  <Button variant="warm" size="lg">
                    Explore OvercomeHER <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={IMAGES.eventRoom}
                  alt="OvercomeHER community event"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={IMAGES.jazmineSpeakingBlue}
                  alt="Women's gathering event"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={IMAGES.womenEmbrace}
                  alt="Community sisterhood"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={IMAGES.womenCircle}
                  alt="OvercomeHER conference"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      {/* ========== TESTIMONIALS ========== */}
      <Section variant="default" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              What Women Are Saying
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
              Real women. Real{" "}
              <span className="italic text-blush-400">transformation</span>.
            </h2>
          </div>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Jazmine creates a space where you can finally exhale. I walked into OvercomeHER carrying guilt I didn't even know I was holding — and I left feeling like I had permission to heal.",
              name: "Tasha M.",
              role: "OvercomeHER Member",
            },
            {
              quote:
                "I've been to a lot of women's events, but nothing compares to what Jazmine builds. She doesn't just speak at you — she sees you. The vulnerability in the room is what changes everything.",
              name: "Keisha R.",
              role: "Conference Attendee",
            },
            {
              quote:
                "As a mom of three who was running on empty, OvercomeHER became my lifeline. The journaling prompts alone have helped me reconnect with parts of myself I forgot existed.",
              name: "Danielle S.",
              role: "OvercomeHER Member",
            },
          ].map((testimonial, i) => (
            <AnimateOnScroll key={testimonial.name} animation="fade-up" delay={i * 100}>
              <div className="p-8 rounded-2xl bg-warm-50 border border-warm-100 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 text-gold-400 fill-gold-400"
                    />
                  ))}
                </div>
                <p className="text-warm-600 leading-relaxed font-[family-name:var(--font-body)] italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-warm-200">
                  <p className="font-semibold text-warm-800 font-[family-name:var(--font-body)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* ========== SPEAKING CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,147,106,0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.25em] text-blush-300 font-[family-name:var(--font-body)] font-medium">
                Book Jazmine
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-tight">
                Looking for a speaker who moves rooms,{" "}
                <span className="italic text-blush-300">
                  not just fills them
                </span>
                ?
              </h2>
              <p className="mt-6 max-w-2xl text-lg text-warm-300 leading-relaxed font-[family-name:var(--font-body)]">
                Jazmine speaks on healing, vulnerability, motherhood, identity,
                and what it means to build wholeness from the inside out. Her
                talks aren&apos;t presentations — they&apos;re invitations.
              </p>
              <div className="mt-8">
                <Link href="/speaking">
                  <Button variant="warm" size="lg">
                    Inquire About Speaking <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <Image
                  src={IMAGES.jazmineShameTalk}
                  alt="Jazmine presenting on overcoming shame"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] mt-8">
                <Image
                  src={IMAGES.jazmineHosting}
                  alt="Jazmine hosting workshop"
                  width={400}
                  height={530}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MEMBERSHIP TIERS PREVIEW ========== */}
      <Section variant="warm" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <Image
              src={IMAGES.pinkBrushLogo}
              alt="OvercomeHER"
              width={64}
              height={64}
              className="mx-auto mb-4 rounded-full"
            />
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              Membership
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
              Find your place in{" "}
              <span className="italic text-blush-400">the circle</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-500 font-[family-name:var(--font-body)]">
              Because healing isn&apos;t one-size-fits-all. Choose the support
              that meets you where you are.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <AnimateOnScroll key={tier.id} animation="fade-up" delay={i * 150}>
              <div
                className={`relative p-8 rounded-2xl transition-all duration-300 hover:shadow-xl h-full flex flex-col ${
                  tier.highlighted
                    ? "bg-warm-800 text-white ring-2 ring-blush-400 scale-[1.02]"
                    : "bg-white shadow-sm"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blush-400 text-white text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-body)]">
                    Most Popular
                  </span>
                )}
                <h3 className="text-3xl font-semibold">{tier.name}</h3>
                <p
                  className={`mt-1 text-sm font-[family-name:var(--font-body)] italic ${
                    tier.highlighted ? "text-blush-200" : "text-blush-400"
                  }`}
                >
                  {tier.tagline}
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">
                    ${tier.priceMonthly}
                  </span>
                  <span
                    className={`text-sm font-[family-name:var(--font-body)] ${
                      tier.highlighted ? "text-warm-300" : "text-warm-400"
                    }`}
                  >
                    /month
                  </span>
                </div>
                {tier.trialText && (
                  <p
                    className={`mt-1 text-sm font-medium font-[family-name:var(--font-body)] ${
                      tier.highlighted ? "text-blush-300" : "text-sage-400"
                    }`}
                  >
                    {tier.trialText}
                  </p>
                )}
                <ul className="mt-6 space-y-2 flex-1">
                  {tier.features.slice(0, 5).map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm font-[family-name:var(--font-body)] ${
                        tier.highlighted ? "text-warm-200" : "text-warm-500"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "text-blush-300" : "text-blush-400"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/overcomeher/membership" className="block">
                    <Button
                      variant={tier.highlighted ? "warm" : "outline"}
                      size="md"
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* ========== GUARANTEE ========== */}
      <Section variant="default" size="md">
        <AnimateOnScroll animation="scale">
          <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-warm-50 border border-warm-100">
            <p className="text-sm uppercase tracking-[0.25em] text-sage-400 font-[family-name:var(--font-body)] font-semibold">
              100% Risk-Free Guarantee
            </p>
            <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-warm-900">
              Your healing is sacred — and so is your investment.
            </h3>
            <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
              That&apos;s why every membership includes a 7-day, no-questions-asked
              money-back guarantee. If you join and realize it&apos;s not the right
              space for you, just reach out within the first 7 days for a full
              refund. No awkward convos. No pressure. Just respect.
            </p>
            <div className="mt-6">
              <Link href="/overcomeher/membership">
                <Button variant="primary" size="lg">
                  Join Risk-Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>
    </>
  );
}
