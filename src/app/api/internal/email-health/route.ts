import { NextResponse } from "next/server";
import { isResendConfigured } from "@/lib/resend";

export async function GET() {
  return NextResponse.json({ configured: isResendConfigured() });
}
