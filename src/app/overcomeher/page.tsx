import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  Users,
  BookOpen,
  MessageCircle,
  Sparkles,
  Calendar,
  Shield,
  Star,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { COMMUNITY_ROOMS, MEMBERSHIP_TIERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "OvercomeHER Circle",
  description:
    "OvercomeHER Circle is a healing-centered membership community for women doing the real work of growth, healing, and becoming whole.",
};

export default function OvercomeHERPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(232,147,106,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(185,152,194,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blush-300 font-[family-name:var(--font-body)] font-medium">
            OvercomeHER Circle
          </p>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight max-w-4xl mx-auto">
            A community for women who are{" "}
            <span className="italic text-blush-300">done pretending</span>{" "}
            they&apos;re fine
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-300 leading-relaxed font-[family-name:var(--font-body)]">
            OvercomeHER Circle is a healing-centered membership community where
            women come to do the real work — not perform wellness, but actually
            heal, grow, and step into who they were always meant to be.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/overcomeher/membership">
              <Button variant="warm" size="lg">
                See Membership Options <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is OvercomeHER */}
      <Section variant="default" size="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-warm-900">
            This isn&apos;t another{" "}
            <span className="italic text-blush-400">online group</span>
          </h2>
          <div className="mt-8 space-y-6 text-lg text-warm-500 leading-relaxed font-[family-name:var(--font-body)] text-left">
            <p>
              There are a thousand communities online telling you to &ldquo;level up&rdquo;
              and &ldquo;boss up.&rdquo; OvercomeHER isn&apos;t one of them.
            </p>
            <p>
              This is a space for women who are tired of performing strength and
              ready to actually build it. Women who know that real growth starts
              with honesty — with yourself, with God, and with a circle of women
              who won&apos;t let you stay stuck.
            </p>
            <p>
              Inside OvercomeHER, we journal through the hard things. We pray
              through the heavy things. We learn from women who&apos;ve walked
              the road. And we hold space for each other — because healing
              wasn&apos;t meant to happen alone.
            </p>
          </div>
        </div>
      </Section>

      {/* Who It's For */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Is This For You?
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            OvercomeHER is for{" "}
            <span className="italic text-blush-400">the woman who</span>...
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "Is carrying more than she shows",
            "Has been the strong friend for too long",
            "Knows she needs healing but doesn't know where to start",
            "Is a mother, wife, or caregiver running on fumes",
            "Wants to deal with shame, guilt, or identity struggles",
            "Is craving real connection — not surface-level networking",
            "Believes in growth but needs a community to grow with",
            "Wants to be seen, not just followed",
            "Is ready to do the work — not just talk about it",
          ].map((item) => (
            <div
              key={item}
              className="p-5 rounded-xl bg-white border border-warm-100 flex items-start gap-3"
            >
              <Heart className="h-5 w-5 text-blush-400 flex-shrink-0 mt-0.5" />
              <span className="text-warm-600 font-[family-name:var(--font-body)]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* What Women Experience */}
      <Section variant="default" size="lg">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-warm-900">
            What you&apos;ll{" "}
            <span className="italic text-blush-400">experience</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: BookOpen,
              title: "Guided Healing Content",
              description:
                "Monthly themes, journaling prompts, teachings, and devotionals designed to help you go deeper.",
            },
            {
              icon: Users,
              title: "Real Community",
              description:
                "Discussion rooms where vulnerability is welcomed and sisterhood is the standard.",
            },
            {
              icon: Calendar,
              title: "Live Gatherings",
              description:
                "Monthly workshops, prayer calls, and intimate group sessions led by Jazmine.",
            },
            {
              icon: Shield,
              title: "A Safe Space",
              description:
                "A moderated, tier-gated community built on trust, respect, and emotional safety.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-plum-50 flex items-center justify-center mx-auto">
                <item.icon className="h-8 w-8 text-plum-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-warm-800">
                {item.title}
              </h3>
              <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Community Rooms Preview */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Inside the Circle
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            Community{" "}
            <span className="italic text-blush-400">rooms</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMUNITY_ROOMS.slice(0, 6).map((room) => (
            <div
              key={room.slug}
              className="p-6 rounded-2xl bg-white border border-warm-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-plum-50 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-plum-400" />
                </div>
                <h3 className="font-semibold text-warm-800">{room.name}</h3>
              </div>
              <p className="text-sm text-warm-500 font-[family-name:var(--font-body)]">
                {room.description}
              </p>
              <span className="mt-3 inline-block text-xs font-medium uppercase tracking-wider text-plum-400 bg-plum-50 px-3 py-1 rounded-full font-[family-name:var(--font-body)]">
                {room.tierRequired}+ tier
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Culture / Transformation Journey */}
      <Section variant="default" size="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-warm-900">
            The transformation{" "}
            <span className="italic text-blush-400">journey</span>
          </h2>
          <p className="mt-6 text-lg text-warm-500 font-[family-name:var(--font-body)]">
            Every woman who enters OvercomeHER walks a path of becoming.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Bloom",
              subtitle: "Arrive and exhale",
              description:
                "You enter the circle. You're welcomed without judgment. You start to see that healing is possible, and you don't have to do it alone.",
            },
            {
              step: "02",
              title: "Rooted",
              subtitle: "Do the deep work",
              description:
                "You engage with the content, the conversations, and the community. You journal through the hard stuff. You start to feel the shift.",
            },
            {
              step: "03",
              title: "Whole",
              subtitle: "Step into your becoming",
              description:
                "You're not the same woman who walked in. You've done the work. You've been seen. And now you're helping others do the same.",
            },
          ].map((phase) => (
            <div key={phase.step} className="relative">
              <span className="text-7xl font-bold text-warm-100">
                {phase.step}
              </span>
              <h3 className="mt-2 text-2xl font-semibold text-warm-800">
                {phase.title}
              </h3>
              <p className="text-blush-400 font-[family-name:var(--font-body)] italic">
                {phase.subtitle}
              </p>
              <p className="mt-3 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-warm-900">
            Women in the circle are{" "}
            <span className="italic text-blush-400">saying</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              quote:
                "I joined OvercomeHER at my lowest point. I was burnt out, disconnected from my purpose, and honestly disconnected from myself. This community didn't fix me — it gave me permission to start fixing myself.",
              name: "Alexis W.",
            },
            {
              quote:
                "The journaling prompts alone are worth the membership. But it's the women — the vulnerability, the prayer, the real conversations — that keep me coming back month after month.",
              name: "Morgan D.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl bg-white border border-warm-100"
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
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 font-semibold text-warm-800 font-[family-name:var(--font-body)]">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Membership Preview + CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,147,106,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Ready to find your place in{" "}
            <span className="italic text-blush-300">the circle</span>?
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-300 leading-relaxed font-[family-name:var(--font-body)]">
            Choose the tier that meets you where you are. Every membership
            includes community, content, and connection.
          </p>
          <div className="mt-8">
            <Link href="/overcomeher/membership">
              <Button variant="warm" size="lg">
                View Membership Tiers <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
