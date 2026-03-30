import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, result, answers, scores } = body;

    if (!firstName || !email || !result) {
      return NextResponse.json(
        { error: "First name, email, and result are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get referrer/source
    const source = request.headers.get("referer") || "direct";

    try {
      const { getServerSupabase } = await import("@/lib/supabase");
      const supabase = getServerSupabase();

      // Save quiz submission
      await supabase.from("quiz_submissions").insert({
        first_name: firstName,
        email,
        result,
        answers,
        scores,
        source,
      });

      // Also add to newsletter subscribers
      await supabase.from("newsletter_subscribers").upsert(
        { email },
        { onConflict: "email" }
      );
    } catch {
      // Supabase not configured — log as fallback
      console.log("Quiz submission:", {
        firstName,
        email,
        result,
        scores,
        source,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
