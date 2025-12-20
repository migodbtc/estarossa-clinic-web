import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/workspace")) {
    // check for token
    // redirect if token != null
  }
  return NextResponse.next();
}
