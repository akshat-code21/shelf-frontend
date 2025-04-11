import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || "Logout failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const response = NextResponse.json(data);

    response.headers.set('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    );
  }
}
