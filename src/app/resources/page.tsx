import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  BookOpen,
  Download,
  Headphones,
  FileText,
  Play,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Free resources from Jazmine Marie — guides, worksheets, and content to support your healing journey.",
};

const freeResources = [
  {
    title: "5 Journaling Prompts for Women Who Are Ready to Heal",
    description:
      "Start your healing journey with these powerful prompts designed to help you reconnect with yourself.",
    type: "PDF Guide",
    icon: FileText,
    color: "sage",
  },
  {
    title: "The Self-Trust Assessment",
    description:
      "A simple but honest assessment to help you understand where you are in your relationship with yourself.",
    type: "Worksheet",
    icon: BookOpen,
    color: "plum",
  },
  {
    title: "Morning Affirmations for Mothers",
    description:
      "Seven days of affirmations designed for the mother who needs to remember she matters too.",
    type: "Audio",
    icon: Headphones,
    color: "blush",
  },
  {
    title: "What Does Wholeness Actually Mean?",
    description:
      "A short teaching on what wholeness is, what it isn't, and why it changes everything.",
    type: "Video",
    icon: Play,
    color: "warm",
  },
];

const blogPosts = [
  {
    title: "Why 'Strong Women' Still Need Healing",
    excerpt:
      "Strength and wholeness are not the same thing. Here's what I learned when I stopped performing strength and started pursuing healing.",
    date: "March 22, 2026",
    readTime: "6 min read",
  },
  {
    title: "The Guilt That Mothers Carry (And How to Start Releasing It)",
    excerpt:
      "If you've ever felt guilty for needing space, rest, or help — this one is for you. Motherhood was never meant to be carried alone.",
    date: "March 10, 2026",
    readTime: "8 min read",
  },
  {
    title: "3 Signs You're Healing (Even When It Doesn't Feel Like It)",
    excerpt:
      "Healing doesn't always look like breakthroughs. Sometimes it looks like boundaries. Sometimes it looks like tears. Here's how to know the work is working.",
    date: "February 28, 2026",
    readTime: "5 min read",
  },
  {
    title: "What I Wish Someone Told Me About Vulnerability",
    excerpt:
      "Vulnerability isn't weakness. It's the most courageous thing a woman can practice. Here's why I stopped hiding and what happened when I did.",
    date: "February 14, 2026",
    readTime: "7 min read",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-warm-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Free Resources
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900 leading-tight">
            Tools for your{" "}
            <span className="italic text-blush-400">healing journey</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-500 font-[family-name:var(--font-body)]">
            Start here. These free resources are designed to meet you wherever
            you are — no membership required.
          </p>
        </div>
      </section>

      {/* Free Downloads */}
      <Section variant="default" size="lg">
        <div className="grid sm:grid-cols-2 gap-6">
          {freeResources.map((resource) => (
            <Link
              key={resource.title}
              href="/overcomeher"
              className="group block p-6 rounded-2xl bg-warm-50 border border-warm-100 hover:bg-white hover:shadow-md hover:border-blush-200 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow">
                  <resource.icon className="h-7 w-7 text-blush-400" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium uppercase tracking-wider text-plum-400 font-[family-name:var(--font-body)]">
                    {resource.type}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-warm-800 group-hover:text-warm-900">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-blush-400 font-medium font-[family-name:var(--font-body)]">
                    <Download className="h-4 w-4" /> Download Free
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Blog / Articles */}
      <Section variant="warm" size="lg">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            From the Heart
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            Recent <span className="italic text-blush-400">writings</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              href="/overcomeher"
              className="group block p-6 rounded-2xl bg-white border border-warm-100 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs text-warm-400 font-[family-name:var(--font-body)] mb-3">
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-warm-800 group-hover:text-warm-900 leading-snug">
                {post.title}
              </h3>
              <p className="mt-3 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm text-blush-400 font-medium font-[family-name:var(--font-body)]">
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Want <span className="italic text-blush-300">more</span>?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-warm-300 font-[family-name:var(--font-body)]">
            Join the OvercomeHER Circle for full access to workshops, replays,
            journaling rooms, a healing-centered community, and so much more.
          </p>
          <div className="mt-8">
            <Link href="/overcomeher">
              <Button variant="warm" size="lg">
                Explore OvercomeHER <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
