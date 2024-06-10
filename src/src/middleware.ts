import { NextRequest, NextResponse } from "next/server";
import { SessionData } from "./lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "./sessionOptions";

export async function middleware(request: NextRequest) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.tenantId && request.nextUrl.pathname !== '/auth/set-tenant') {
        return NextResponse.redirect(new URL('/auth/set-tenant', request.url))
    }
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - favicon.ico (favicon file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};