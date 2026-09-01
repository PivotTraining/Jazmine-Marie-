import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, MessageSquare, Pin, Lock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getCurrentMembership, tierAllows } from "@/lib/auth";
import { getRoomBySlug, getPosts } from "@/lib/community-data";
import { MEMBERSHIP_TIERS } from "@/lib/constants";

// Member-specific content: never statically cache this page, or one
// member's dashboard could be served to another.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  return {
    title: room ? `${room.name} — OvercomeHER Circle` : "Community Room",
  };
}

function tierLabel(tierId: string): string {
  return MEMBERSHIP_TIERS.find((t) => t.id === tierId)?.name ?? tierId;
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) notFound();

  const user = await getCurrentUser();
  const membership = user ? await getCurrentMembership(user.id) : null;
  const activeTierId = membership?.tierId ?? "transformher";

  // Tier gate — a member who lands on a room above their tier gets an
  // upgrade prompt rather than the room contents.
  if (!tierAllows(activeTierId, room.tierRequired)) {
    return (
      <Section variant="warm" size="lg">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-warm-400" />
          </div>
          <h1 className="text-3xl font-semibold text-warm-900">{room.name}</h1>
          <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)]">
            This room is part of the{" "}
            <span className="font-medium text-plum-400">
              {tierLabel(room.tierRequired)}
            </span>{" "}
            tier. Upgrade to join the conversation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/overcomeher/membership">
              <Button variant="primary" size="lg">
                View Membership Options
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="lg">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  const posts = await getPosts(slug);

  return (
    <>
      {/* Room Header */}
      <section className="bg-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-warm-300 hover:text-white transition-colors text-sm font-[family-name:var(--font-body)] mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-white">{room.name}</h1>
          <p className="mt-2 text-warm-300 font-[family-name:var(--font-body)]">
            {room.description}
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm text-warm-400 font-[family-name:var(--font-body)]">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              {posts.length} {posts.length === 1 ? "discussion" : "discussions"}
            </span>
          </div>
        </div>
      </section>

      {/* Discussion Feed */}
      <Section variant="warm" size="md">
        {/* New Post */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-warm-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-blush-500 font-[family-name:var(--font-body)]">
                {user?.fullName
                  ? user.fullName
                      .split(" ")
                      .slice(0, 2)
                      .map((p) => p[0]?.toUpperCase())
                      .join("")
                  : "YOU"}
              </span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share what's on your heart..."
                rows={3}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-200 text-warm-800 placeholder:text-warm-300 font-[family-name:var(--font-body)] resize-none disabled:opacity-70"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                  Posting opens once the community launches.
                </p>
                <Button variant="primary" size="sm" disabled>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white border border-warm-100 text-center">
            <MessageSquare className="h-10 w-10 text-warm-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-warm-700">
              No conversations yet
            </h3>
            <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)]">
              This room is ready and waiting. Be the first to share something
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`p-6 rounded-2xl bg-white border ${
                  post.pinned
                    ? "border-blush-200 ring-1 ring-blush-100"
                    : "border-warm-100"
                }`}
              >
                {post.pinned && (
                  <div className="flex items-center gap-1.5 text-xs text-blush-400 font-medium font-[family-name:var(--font-body)] mb-3">
                    <Pin className="h-3 w-3" /> Pinned by Jazmine
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-plum-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-plum-500 font-[family-name:var(--font-body)]">
                      {post.authorInitials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800 text-sm font-[family-name:var(--font-body)]">
                      {post.authorName}
                    </p>
                    <p className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                      {post.timeAgo}
                    </p>
                  </div>
                </div>

                {post.title && (
                  <h3 className="mt-3 text-lg font-semibold text-warm-800">
                    {post.title}
                  </h3>
                )}

                <p className="mt-2 text-warm-600 leading-relaxed font-[family-name:var(--font-body)]">
                  {post.content}
                </p>

                <div className="mt-4 pt-3 border-t border-warm-100 flex items-center gap-6 text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" /> {post.comments}{" "}
                    {post.comments === 1 ? "reply" : "replies"}
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
