// middleware.ts
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // if (token && req.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }
  // if (!token && !req.nextUrl.pathname.startsWith('/login')) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
