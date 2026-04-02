import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (path.startsWith("/admin")) {
    const isAdminLoginPage = path === "/admin/login";
    if (!token && !isAdminLoginPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (token && isAdminLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  const protectedFrontendRoutes = ["/checkout"];
  const isProtected = protectedFrontendRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtected && !token) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(signInUrl);
  }

  const authPages = ["/signin", "/signup"];
  if (authPages.includes(path) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 設定 Middleware 要攔截哪些路徑
export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/signin",
    "/signup",
    "/user/:path*",
  ],
};
