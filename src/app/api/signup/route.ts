import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, email, password, mobile } = await request.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ name, email, password, mobile }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        return NextResponse.json({ message: res.statusText }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
}
