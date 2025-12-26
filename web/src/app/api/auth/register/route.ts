import { NextRequest, NextResponse } from "next/server";

// Minimal registration endpoint for custom business logic
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const data = await request.json();

    const api = process.env.NEXT_PUBLIC_API_BASE_URL;

    const body = JSON.stringify(data);
    console.log("Body Object");
    console.log(body);

    const response = await fetch(api + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    const result = await response.json();

    console.log("Result");
    console.log(result);

    // 'user already exists'
    if (result.error == "user already exists") {
      console.error("User already exists within the system!");
      return NextResponse.json(
        {
          status: "error",
          message: "User already exists within the system!",
        },
        {
          status: response.status,
        }
      );
    }

    // valid payload, ready to send to backend api
    return NextResponse.json(
      {
        status: "ok",
        message: "Registration successful! Redirecting to login page...",
        received: data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // error == ECONNREFUSED
    if (err?.cause?.code === "ECONNREFUSED") {
      console.error("Flask API refused to connect to web application.");
      return NextResponse.json(
        {
          status: "error",
          message:
            "Server refused to connect! The service may be unavailable or down for maintenance.",
        },
        {
          status: 503,
        }
      );
    }

    // error == GENERIC
    console.error("Registration error: ", err);
    return NextResponse.json(
      { status: "error", message: "Registration failed!" },
      { status: 400 }
    );
  }
}
