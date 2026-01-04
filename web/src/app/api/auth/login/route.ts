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
    });
    const status = await response.status;

    console.log("Result of the login request:");
    console.log(await response);
    console.log(`Status Code: ${status}`);

    // error handling: errors come in this payload
    // { error: 'invalid credentials' }

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

    // success case
    return NextResponse.json(
      {
        status: "ok",
        message: `Login successful! Welcome back to Estarossa!`,
        received: data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    // generic catch statement
    console.error("Registration error: ", err);
    return NextResponse.json(
      { status: "error", message: "Login failed!" },
      { status: 400 }
    );
  }
}
