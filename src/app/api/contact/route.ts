import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { getServerSupabase } = await import("@/lib/supabase");
    const { error } = await getServerSupabase().from("contact_messages").insert({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: subject ? String(subject).trim() : "",
      message: String(message).trim(),
    });

    if (error) {
      console.error("Contact message persistence failed", error);
      return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form failed", error);
    return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 500 });
  }
}
