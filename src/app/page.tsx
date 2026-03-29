import Link from "next/link";
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
import { SIGNATURE_TOPICS, MEMBERSHIP_TIERS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-warm-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blush-50/60 via-transparent to-plum-50/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-sm uppercase tracking-[0.25em] text-blush-500 font-[family-name:var(--font-body)] font-medium">
                Host &middot; Speaker &middot; Healing Advocate
              </p>
              <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-warm-900">
                Helping women heal,{" "}
                <span className="text-blush-400 italic">grow</span>, and step
                into wholeness
              </h1>
              <p className="mt-6 max-w-xl text-lg text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
                I create transformative spaces where women stop surviving and start
                becoming. Through speaking, hosting, and the OvercomeHER Circle
                community, I walk alongside women doing the real work of healing.
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

            {/* Hero image placeholder */}
            <div className="animate-fade-in animate-delay-200 hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-blush-200 via-warm-200 to-plum-200 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-white/30 flex items-center justify-center mb-4">
                      <Heart className="h-16 w-16 text-warm-600" />
                    </div>
                    <p className="text-warm-600 font-[family-name:var(--font-body)] text-sm">
                      Jazmine Marie photo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT I DO ========== */}
      <Section variant="default" size="lg">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            What I Do
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            I create spaces where women{" "}
            <span className="italic text-blush-400">become</span>
          </h2>
        </div>

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
          ].map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-2xl bg-warm-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
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
          ))}
        </div>
      </Section>

      {/* ========== SIGNATURE TOPICS STRIP ========== */}
      <section className="bg-warm-800 py-6 overflow-hidden">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap">
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
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              OvercomeHER Circle
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900 leading-tight">
              A community for women{" "}
              <span className="italic text-blush-400">doing the work</span>
            </h2>
            <p className="mt-6 text-lg text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
              OvercomeHER Circle isn&apos;t another online group. It&apos;s a
              healing-centered membership community where women gather to
              journal, pray, learn, and grow — together. We tackle the real
              stuff: shame, identity, motherhood, self-trust, and what it means
              to become whole.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Monthly healing themes & guided content",
                "Live workshops & intimate gatherings",
                "Journaling, prayer, and book club rooms",
                "A sisterhood that holds space for your growth",
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
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, label: "Book Club" },
              { icon: MessageCircle, label: "Healing Chats" },
              { icon: Heart, label: "Prayer Room" },
              { icon: Users, label: "Sisterhood" },
            ].map((item) => (
              <div
                key={item.label}
                className="aspect-square rounded-2xl bg-white p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <item.icon className="h-10 w-10 text-plum-400 mb-3" />
                <span className="text-sm font-medium text-warm-600 font-[family-name:var(--font-body)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== TESTIMONIALS ========== */}
      <Section variant="default" size="lg">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            What Women Are Saying
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            Real women. Real <span className="italic text-blush-400">transformation</span>.
          </h2>
        </div>
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
          ].map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-2xl bg-warm-50 border border-warm-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
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
          ))}
        </div>
      </Section>

      {/* ========== SPEAKING CTA ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,147,106,0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-blush-300 font-[family-name:var(--font-body)] font-medium">
            Book Jazmine
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-tight">
            Looking for a speaker who moves rooms,{" "}
            <span className="italic text-blush-300">not just fills them</span>?
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-300 leading-relaxed font-[family-name:var(--font-body)]">
            Jazmine speaks on healing, vulnerability, motherhood, identity, and
            what it means to build wholeness from the inside out. Her talks
            aren&apos;t presentations — they&apos;re invitations.
          </p>
          <div className="mt-8">
            <Link href="/speaking">
              <Button variant="warm" size="lg">
                Inquire About Speaking <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MEMBERSHIP TIERS PREVIEW ========== */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Membership
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            Find your place in{" "}
            <span className="italic text-blush-400">the circle</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-500 font-[family-name:var(--font-body)]">
            Three tiers designed to meet you wherever you are on your journey.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
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
                className={`mt-1 text-sm font-[family-name:var(--font-body)] ${
                  tier.highlighted ? "text-blush-200" : "text-blush-400"
                }`}
              >
                {tier.tagline}
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">${tier.priceMonthly}</span>
                <span
                  className={`text-sm font-[family-name:var(--font-body)] ${
                    tier.highlighted ? "text-warm-300" : "text-warm-400"
                  }`}
                >
                  /month
                </span>
              </div>
              <ul className="mt-6 space-y-2">
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
          ))}
        </div>
      </Section>
    </>
  );
}
