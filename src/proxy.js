import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  if(!user){
    return NextResponse.redirect(new URL('/login', request.url))
  }
//   console.log('Session:', session);
//   return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: [
    '/my-bookings/:path*',
    '/add-destination'
  ],
}