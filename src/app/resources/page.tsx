import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Resources",
  description: "Practical tools from Jazmine Marie for self-trust, reflection, emotional wellness, and personal growth.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-warm-50"><div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8 text-center"><p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-medium">Resources</p><h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900">Start with something <span className="italic text-blush-400">useful</span></h1><p className="mt-6 max-w-2xl mx-auto text-lg text-warm-500">No placeholder downloads. No dead-end articles. Begin with the Healing Style Quiz, then use your result to choose the support that fits you.</p></div></section>
      <Section variant="default" size="lg"><div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"><div className="p-8 rounded-3xl bg-warm-50 border border-warm-100"><Sparkles className="h-8 w-8 text-blush-400"/><h2 className="mt-4 text-2xl font-semibold text-warm-900">Healing Style Quiz</h2><p className="mt-3 text-warm-500">A reflective, non-diagnostic self-discovery tool that helps you identify how you tend to process difficult experiences and personal growth.</p><Link href="/healing-style-quiz" className="inline-block mt-6"><Button variant="primary">Take the quiz <ArrowRight className="h-4 w-4"/></Button></Link></div><div className="p-8 rounded-3xl bg-white border border-warm-200"><BookOpen className="h-8 w-8 text-plum-400"/><h2 className="mt-4 text-2xl font-semibold text-warm-900">Member Resource Library</h2><p className="mt-3 text-warm-500">Guided prompts, conversations, replays, and deeper tools live inside OvercomeHER Circle. Access depends on your membership tier.</p><Link href="/overcomeher/membership" className="inline-flex items-center gap-2 mt-6 text-blush-500 font-medium">Explore membership <ArrowRight className="h-4 w-4"/></Link></div></div></Section>
    </>
  );
}
