import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup';

  // If trying to access protected route without token → redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If logged in and trying to access login/signup → redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/create/:path*', '/blogs/:path*',],
};
