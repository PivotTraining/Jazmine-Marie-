import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, Sparkles, BookOpen, Users, Mic } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { IMAGES } from "@/lib/constants";

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
            <AnimateOnScroll animation="fade-up">
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
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={IMAGES.jazmineAboutHero}
                  alt="Jazmine Marie by the lake"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Why I Created OvercomeHER */}
      <Section variant="default" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-warm-900 mb-8">
              Why I Created OvercomeHER
            </h2>
            <div className="font-[family-name:var(--font-body)] text-warm-600 leading-relaxed text-lg space-y-6">
              <p>I created OvercomeHER because I am her.</p>
              <p>
                The woman who looked strong on the outside&hellip;<br />
                but was carrying more than she ever said out loud.
              </p>
              <p>
                The one who knew healing mattered&mdash;<br />
                but didn&apos;t always have the space, the language, or the support to actually do it.
              </p>
              <p>
                I&apos;ve had to face my own patterns.<br />
                My own beliefs.<br />
                The parts of me that were shaped by things I didn&apos;t fully understand at the time.
              </p>
              <p>And through that process, I realized something:</p>
              <p>
                A lot of what we carry&hellip;<br />
                we were never meant to carry alone.
              </p>
              <p>
                OvercomeHER was created to be the kind of space I needed.<br />
                A space where women can be honest about where they are,<br />
                begin to understand themselves more deeply,<br />
                and do the work that leads to real, lasting growth.
              </p>
              <p>
                Not perfectly.<br />
                But intentionally.
              </p>
              <p>
                I&apos;m still on that journey too.<br />
                But I&apos;ve learned that healing doesn&apos;t require you to have it all together&mdash;<br />
                it just requires you to be willing.
              </p>
              <p>And you don&apos;t have to do it by yourself.</p>
            </div>

            <div className="mt-16 pt-16 border-t border-warm-200">
              <h2 className="text-3xl md:text-4xl font-semibold text-warm-900 mb-8">
                About Jazmine
              </h2>
              <div className="font-[family-name:var(--font-body)] text-warm-600 leading-relaxed text-lg space-y-6">
                <p>
                  Jazmine Marie Davis is an educator, mentor, and emotional wellness advocate who is deeply committed to helping women become more whole.
                </p>
                <p>
                  She holds a Bachelor&apos;s degree in Human Development and Family Science and a Master&apos;s in Education with a focus on Culturally Relevant Pedagogy.
                </p>
                <p>
                  She is the founder of OvercomeHER, a healing-centered women&apos;s community, and co-founder of PIVOT, a mental wellness training company that serves schools, organizations, and communities.
                </p>
                <p>
                  As a wife and mother of three, Jazmine understands the weight women carry&mdash;and the importance of doing the inner work, not just for themselves, but for the lives they impact.
                </p>
                <p>
                  Her work focuses on identity, emotional intelligence, boundaries, and self-awareness, helping women recognize their patterns, shift their thinking, and grow into stronger, more grounded versions of themselves.
                </p>
                <p>
                  Through speaking, teaching, and community, Jazmine creates spaces that don&apos;t just feel good in the moment&mdash;<br />
                  they challenge, support, and lead to real change.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      {/* Values */}
      <Section variant="warm" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              What I Believe
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
              The values that guide{" "}
              <span className="italic text-blush-400">everything</span>
            </h2>
          </div>
        </AnimateOnScroll>
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
          ].map((value, index) => (
            <AnimateOnScroll key={value.title} animation="fade-up" delay={index * 100}>
              <div className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300">
                <value.icon className="h-8 w-8 text-blush-400" />
                <h3 className="mt-4 text-xl font-semibold text-warm-800">
                  {value.title}
                </h3>
                <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      {/* Videos */}
      <Section variant="default" size="md">
        <AnimateOnScroll animation="fade-up">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.youtube.com/embed/JKfwDnV_k90"
                title="OvercomeHER — Jazmine Marie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.youtube.com/embed/h-mw5Qb0Oyc"
                title="OvercomeHER — Jazmine Marie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </AnimateOnScroll>
      </Section>

      {/* CTA */}
      <Section variant="warm" size="lg">
        <AnimateOnScroll animation="fade-up">
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
        </AnimateOnScroll>
      </Section>
    </>
  );
}
