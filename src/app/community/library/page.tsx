import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  FileText,
  Headphones,
  Download,
  Search,
  Filter,
  Lock,
} from "lucide-react";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Resource Library — OvercomeHER Circle",
  description: "Access replays, worksheets, guides, and more inside the OvercomeHER resource library.",
};

const resources = [
  {
    title: "The Power of Vulnerability — Full Teaching",
    type: "video",
    tier: "transformher",
    date: "March 2026",
    duration: "52 min",
  },
  {
    title: "The Recharge Method Workshop",
    type: "video",
    tier: "transformher",
    date: "February 2026",
    duration: "45 min",
  },
  {
    title: "Healing Practices That Will Change Your Life",
    type: "video",
    tier: "nurturher",
    date: "January 2026",
    duration: "38 min",
  },
  {
    title: "Monthly Journaling Prompts — March",
    type: "worksheet",
    tier: "transformher",
    date: "March 2026",
    duration: "PDF",
  },
  {
    title: "Self-Trust Assessment Guide",
    type: "worksheet",
    tier: "nurturher",
    date: "February 2026",
    duration: "PDF",
  },
  {
    title: "Guided Meditation: Releasing Guilt",
    type: "audio",
    tier: "ascendher",
    date: "March 2026",
    duration: "18 min",
  },
  {
    title: "Overcoming Limiting Beliefs Workbook",
    type: "worksheet",
    tier: "transformher",
    date: "January 2026",
    duration: "PDF",
  },
  {
    title: "OvercomeHER Conference 2025 — Full Replay",
    type: "video",
    tier: "ascendher",
    date: "December 2025",
    duration: "3 hr 20 min",
  },
  {
    title: "Prayer & Affirmation Audio Set",
    type: "audio",
    tier: "nurturher",
    date: "November 2025",
    duration: "25 min",
  },
];

const typeIcons: Record<string, React.ElementType> = {
  video: Play,
  worksheet: FileText,
  audio: Headphones,
};

export default function LibraryPage() {
  return (
    <>
      <section className="bg-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-warm-300 hover:text-white transition-colors text-sm font-[family-name:var(--font-body)] mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-white">Resource Library</h1>
          <p className="mt-2 text-warm-300 font-[family-name:var(--font-body)]">
            Replays, worksheets, guides, and audio resources for your healing journey.
          </p>
        </div>
      </section>

      <Section variant="warm" size="md">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)]"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Videos", "Worksheets", "Audio"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-3 rounded-xl border border-warm-200 bg-white text-sm font-medium text-warm-600 hover:bg-warm-50 transition-colors font-[family-name:var(--font-body)]"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => {
            const Icon = typeIcons[resource.type] || FileText;
            const accessible = resource.tier !== "ascendher"; // Demo: TransformHER user
            return (
              <div
                key={resource.title}
                className={`p-6 rounded-2xl bg-white border border-warm-100 transition-all ${
                  accessible
                    ? "hover:shadow-md cursor-pointer"
                    : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      resource.type === "video"
                        ? "bg-blush-50"
                        : resource.type === "audio"
                          ? "bg-plum-50"
                          : "bg-sage-50"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        resource.type === "video"
                          ? "text-blush-400"
                          : resource.type === "audio"
                            ? "text-plum-400"
                            : "text-sage-400"
                      }`}
                    />
                  </div>
                  {!accessible && (
                    <Lock className="h-4 w-4 text-warm-300" />
                  )}
                </div>
                <h3 className="font-semibold text-warm-800 leading-snug">
                  {resource.title}
                </h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-warm-400 font-[family-name:var(--font-body)]">
                  <span className="uppercase tracking-wider">{resource.type}</span>
                  <span>&middot;</span>
                  <span>{resource.duration}</span>
                  <span>&middot;</span>
                  <span>{resource.date}</span>
                </div>
                {!accessible && (
                  <p className="mt-3 text-xs text-plum-400 font-[family-name:var(--font-body)]">
                    Upgrade to AscendHER to access
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
