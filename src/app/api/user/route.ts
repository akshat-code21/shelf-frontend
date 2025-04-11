import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get('token');
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            'Cookie': `token=${cookie?.value}`,
        }
    });
    if (!res.ok) {
        return NextResponse.json({ message: res.statusText }, { status: res.status });
    }

    const data = await res.json();
    
    return NextResponse.json(data);
}