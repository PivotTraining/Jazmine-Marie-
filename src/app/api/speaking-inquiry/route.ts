import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, organization, eventType, date, audienceSize, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Try to save to Supabase if configured
    try {
      const { getServerSupabase } = await import("@/lib/supabase");
      const supabase = getServerSupabase();
      await supabase.from("speaking_inquiries").insert({
        name,
        email,
        organization: organization || "",
        event_type: eventType || "",
        date: date || "",
        audience_size: audienceSize || "",
        message,
      });
    } catch {
      // Supabase not configured — log to console as fallback
      console.log("Speaking inquiry received:", { name, email, organization, eventType, date, audienceSize, message });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
