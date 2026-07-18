import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = req.nextUrl.pathname === '/admin/login';

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute && !isLoginRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
