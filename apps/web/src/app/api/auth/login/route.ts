import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(`${BASE_API_URL}auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const resJson = await response.json();

  if (resJson.success === true) {
    cookies().set('accessToken', resJson.accessToken, {
      maxAge: 24 * 60 * 60,
      sameSite: 'strict',
    });
    cookies().set('refreshToken', resJson.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    delete resJson.accessToken;
    delete resJson.refreshToken;
    return NextResponse.json(resJson);
  } else {
    return NextResponse.json({
      success: false,
      message: resJson.message,
    });
  }
}
