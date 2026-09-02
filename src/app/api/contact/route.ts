import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, getLeadNotificationEmail, sendTransactionalEmail } from "@/lib/resend";

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

    const normalizedName = String(name).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedSubject = subject ? String(subject).trim() : "";
    const normalizedMessage = String(message).trim();

    const { getServerSupabase } = await import("@/lib/supabase");
    const { error } = await getServerSupabase().from("contact_messages").insert({
      name: normalizedName,
      email: normalizedEmail,
      subject: normalizedSubject,
      message: normalizedMessage,
    });

    if (error) {
      console.error("Contact message persistence failed", error);
      return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 503 });
    }

    try {
      await sendTransactionalEmail({
        to: getLeadNotificationEmail(),
        subject: `New Jazmine Marie contact: ${normalizedName}`,
        replyTo: normalizedEmail,
        text: `New contact submission\n\nName: ${normalizedName}\nEmail: ${normalizedEmail}\nSubject: ${normalizedSubject || "—"}\n\nMessage:\n${normalizedMessage}`,
        html: `<p><strong>New contact submission</strong></p><p><strong>Name:</strong> ${escapeHtml(normalizedName)}<br><strong>Email:</strong> ${escapeHtml(normalizedEmail)}<br><strong>Subject:</strong> ${escapeHtml(normalizedSubject || "—")}</p><p><strong>Message:</strong></p><p>${escapeHtml(normalizedMessage).replaceAll("\n", "<br>")}</p>`,
      });
    } catch (notificationError) {
      console.error("Contact notification email failed", notificationError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form failed", error);
    return NextResponse.json({ error: "We couldn't send your message. Please try again." }, { status: 500 });
  }
}
