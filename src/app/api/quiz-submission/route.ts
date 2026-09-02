import { NextRequest, NextResponse } from "next/server";
import { triggerQuizNurture } from "@/lib/resend";

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
    const normalizedFirstName = String(firstName).trim();
    const normalizedResult = String(result).trim();
    const { getServerSupabase } = await import("@/lib/supabase");
    const supabase = getServerSupabase();

    const { error: submissionError } = await supabase.from("quiz_submissions").insert({
      first_name: normalizedFirstName,
      email: normalizedEmail,
      result: normalizedResult,
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

    let nurtureQueued = false;
    try {
      await triggerQuizNurture({
        email: normalizedEmail,
        firstName: normalizedFirstName,
        result: normalizedResult,
      });
      nurtureQueued = true;
    } catch (nurtureError) {
      console.error("Quiz nurture trigger failed", nurtureError);
    }

    return NextResponse.json({ success: true, nurtureQueued });
  } catch (error) {
    console.error("Quiz submission failed", error);
    return NextResponse.json({ error: "We couldn't save your results. Please try again." }, { status: 500 });
  }
}
