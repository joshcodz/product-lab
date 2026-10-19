import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes, but not /admin/login itself
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = req.cookies.get(SESSION_COOKIE);

    if (session?.value !== SESSION_VALUE) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
