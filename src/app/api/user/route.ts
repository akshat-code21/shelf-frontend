import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        const cookieHeader = request.headers.get('cookie');

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (cookieHeader) {
            headers['Cookie'] = cookieHeader;
        }

        const res = await fetch(`${backendUrl}/api/users/me`, {
            method: "GET",
            credentials: "include",
            headers
        });

        if (!res.ok) {
            if (res.status === 401) {
                console.log('User API: Unauthorized (401)');
                return NextResponse.json(null, { status: 401 });
            }
            console.log('User API: Error response', res.status);
            return NextResponse.json({ message: "Authentication failed" }, { status: res.status });
        }

        const data = await res.json();
        console.log('User API: User data received:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('User API: Error fetching user:', error);
        return NextResponse.json(
            { message: "An error occurred while fetching user data" },
            { status: 500 }
        );
    }
}