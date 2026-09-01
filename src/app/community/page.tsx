import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  BookOpen,
  MessageCircle,
  Calendar,
  Users,
  Play,
  Sparkles,
  ArrowRight,
  Megaphone,
  BookMarked,
  HandHeart,
  Lock,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { getCurrentUser, getCurrentMembership, tierAllows } from "@/lib/auth";
import { getRooms, getUpcomingEvents } from "@/lib/community-data";
import { MEMBERSHIP_TIERS } from "@/lib/constants";

// Member-specific content: never statically cache this page, or one
// member's dashboard could be served to another.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community Dashboard — OvercomeHER Circle",
  description: "Your OvercomeHER Circle community dashboard.",
};

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Sparkles,
  HandHeart,
  BookOpen,
  MessageCircle,
  BookMarked,
  Play,
  Users,
  Megaphone,
  Calendar,
};

function tierLabel(tierId: string): string {
  return MEMBERSHIP_TIERS.find((t) => t.id === tierId)?.name ?? tierId;
}

export default async function CommunityDashboard() {
  const user = await getCurrentUser();
  const membership = user ? await getCurrentMembership(user.id) : null;
  const [rooms, events] = await Promise.all([getRooms(), getUpcomingEvents()]);

  // Demo mode (no Supabase yet) previews the TransformHER experience so the
  // dashboard is reviewable before the database is connected.
  const activeTierId = membership?.tierId ?? "transformher";
  const activeTierName = membership?.tierName ?? tierLabel(activeTierId);

  const accessibleRooms = rooms.filter((r) =>
    tierAllows(activeTierId, r.tierRequired)
  );

  const firstName = user?.fullName?.split(" ")[0];

  return (
    <>
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-blush-300 font-[family-name:var(--font-body)] text-sm">
                {firstName ? `Welcome back, ${firstName}` : "Welcome back to"}
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-white">
                OvercomeHER Circle
              </h1>
              <p className="mt-1 text-warm-300 font-[family-name:var(--font-body)]">
                You&apos;re in the{" "}
                <span className="text-blush-300 font-medium">
                  {activeTierName}
                </span>{" "}
                tier
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/community/profile"
                className="px-5 py-2.5 rounded-full bg-warm-700 text-warm-200 hover:bg-warm-600 transition-colors text-sm font-medium font-[family-name:var(--font-body)]"
              >
                My Profile
              </Link>
              <Link
                href="/community/events"
                className="px-5 py-2.5 rounded-full bg-blush-400 text-white hover:bg-blush-500 transition-colors text-sm font-medium font-[family-name:var(--font-body)] flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" /> Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <Section variant="warm" size="sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Rooms Available",
              value: String(accessibleRooms.length),
              icon: MessageCircle,
            },
            {
              label: "Upcoming Events",
              value: String(events.length),
              icon: Calendar,
            },
            {
              label: "Your Tier",
              value: activeTierName,
              icon: Sparkles,
            },
            {
              label: "Total Rooms",
              value: String(rooms.length),
              icon: BookOpen,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-white border border-warm-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-plum-50 flex items-center justify-center flex-shrink-0">
                <stat.icon className="h-5 w-5 text-plum-400" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-warm-800 truncate">
                  {stat.value}
                </p>
                <p className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Community Rooms Grid */}
      <Section variant="default" size="md">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-warm-800">Your Rooms</h2>
          <span className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
            {activeTierName} tier access
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => {
            const Icon = iconMap[room.icon] || MessageCircle;
            const accessible = tierAllows(activeTierId, room.tierRequired);
            return accessible ? (
              <Link
                key={room.slug}
                href={`/community/rooms/${room.slug}`}
                className="group p-6 rounded-2xl border bg-white border-warm-100 hover:shadow-md hover:border-blush-200 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-plum-50 flex items-center justify-center group-hover:bg-plum-100 transition-colors">
                  <Icon className="h-6 w-6 text-plum-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-warm-800 group-hover:text-warm-900">
                  {room.name}
                </h3>
                <p className="mt-1 text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  {room.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-blush-400 font-medium font-[family-name:var(--font-body)]">
                  Enter room <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ) : (
              <Link
                key={room.slug}
                href="/overcomeher/membership"
                className="group p-6 rounded-2xl border bg-warm-50 border-warm-100 hover:border-blush-200 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-warm-100 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-warm-400" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-warm-500 bg-warm-100 px-2 py-1 rounded-full font-[family-name:var(--font-body)]">
                    {tierLabel(room.tierRequired)}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-warm-600">
                  {room.name}
                </h3>
                <p className="mt-1 text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  {room.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-plum-400 font-medium font-[family-name:var(--font-body)]">
                  Upgrade to unlock <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Upcoming Events */}
      <Section variant="warm" size="md">
        <h2 className="text-2xl font-semibold text-warm-800 mb-6">
          Upcoming Events
        </h2>
        {events.length === 0 ? (
          <div className="p-8 rounded-xl bg-white border border-warm-100 text-center">
            <Calendar className="h-10 w-10 text-warm-300 mx-auto mb-3" />
            <p className="text-warm-500 font-[family-name:var(--font-body)]">
              No events scheduled right now. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-5 rounded-xl bg-white border border-warm-100 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blush-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-blush-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-800">
                      {event.title}
                    </h3>
                    <p className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
                      {event.date} at {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-shrink-0">
                  <span className="text-xs font-medium text-plum-400 bg-plum-50 px-3 py-1 rounded-full font-[family-name:var(--font-body)]">
                    {event.type}
                  </span>
                  <span className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                    {tierLabel(event.tierRequired)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
