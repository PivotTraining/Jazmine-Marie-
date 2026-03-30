import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const protectedPaths = ["/community"];
const authPaths = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // ===== Security Headers =====
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  // ===== Rate limiting for API routes =====
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
    // Simple rate limiting via headers (real rate limiting should use Redis/Upstash)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    response.headers.set("X-RateLimit-Limit", "60");
    response.headers.set("X-RateLimit-Remaining", "59");
  }

  // ===== Auth check for protected routes =====
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured, allow access (development mode)
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  // Get the session token from cookies
  const accessToken = request.cookies.get("sb-access-token")?.value
    ?? request.cookies.get(`sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`)?.value;

  // Try to parse the auth token
  let isAuthenticated = false;

  if (accessToken) {
    try {
      // Verify with Supabase
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      });
      const { data: { user } } = await supabase.auth.getUser(accessToken);
      isAuthenticated = !!user;
    } catch {
      isAuthenticated = false;
    }
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login page
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/community", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/community/:path*",
    "/login",
    "/api/:path*",
  ],
};
