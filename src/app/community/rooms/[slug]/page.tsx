import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Send,
  Pin,
  MoreHorizontal,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { COMMUNITY_ROOMS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = COMMUNITY_ROOMS.find((r) => r.slug === slug);
  return {
    title: room ? `${room.name} — OvercomeHER Circle` : "Community Room",
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = COMMUNITY_ROOMS.find((r) => r.slug === slug);

  if (!room) {
    return (
      <Section variant="default" size="lg">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-warm-800">Room not found</h1>
          <Link href="/community" className="mt-4 inline-block text-blush-400 hover:text-blush-500 font-[family-name:var(--font-body)]">
            Back to dashboard
          </Link>
        </div>
      </Section>
    );
  }

  // Sample posts for demonstration
  const samplePosts = [
    {
      id: "1",
      author: "Jazmine Marie",
      avatar: "JM",
      time: "2 hours ago",
      pinned: true,
      title: "Welcome to this month's theme: The Art of Letting Go",
      content:
        "This month we're diving deep into what it means to release — the guilt, the expectations, the need to control. I want to start by asking: What are you holding onto that you know isn't serving you anymore? Share below. This is a safe space.",
      likes: 24,
      comments: 18,
    },
    {
      id: "2",
      author: "Tasha M.",
      avatar: "TM",
      time: "5 hours ago",
      pinned: false,
      title: "",
      content:
        "I've been journaling with this month's prompts and I realized I've been holding onto anger at my mother for almost 15 years. Not explosive anger — quiet, low-simmering resentment that shows up in how I parent my own kids. Writing it down made it real. And honestly? That's terrifying. But also freeing.",
      likes: 31,
      comments: 12,
    },
    {
      id: "3",
      author: "Morgan D.",
      avatar: "MD",
      time: "Yesterday",
      pinned: false,
      title: "",
      content:
        "Can we talk about how hard it is to let go of the version of yourself you thought you'd be by now? I'm 34 and nothing looks like I planned. And I'm learning that's not failure — it's redirection. But some days it still stings.",
      likes: 45,
      comments: 22,
    },
  ];

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
              <MessageSquare className="h-4 w-4" /> 47 discussions
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" /> 234 members active
            </span>
          </div>
        </div>
      </section>

      {/* Discussion Feed */}
      <Section variant="warm" size="md">
        {/* New Post Input */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-warm-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-blush-500 font-[family-name:var(--font-body)]">
                YO
              </span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Share what's on your heart..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-warm-50 border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)] resize-none"
              />
              <div className="mt-3 flex justify-end">
                <button className="px-5 py-2 rounded-full bg-warm-800 text-white hover:bg-warm-900 transition-colors text-sm font-medium font-[family-name:var(--font-body)] flex items-center gap-2">
                  <Send className="h-4 w-4" /> Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {samplePosts.map((post) => (
            <div
              key={post.id}
              className={`p-6 rounded-2xl bg-white border ${
                post.pinned ? "border-blush-200 ring-1 ring-blush-100" : "border-warm-100"
              }`}
            >
              {post.pinned && (
                <div className="flex items-center gap-1.5 text-xs text-blush-400 font-medium font-[family-name:var(--font-body)] mb-3">
                  <Pin className="h-3 w-3" /> Pinned by Jazmine
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-plum-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-plum-500 font-[family-name:var(--font-body)]">
                      {post.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800 text-sm font-[family-name:var(--font-body)]">
                      {post.author}
                    </p>
                    <p className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                      {post.time}
                    </p>
                  </div>
                </div>
                <button className="text-warm-300 hover:text-warm-500">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
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
                <button className="flex items-center gap-1.5 hover:text-blush-400 transition-colors">
                  <Heart className="h-4 w-4" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-plum-400 transition-colors">
                  <MessageSquare className="h-4 w-4" /> {post.comments} replies
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
