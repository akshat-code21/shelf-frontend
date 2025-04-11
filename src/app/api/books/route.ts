import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
        if (response.status === 401) {
            console.log('User API: Unauthorized (401)');
            return NextResponse.json(null, { status: 401 });
        }
        console.log('User API: Error response', response.status);
        return NextResponse.json({ message: "Authentication failed" }, { status: response.status });
    }

    const data = await response.json();
    console.log('User API: User data received:', data);
    return NextResponse.json(data);
}
export async function POST(request: NextRequest) {
    const cookieHeader = request.headers.get('cookie');
    const { title, author, genre, location, contact, status } = await request.json();
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
        if (response.status === 401) {
            console.log('User API: Unauthorized (401)');
            return NextResponse.json(null, { status: 401 });
        }
        console.log('User API: Error response', response.status);
        return NextResponse.json({ message: "Authentication failed" }, { status: response.status });
    }
    const data = await response.json();
    console.log('User API: User data received:', data);
    return NextResponse.json(data);
}