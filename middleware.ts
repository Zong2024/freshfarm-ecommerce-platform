import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // If not logged in and not on the login page, redirect to login
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // If logged in and trying to access the login page, redirect to admin dashboard
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
