import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles, BookOpen, Users, Mic } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Jazmine Marie",
  description:
    "Meet Jazmine Marie — a host, speaker, and women's wellness voice helping women heal, grow, and step into wholeness.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-warm-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
                My Story
              </p>
              <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900 leading-tight">
                I know what it feels like to{" "}
                <span className="italic text-blush-400">carry it all</span>
              </h1>
              <p className="mt-6 text-lg text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
                I&apos;m Jazmine Marie — a woman who had to learn the hard way that
                being strong and being whole are not the same thing.
              </p>
            </div>
            {/* Photo placeholder */}
            <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-blush-100 via-warm-100 to-plum-100 flex items-center justify-center shadow-xl">
              <div className="text-center p-8">
                <Heart className="h-20 w-20 text-warm-400 mx-auto mb-4" />
                <p className="text-warm-400 text-sm font-[family-name:var(--font-body)]">
                  Jazmine Marie photo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section variant="default" size="lg">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg font-[family-name:var(--font-body)] text-warm-600 leading-relaxed space-y-6">
            <p>
              For years, I was the woman who held everything together — the marriage,
              the motherhood, the career, the friendships, the faith. And I did it
              well. From the outside, it looked like I had it all figured out. But
              inside? I was exhausted. Disconnected. Running on fumes and calling it
              strength.
            </p>
            <p>
              My healing journey didn&apos;t start with a breakthrough. It started with a
              breakdown. The kind that forces you to ask the questions you&apos;ve been
              avoiding: <em>Who am I when I stop performing? What am I carrying that was
              never mine to hold? Where did I lose myself — and can I find her again?</em>
            </p>
            <p>
              That journey led me to do the deep work — therapy, journaling,
              faith-based healing, and community. And what I discovered changed
              everything: <strong>wholeness isn&apos;t something you achieve. It&apos;s something
              you become, one brave choice at a time.</strong>
            </p>
            <p>
              I started sharing my story because I realized I wasn&apos;t the only one.
              There were women everywhere — mothers, wives, leaders, caregivers —
              who were carrying so much internally that they&apos;d forgotten what it
              felt like to breathe. To be soft. To be honest. To ask for help.
            </p>
            <p>
              That&apos;s why I created OvercomeHER Circle — a space where women don&apos;t
              have to perform. Where healing is the point, not the side effect.
              Where we do the work together, and we hold each other up while we
              do it.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            What I Believe
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            The values that guide{" "}
            <span className="italic text-blush-400">everything</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Healing Is the Work",
              description:
                "Real growth requires going inward. I believe in doing the deep, honest, sometimes uncomfortable work of healing — not bypassing it with positivity.",
            },
            {
              icon: Users,
              title: "Community Over Isolation",
              description:
                "We weren't made to heal alone. The women around us become mirrors, anchors, and witnesses to our becoming. Sisterhood is sacred.",
            },
            {
              icon: Sparkles,
              title: "Wholeness Changes Everything",
              description:
                "When a woman becomes whole, it ripples — into her family, her purpose, her confidence, and her legacy. Wholeness isn't selfish. It's essential.",
            },
            {
              icon: BookOpen,
              title: "Faith & Depth",
              description:
                "My work is spiritually grounded and emotionally intelligent. I believe in both the power of prayer and the power of therapy. Both are holy.",
            },
            {
              icon: Mic,
              title: "Honest Conversations",
              description:
                "I don't do surface-level. I believe in saying the real thing, naming the hard thing, and making space for women to do the same.",
            },
            {
              icon: Sparkles,
              title: "Beauty in Becoming",
              description:
                "The journey matters as much as the destination. I celebrate where you are now while holding space for who you're becoming.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300"
            >
              <value.icon className="h-8 w-8 text-blush-400" />
              <h3 className="mt-4 text-xl font-semibold text-warm-800">
                {value.title}
              </h3>
              <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Photo Gallery Placeholder */}
      <Section variant="default" size="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gradient-to-br from-warm-100 to-blush-100 flex items-center justify-center"
            >
              <p className="text-warm-400 text-sm font-[family-name:var(--font-body)]">
                Gallery Photo {i}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="warm" size="lg">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-warm-900">
            Ready to <span className="italic text-blush-400">connect</span>?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-warm-500 font-[family-name:var(--font-body)]">
            Whether you want to join the OvercomeHER community or book me for
            your next event, I&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/overcomeher">
              <Button variant="primary" size="lg">
                Join OvercomeHER <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/speaking">
              <Button variant="outline" size="lg">
                Book Me to Speak
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
