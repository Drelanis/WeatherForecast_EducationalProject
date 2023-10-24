import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  if (
    !request.cookies.has('refreshToken') &&
    !request.cookies.has('accessToken')
  ) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/login`);
  }
  NextResponse.redirect(request.url);
  return NextResponse.next();
};

export const config = {
  matcher: ['/profile', '/home', '/weather'],
};
