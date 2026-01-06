import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const api = process.env.NEXT_PUBLIC_API_BASE_URL;
    const body = JSON.stringify(data);

    const response = await fetch(api + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      credentials: "include",
    });

    const responseData = await response.json();
    // Log results of response
    console.log("Response Data:");
    console.log(responseData);

    const status = response.status;
    let errorData = null;

    // Try to parse error body if not OK
    if (!response.ok) {
      try {
        errorData = await response.json();
      } catch {
        errorData = null;
      }
    }

    if (status === 401) {
      // Forward error from middleware or backend
      return NextResponse.json(
        {
          status: "error",
          message: errorData?.error || errorData?.message,
        },
        { status: 401 }
      );
    }

    if (!response.ok) {
      // Forward other errors
      return NextResponse.json(
        {
          status: "error",
          message:
            errorData?.error ||
            errorData?.message ||
            "Login failed. Please try again.",
        },
        { status }
      );
    }

    const setCookie = response.headers.get("set-cookie");

    const nextResponse = NextResponse.json(
      {
        status: "ok",
        message: `Login successful! Welcome back to Estarossa!`,
        received: data,
      },
      { status: 200 }
    );

    if (setCookie) {
      nextResponse.headers.set("set-cookie", setCookie);
    }

    return nextResponse;
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: "Login failed!" },
      { status: 400 }
    );
  }
}
