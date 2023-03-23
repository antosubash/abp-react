import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAPI } from '@abpreact/proxy';
import { hostData } from './data/HostData';
import { JWT } from 'next-auth/jwt';
const isAdmin = (token: JWT) => {
    // if role is not set, then we are not an admin
    if (!token?.userRole) return false;

    // if role is a string, then we are an admin if it is "admin"
    if (typeof token?.userRole === 'string') return token?.userRole === 'admin';

    // if role is an array, then we are an admin if it contains "admin"
    if (Array.isArray(token?.userRole))
        return token?.userRole.includes('admin');

    // if role is something else, then we are not an admin
    return false;
};
export default withAuth(
    function middleware(request: NextRequest) {
        const response = NextResponse.next();
        const host = request.headers.get('host');
        const currentIssuer = request.cookies.get('next-auth.issuer')?.value;
        let issuer = '';
        // TODO: this is a hack to get the issuer for the tenant.
        // We should be able to get this from the API.
        const tenant = hostData.find((x) => x.host == host);
        let shouldSetCookie = false;
        if (currentIssuer === undefined) {
            issuer = tenant?.apiUrl!;
            shouldSetCookie = true;
        }

        if ((tenant && currentIssuer) !== tenant?.apiUrl) {
            shouldSetCookie = true;
        }
        OpenAPI.BASE = issuer;
        if (shouldSetCookie && tenant) {
            response.cookies.set('next-auth.issuer', tenant.apiUrl);
            response.cookies.set('__tenant', tenant.tenantId || '');
        }
        return response;
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const adminPaths = [
                    '/admin',
                    '/users',
                    '/tenants',
                    '/settings'
                ];
                const isAdminPath = adminPaths.some((path) => {
                    return req.nextUrl.pathname.startsWith(path);
                });

                if (isAdminPath && !isAdmin(token)) {
                    console.log('Not authorized path', req.nextUrl.pathname);
                    return false;
                }
                console.log('Public paths', req.nextUrl.pathname);
                return true;
            }
        }
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|favicon.ico).*)'
    ]
};
