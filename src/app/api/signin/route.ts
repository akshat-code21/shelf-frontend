import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        console.log('Signin API: Backend URL:', backendUrl);

        const res = await fetch(`${backendUrl}/api/auth/signin`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include"
        });
        const allHeaders = Object.fromEntries(res.headers.entries());

        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json(
                { message: errorData.message || "Invalid credentials" },
                { status: res.status }
            );
        }

        const data = await res.json();


        const response = NextResponse.json(data);

        // Copy cookies from backend response
        const setCookieHeader = res.headers.get('set-cookie');


        if (setCookieHeader) {
            response.headers.set('Set-Cookie', setCookieHeader);
        }

        return response;
    } catch (error) {
        console.error('Signin API: Error:', error);
        return NextResponse.json(
            { message: "An error occurred during sign in" },
            { status: 500 }
        );
    }
}