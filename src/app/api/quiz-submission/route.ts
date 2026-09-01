import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, email, result, answers, scores } = body;

    if (!firstName || !email || !result) {
      return NextResponse.json({ error: "First name, email, and result are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const source = request.headers.get("referer") || "direct";
    const normalizedEmail = String(email).trim().toLowerCase();
    const { getServerSupabase } = await import("@/lib/supabase");
    const supabase = getServerSupabase();

    const { error: submissionError } = await supabase.from("quiz_submissions").insert({
      first_name: String(firstName).trim(),
      email: normalizedEmail,
      result,
      answers,
      scores,
      source,
    });

    if (submissionError) {
      console.error("Quiz submission persistence failed", submissionError);
      return NextResponse.json({ error: "We couldn't save your results. Please try again." }, { status: 503 });
    }

    const { error: subscriberError } = await supabase.from("newsletter_subscribers").upsert(
      { email: normalizedEmail },
      { onConflict: "email" }
    );

    if (subscriberError) {
      console.error("Quiz newsletter opt-in failed", subscriberError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz submission failed", error);
    return NextResponse.json({ error: "We couldn't save your results. Please try again." }, { status: 500 });
  }
}
