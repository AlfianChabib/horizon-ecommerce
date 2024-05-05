import middleware from '@/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export const customMiddleware = async (req: NextRequest) => {
  const refreshToken = req.cookies.get('refreshToken');
  if (req.nextUrl.pathname.startsWith('/login')) {
    console.log('customMiddleware');
    // if (refreshToken) return NextResponse.redirect(new URL('/', req.url));
  }
};
