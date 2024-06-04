import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuth } from './lib/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if(!token) return NextResponse.redirect(new URL('/sign-in', request.url))
    const isAuthenticated = await isAuth(token);
    if (!isAuthenticated) return NextResponse.redirect(new URL('/sign-in', request.url))
}

export const config = {
    matcher: ['/']
}       