import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/profile:path*', '/weather:path*'],
};

export const middleware = async (request: NextRequest) => {
  if (!request.cookies.has('refreshtoken')) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/login`);
  }
  NextResponse.redirect(request.url);
  return;
};
