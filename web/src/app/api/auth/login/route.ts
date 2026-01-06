import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // mandatory constants
    const data = await request.json();
    const api = process.env.NEXT_PUBLIC_API_BASE_URL;
    const body = JSON.stringify(data);

    // do request to auth login route in flask api
    const response = await fetch(api + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      credentials: "include",
    });
    const status = await response.status;

    // invalid credentials (code 401)
    if (status == 401) {
      console.error("Login form is provided with invalid credentials!");
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid login! Please check email address or password.",
        },
        {
          status: response.status,
        }
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
    // generic catch statement
    console.error("Registration error: ", err);
    return NextResponse.json(
      { status: "error", message: "Login failed!" },
      { status: 400 }
    );
  }
}
