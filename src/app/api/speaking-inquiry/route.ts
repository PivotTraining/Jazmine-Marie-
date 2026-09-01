import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, organization, eventType, date, audienceSize, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { getServerSupabase } = await import("@/lib/supabase");
    const { error } = await getServerSupabase().from("speaking_inquiries").insert({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      organization: organization ? String(organization).trim() : "",
      event_type: eventType ? String(eventType).trim() : "",
      date: date ? String(date).trim() : "",
      audience_size: audienceSize ? String(audienceSize).trim() : "",
      message: String(message).trim(),
    });

    if (error) {
      console.error("Speaking inquiry persistence failed", error);
      return NextResponse.json({ error: "We couldn't submit your inquiry. Please try again." }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Speaking inquiry failed", error);
    return NextResponse.json({ error: "We couldn't submit your inquiry. Please try again." }, { status: 500 });
  }
}
