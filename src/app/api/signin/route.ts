import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    const res = await fetch(`${process.env.NEXT_BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!res.ok) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const data = await res.json();
    return NextResponse.json(data);
}