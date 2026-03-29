import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/community"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path requires authentication
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected) {
    // In production, this would verify the Supabase session cookie.
    // For now, we allow access for development purposes.
    // When Supabase is configured, uncomment and implement:
    //
    // const supabaseToken = request.cookies.get("sb-access-token")?.value;
    // if (!supabaseToken) {
    //   const loginUrl = new URL("/login", request.url);
    //   loginUrl.searchParams.set("redirect", pathname);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/community/:path*"],
};
