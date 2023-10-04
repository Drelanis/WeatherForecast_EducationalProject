import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  if (!request.cookies.has('refreshtoken')) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/login`);
  }
  NextResponse.redirect(request.url);
  return NextResponse.next();
};

export const config = {
  matcher: ['/profile', '/home', '/weather'],
};
