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
  console.log(`Path Name: ${pathname}`);
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/api/auth/login" ||
    pathname === "/api/auth/register"
  ) {
    return NextResponse.next();
  }

  // API and/or workspace routes
  if (pathname.startsWith("/api/") || pathname.startsWith("/workspace/")) {
    // redirect to login if there is no user
    if (!token) {
      console.log("There is no existing token within the browser!");
      return NextResponse.json(
        { error: "Unauthorized access, missing token" },
        { status: 401 }
      );
    }

    // additional validation if token = true
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode("dev-secret-change-me")
      );

      const exp = payload.exp;

      console.log(`Payload Expiration: ${exp}`);
      console.log(`Current Date: ${Math.floor(Date.now() / 1000)}`);

      // date validation
      if (exp && exp < Math.floor(Date.now() / 1000)) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 401 }
        );
      }
    } catch (e) {
      console.log("Error in attempting to jwtVerify existing token!");
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}
