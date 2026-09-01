import { COMMUNITY_ROOMS } from "./constants";
import { isSupabaseConfigured } from "./auth";

export interface Room {
  name: string;
  slug: string;
  description: string;
  type: string;
  tierRequired: string;
  icon: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorInitials: string;
  timeAgo: string;
  pinned: boolean;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  tierRequired: string;
}

function initialsFrom(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const minutes = Math.floor((Date.now() - then) / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;

  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Community rooms. Falls back to the constants list when Supabase isn't
 * configured or the rooms table hasn't been seeded yet.
 */
export async function getRooms(): Promise<Room[]> {
  const fallback: Room[] = COMMUNITY_ROOMS.map((r) => ({
    name: r.name,
    slug: r.slug,
    description: r.description,
    type: r.type,
    tierRequired: r.tierRequired,
    icon: r.icon,
  }));

  if (!isSupabaseConfigured()) return fallback;

  try {
    const { getServerSupabase } = await import("./supabase");
    const { data, error } = await getServerSupabase()
      .from("rooms")
      .select("name, slug, description, type, tier_required, icon")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return fallback;

    return data.map((r) => ({
      name: r.name,
      slug: r.slug,
      description: r.description,
      type: r.type,
      tierRequired: r.tier_required,
      icon: r.icon,
    }));
  } catch {
    return fallback;
  }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find((r) => r.slug === slug) ?? null;
}

/**
 * Posts in a room.
 *
 * In demo mode (no Supabase) this returns sample posts so the page reads
 * as a real community. Once Supabase is connected it returns actual posts —
 * including an empty array when nobody has posted yet, so members see a
 * genuine empty state rather than fake conversation.
 */
export async function getPosts(roomSlug: string): Promise<Post[]> {
  if (!isSupabaseConfigured()) return DEMO_POSTS;

  try {
    const { getServerSupabase } = await import("./supabase");
    const supabase = getServerSupabase();

    const { data: room } = await supabase
      .from("rooms")
      .select("id")
      .eq("slug", roomSlug)
      .maybeSingle();

    if (!room) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, pinned, created_at, profiles(full_name)")
      .eq("room_id", room.id)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) return [];

    return data.map((p) => {
      const profile = p.profiles as unknown as { full_name?: string } | null;
      const authorName = profile?.full_name || "Member";
      return {
        id: p.id,
        authorName,
        authorInitials: initialsFrom(authorName),
        timeAgo: timeAgo(p.created_at),
        pinned: p.pinned,
        title: p.title ?? "",
        content: p.content,
        likes: 0,
        comments: 0,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Upcoming events, soonest first. Demo events when Supabase isn't configured.
 */
export async function getUpcomingEvents(): Promise<CommunityEvent[]> {
  if (!isSupabaseConfigured()) return DEMO_EVENTS;

  try {
    const { getServerSupabase } = await import("./supabase");
    const { data, error } = await getServerSupabase()
      .from("events")
      .select("id, title, description, date, type, tier_required")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .limit(10);

    if (error || !data) return [];

    return data.map((e) => {
      const when = new Date(e.date);
      return {
        id: e.id,
        title: e.title,
        description: e.description,
        date: when.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        time: when.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          timeZoneName: "short",
        }),
        type: e.type,
        tierRequired: e.tier_required,
      };
    });
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Demo content — shown only when Supabase isn't configured, so the community
// area is reviewable before the database is connected. See SETUP.md.
// ---------------------------------------------------------------------------

const DEMO_POSTS: Post[] = [
  {
    id: "demo-1",
    authorName: "Jazmine Marie",
    authorInitials: "JM",
    timeAgo: "2 hours ago",
    pinned: true,
    title: "Welcome to this month's theme: The Art of Letting Go",
    content:
      "This month we're diving deep into what it means to release — the guilt, the expectations, the need to control. I want to start by asking: What are you holding onto that you know isn't serving you anymore? Share below. This is a safe space.",
    likes: 24,
    comments: 18,
  },
  {
    id: "demo-2",
    authorName: "Tasha M.",
    authorInitials: "TM",
    timeAgo: "5 hours ago",
    pinned: false,
    title: "",
    content:
      "I've been journaling with this month's prompts and I realized I've been holding onto anger at my mother for almost 15 years. Not explosive anger — quiet, low-simmering resentment that shows up in how I parent my own kids. Writing it down made it real. And honestly? That's terrifying. But also freeing.",
    likes: 31,
    comments: 12,
  },
  {
    id: "demo-3",
    authorName: "Morgan D.",
    authorInitials: "MD",
    timeAgo: "Yesterday",
    pinned: false,
    title: "",
    content:
      "Can we talk about how hard it is to let go of the version of yourself you thought you'd be by now? I'm 34 and nothing looks like I planned. And I'm learning that's not failure — it's redirection. But some days it still stings.",
    likes: 45,
    comments: 22,
  },
];

const DEMO_EVENTS: CommunityEvent[] = [
  {
    id: "demo-e1",
    title: "Monthly Gathering: The Art of Letting Go",
    description:
      "This month we explore what it means to release — the guilt, the control, the old stories. Join Jazmine for an intimate evening of teaching, journaling, and prayer.",
    date: "April 12, 2026",
    time: "7:00 PM EST",
    type: "Live Workshop",
    tierRequired: "nurturher",
  },
  {
    id: "demo-e2",
    title: "Book Club: Chapter 4-6 Discussion",
    description:
      "We're reading through our current selection together. Come ready to share what's resonating and what's challenging you.",
    date: "April 18, 2026",
    time: "8:00 PM EST",
    type: "Book Club",
    tierRequired: "transformher",
  },
  {
    id: "demo-e3",
    title: "Healing Circle: Processing Grief & Loss",
    description:
      "An intimate, facilitated space for processing grief and loss. Limited to 12 women for deep, personal conversation.",
    date: "April 25, 2026",
    time: "6:30 PM EST",
    type: "Small Group",
    tierRequired: "ascendher",
  },
];
