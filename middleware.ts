import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  // 🚫 Si no hay token y va a /admin → redirigir a login
  if (req.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Si hay token y va a /login → redirigir a admin
  if (req.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"], 
}
