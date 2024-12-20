import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { IS_LOGGED_IN, REMEMBER_ME } from './components/constants/constants';

export function middleware(request) {
    const url = request.nextUrl;
    const rememberMeCookie = cookies().get(REMEMBER_ME)?.value;
    // const isLoggedInCookie = cookies().get(IS_LOGGED_IN)?.value;


    console.log('url.pathname:', url.pathname);
    if (url.pathname === '/') {
        if (rememberMeCookie === 'true') {
            return NextResponse.redirect(new URL('/landing-page', request.url));
        }
    }

    // if (!isLoggedInCookie && url.pathname === '/landing-page') {
    //     console.log('redirecting to /');
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
