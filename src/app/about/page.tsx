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
                  src={IMAGES.jazmineLaptopRed}
                  alt="Jazmine Marie"
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

      {/* Story */}
      <Section variant="default" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg font-[family-name:var(--font-body)] text-warm-600 leading-relaxed space-y-6">
              <p>
                I created OvercomeHER Circle because I am her. The woman who looked
                strong on the outside but was carrying way too much alone. The one who
                knew healing mattered — but didn&apos;t always have the structure, the
                support, or the safe space to make it happen.
              </p>
              <p>
                I&apos;ve spent years doing the inner work, studying healing, leading
                women, and creating spaces that don&apos;t just feel good — they create
                change. And what I&apos;ve learned is this: You don&apos;t need to hustle
                your way to healing. You don&apos;t need to do it all by yourself. You
                just need a space that holds you while you grow.
              </p>
              <p>
                That&apos;s what OvercomeHER is. A space for accountability, clarity,
                sisterhood, and softness — all in one. I&apos;m still on this journey
                too. But I&apos;m not walking it alone anymore — and you don&apos;t have
                to either.
              </p>
              <p>
                Jazmine Marie Davis is an educator, mentor, and emotional wellness
                advocate with a Bachelor&apos;s in Human Development and Family Science
                and a Master&apos;s in Education focused on Culturally Relevant Pedagogy.
                She is the founder of OvercomeHER, a healing-centered women&apos;s
                community, and co-founder of PIVOT, a mental wellness training company.
              </p>
              <p>
                As a mom of three, Jazmine is passionate about creating safe spaces for
                women to develop confidence, character, and wholeness. She specializes
                in identity, emotional intelligence, boundaries, and self-care — and has
                led impactful sessions in schools, nonprofits, and corporate spaces.
              </p>
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

      {/* Photo Gallery */}
      <Section variant="default" size="md">
        <AnimateOnScroll animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: IMAGES.eventRoom, alt: "Conference ballroom event" },
              { src: IMAGES.eventWorkshop, alt: "Workshop with women" },
              { src: IMAGES.jazmineShameTalk, alt: "Jazmine presenting on overcoming shame" },
              { src: IMAGES.eventWomenMeeting, alt: "Women at OvercomeHER meeting" },
              { src: IMAGES.jazmineSpeakingBlue, alt: "Jazmine speaking at event" },
              { src: IMAGES.womenEmbrace, alt: "Women embracing" },
              { src: IMAGES.womenCircle, alt: "Women in circle gathering" },
            ].map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
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
