import { NextResponse, type NextRequest } from 'next/server';
import { customMiddleware } from './lib/custom-middleware';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // if (req.nextUrl.pathname.startsWith('/login')) {
  //   const refreshToken = req.cookies.get('refreshToken');
  //   console.log(refreshToken);
  // }

  await customMiddleware(req);
}
