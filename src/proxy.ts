import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const protectedPaths = ["/community"];
const authPaths = ["/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Production member content fails closed when auth is unavailable.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isProtected) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("sb-access-token")?.value;
  let isAuthenticated = false;

  if (accessToken) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      isAuthenticated = !error && Boolean(user);
    } catch {
      isAuthenticated = false;
    }
  }

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/community", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/community/:path*", "/login"],
};
