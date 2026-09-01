import { COMMUNITY_ROOMS } from "./constants";
import { isSupabaseConfigured } from "./auth";

export interface Room { name: string; slug: string; description: string; type: string; tierRequired: string; icon: string; }
export interface Post { id: string; authorName: string; authorInitials: string; timeAgo: string; pinned: boolean; title: string; content: string; likes: number; comments: number; }
export interface CommunityEvent { id: string; title: string; description: string; date: string; time: string; type: string; tierRequired: string; }

function initialsFrom(name: string): string {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function timeAgo(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export async function getRooms(): Promise<Room[]> {
  const fallback = COMMUNITY_ROOMS.map((r) => ({ ...r })) as Room[];
  if (!isSupabaseConfigured()) return fallback;
  try {
    const { getServerSupabase } = await import("./supabase");
    const { data, error } = await getServerSupabase().from("rooms")
      .select("name, slug, description, type, tier_required, icon")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallback;
    return data.map((r) => ({ name: r.name, slug: r.slug, description: r.description, type: r.type, tierRequired: r.tier_required, icon: r.icon }));
  } catch { return fallback; }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  return (await getRooms()).find((r) => r.slug === slug) ?? null;
}

export async function getPosts(roomSlug: string): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { getServerSupabase } = await import("./supabase");
    const supabase = getServerSupabase();
    const { data: room } = await supabase.from("rooms").select("id").eq("slug", roomSlug).maybeSingle();
    if (!room) return [];
    const { data, error } = await supabase.from("posts")
      .select("id, title, content, pinned, created_at, profiles(full_name)")
      .eq("room_id", room.id).order("pinned", { ascending: false }).order("created_at", { ascending: false }).limit(50);
    if (error || !data) return [];
    return data.map((p) => {
      const profile = p.profiles as unknown as { full_name?: string } | null;
      const authorName = profile?.full_name || "Member";
      return { id: p.id, authorName, authorInitials: initialsFrom(authorName), timeAgo: timeAgo(p.created_at), pinned: p.pinned, title: p.title ?? "", content: p.content, likes: 0, comments: 0 };
    });
  } catch { return []; }
}

export async function getUpcomingEvents(): Promise<CommunityEvent[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { getServerSupabase } = await import("./supabase");
    const { data, error } = await getServerSupabase().from("events")
      .select("id, title, description, date, type, tier_required")
      .gte("date", new Date().toISOString()).order("date", { ascending: true }).limit(10);
    if (error || !data) return [];
    return data.map((e) => {
      const when = new Date(e.date);
      return { id: e.id, title: e.title, description: e.description, date: when.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), time: when.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" }), type: e.type, tierRequired: e.tier_required };
    });
  } catch { return []; }
}
