import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  if (!request.cookies.has('refreshtoken')) {
    return NextResponse.redirect(`${process.env.CLIENT_URL}/login`);
  }
};

export const config = {
  matcher: ['/profile'],
};
