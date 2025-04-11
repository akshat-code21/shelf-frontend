import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest
) {
  const id = request.url.split('/').pop();
  const cookieHeader = request.headers.get('cookie');
  
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };
  
  if (cookieHeader) {
    headers['Cookie'] = cookieHeader;
  }
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      console.log('Book API: Unauthorized (401)');
      return NextResponse.json(null, { status: 401 });
    }
    console.log('Book API: Error response', response.status);
    return NextResponse.json({ message: "Operation failed" }, { status: response.status });
  }
  
  const data = await response.json();
  console.log('Book API: Data received:', data);
  return NextResponse.json(data);
} 

export async function PUT(
    request: NextRequest
) {
    const id = request.url.split('/').pop();
    const cookieHeader = request.headers.get('cookie');
    const { title, author, genre, location, contact, status } = await request.json();
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    
    if (cookieHeader) {
        headers['Cookie'] = cookieHeader;
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({ title, author, genre, location, contact, status })
    });
    
    if (!response.ok) {
        if (response.status === 401) {
            console.log('Book API: Unauthorized (401)');
            return NextResponse.json(null, { status: 401 });
        }
        console.log('Book API: Error response', response.status);
        return NextResponse.json({ message: "Operation failed" }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('Book API: Book updated successfully:', data);
    return NextResponse.json(data);
} 