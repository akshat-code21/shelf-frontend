import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
    const cookieHeader = request.headers.get('cookie');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (cookieHeader) {
        headers['Cookie'] = cookieHeader;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
        method: "GET",
        credentials: "include",
        headers
    });
    console.log(response);
    if (!response.ok) {
        if (res.status === 401) {
            console.log('User API: Unauthorized (401)');
            return NextResponse.json(null, { status: 401 });
        }
        console.log('User API: Error response', res.status);
        return NextResponse.json({ message: "Authentication failed" }, { status: res.status });
    }

    const data = await response.json();
    console.log('User API: User data received:', data);
    return NextResponse.json(data);
}
export async function POST(req: NextRequest, res: NextResponse) {
    const cookieHeader = req.headers.get('cookie');
    const { title, author, genre, location, contact, status } = await req.json();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    if (cookieHeader) {
        headers['Cookie'] = cookieHeader;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({ title, author, genre, location, contact, status })
    });
    console.log(response);
    if (!response.ok) {
        if (res.status === 401) {
            console.log('User API: Unauthorized (401)');
            return NextResponse.json(null, { status: 401 });
        }
        console.log('User API: Error response', res.status);
        return NextResponse.json({ message: "Authentication failed" }, { status: res.status });
    }
    const data = await response.json();
    console.log('User API: User data received:', data);
    return NextResponse.json(data);
}