// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Example: block admin paths if not authenticated
  const sessionCookie = request.cookies.get("session_id")?.value;
  if (pathname.startsWith("/admin/") && !sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (pathname === "/admin" && sessionCookie) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
