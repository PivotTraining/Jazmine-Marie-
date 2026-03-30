import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    try {
      const { getServerSupabase } = await import("@/lib/supabase");
      const supabase = getServerSupabase();
      await supabase.from("newsletter_subscribers").upsert(
        { email },
        { onConflict: "email" }
      );
    } catch {
      console.log("Newsletter signup:", email);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
