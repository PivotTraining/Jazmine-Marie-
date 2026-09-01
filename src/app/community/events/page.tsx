import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Users, Play, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents } from "@/lib/community-data";
import { MEMBERSHIP_TIERS } from "@/lib/constants";

// Member-specific content: never statically cache this page, or one
// member's dashboard could be served to another.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events — OvercomeHER Circle",
  description: "Upcoming and past events in the OvercomeHER Circle community.",
};

function tierLabel(tierId: string): string {
  return MEMBERSHIP_TIERS.find((t) => t.id === tierId)?.name ?? tierId;
}

const pastEvents = [
  {
    title: "The Power of Vulnerability Workshop",
    date: "March 15, 2026",
    type: "Workshop",
    hasRecording: true,
  },
  {
    title: "Monthly Gathering: Reclaiming Your Identity",
    date: "March 8, 2026",
    type: "Live Gathering",
    hasRecording: true,
  },
  {
    title: "The Recharge Method Teaching",
    date: "February 22, 2026",
    type: "Teaching",
    hasRecording: true,
  },
];

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents();

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
          <h1 className="text-3xl font-semibold text-white">Events & Live Sessions</h1>
          <p className="mt-2 text-warm-300 font-[family-name:var(--font-body)]">
            Upcoming gatherings, workshops, and intimate sessions.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <Section variant="warm" size="md">
        <h2 className="text-2xl font-semibold text-warm-800 mb-6">Upcoming Events</h2>
        {upcomingEvents.length === 0 && (
          <div className="p-8 rounded-2xl bg-white border border-warm-100 text-center">
            <Calendar className="h-10 w-10 text-warm-300 mx-auto mb-3" />
            <p className="text-warm-500 font-[family-name:var(--font-body)]">
              No events scheduled right now. Check back soon.
            </p>
          </div>
        )}
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="p-6 md:p-8 rounded-2xl bg-white border border-warm-100 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-blush-50 flex flex-col items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blush-400 mb-1" />
                  <span className="text-xs font-medium text-blush-500 font-[family-name:var(--font-body)]">
                    {event.date.split(",")[0].split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-plum-400 bg-plum-50 px-3 py-1 rounded-full font-[family-name:var(--font-body)]">
                      {event.type}
                    </span>
                    <span className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                      {tierLabel(event.tierRequired)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-warm-800">{event.title}</h3>
                  <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-warm-400 font-[family-name:var(--font-body)]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> Virtual (Zoom)
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link href="/community/rooms/events">
                    <Button variant="primary" size="md">
                      RSVP
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Past Events */}
      <Section variant="default" size="md">
        <h2 className="text-2xl font-semibold text-warm-800 mb-6">Past Events</h2>
        <div className="space-y-3">
          {pastEvents.map((event) => (
            <div
              key={event.title}
              className="p-5 rounded-xl bg-warm-50 border border-warm-100 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between"
            >
              <div>
                <h3 className="font-semibold text-warm-800">{event.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  <span>{event.date}</span>
                  <span>&middot;</span>
                  <span>{event.type}</span>
                </div>
              </div>
              {event.hasRecording && (
                <Link
                  href="/community/library"
                  className="flex items-center gap-2 text-sm text-blush-400 hover:text-blush-500 font-medium font-[family-name:var(--font-body)] flex-shrink-0"
                >
                  <Play className="h-4 w-4" /> Watch Replay
                </Link>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
