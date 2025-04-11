import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json(
                { message: errorData.message || "Invalid credentials" },
                { status: res.status }
            );
        }

        const data = await res.json();
        const response = NextResponse.json(data);

        const cookies = res.headers.getSetCookie();
        cookies.forEach(cookie => {
            response.headers.append('Set-Cookie', cookie);
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred during sign in" },
            { status: 500 }
        );
    }
}