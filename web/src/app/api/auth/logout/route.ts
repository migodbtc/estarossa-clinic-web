import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const api = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(api + "/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json({ error: "Logout failed!" }, { status: 400 });
  }
}
