import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const api = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(api + "/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    console.log("Data");
    console.log(data);

    if (response.status === 401) {
      return NextResponse.json(
        { error: data?.error || "Not authorized to logout." },
        { status: 401 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Logout failed!" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json({ error: "Logout failed!" }, { status: 400 });
  }
}
