import { NextRequest, NextResponse } from "next/server";

// middleware config
export const config = {
  // ssr routes
  matcher: ["/api/:path*", "/workspace/:path*"],
};

// main middleware
export function proxy(request: NextRequest) {
  console.log("Proxy triggered!");

  const token = request.headers.get("authorization");

  console.log(token);

  return NextResponse.next();
}
