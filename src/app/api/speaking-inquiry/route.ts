import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, getLeadNotificationEmail, sendTransactionalEmail } from "@/lib/resend";

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

    const normalized = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      organization: organization ? String(organization).trim() : "",
      eventType: eventType ? String(eventType).trim() : "",
      date: date ? String(date).trim() : "",
      audienceSize: audienceSize ? String(audienceSize).trim() : "",
      message: String(message).trim(),
    };

    const { getServerSupabase } = await import("@/lib/supabase");
    const { error } = await getServerSupabase().from("speaking_inquiries").insert({
      name: normalized.name,
      email: normalized.email,
      organization: normalized.organization,
      event_type: normalized.eventType,
      date: normalized.date,
      audience_size: normalized.audienceSize,
      message: normalized.message,
    });

    if (error) {
      console.error("Speaking inquiry persistence failed", error);
      return NextResponse.json({ error: "We couldn't submit your inquiry. Please try again." }, { status: 503 });
    }

    try {
      await sendTransactionalEmail({
        to: getLeadNotificationEmail(),
        subject: `New speaking inquiry: ${normalized.organization || normalized.name}`,
        replyTo: normalized.email,
        text: `New speaking inquiry\n\nName: ${normalized.name}\nEmail: ${normalized.email}\nOrganization: ${normalized.organization || "—"}\nEvent type: ${normalized.eventType || "—"}\nDate: ${normalized.date || "—"}\nAudience size: ${normalized.audienceSize || "—"}\n\nMessage:\n${normalized.message}`,
        html: `<p><strong>New speaking inquiry</strong></p><p><strong>Name:</strong> ${escapeHtml(normalized.name)}<br><strong>Email:</strong> ${escapeHtml(normalized.email)}<br><strong>Organization:</strong> ${escapeHtml(normalized.organization || "—")}<br><strong>Event type:</strong> ${escapeHtml(normalized.eventType || "—")}<br><strong>Date:</strong> ${escapeHtml(normalized.date || "—")}<br><strong>Audience size:</strong> ${escapeHtml(normalized.audienceSize || "—")}</p><p><strong>Message:</strong></p><p>${escapeHtml(normalized.message).replaceAll("\n", "<br>")}</p>`,
      });
    } catch (notificationError) {
      console.error("Speaking inquiry notification email failed", notificationError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Speaking inquiry failed", error);
    return NextResponse.json({ error: "We couldn't submit your inquiry. Please try again." }, { status: 500 });
  }
}
