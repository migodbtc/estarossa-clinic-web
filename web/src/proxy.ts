import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// middleware config
export const config = {
  // ssr routes
  matcher: ["/api/:path*", "/workspace/:path*", "/login", "/register"],
};

// main middleware
export async function proxy(request: NextRequest) {
  console.log("Proxy triggered!");

  const token = request.cookies.get("refresh_token_cookie")?.value;

  // CSR routes: skip auth check for now
  const { pathname } = request.nextUrl;
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  // redirect to login if there is no user
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // additional validation if token = true
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode("dev-secret-change-me")
    );

    const exp = payload.exp;

    // date validation
    if (exp && exp <= Math.floor(Date.now() / 1000)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
