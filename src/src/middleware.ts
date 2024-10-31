import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SessionData } from './lib/session-utils'
import { sessionOptions } from './sessionOptions'

/**
 * Middleware function to check for tenant ID in the session.
 * If the tenant ID is not present, the user is redirected to the set-tenant page.
 * This middleware runs for every request.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse | undefined>} - The response object or undefined.
 */
export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  // Check if tenantId is present in the session
  if (!session.tenantId && request.nextUrl.pathname !== '/auth/set-tenant') {
    // Redirect to set-tenant page if tenantId is not present
    let redirectUrl = new URL('/auth/set-tenant', request.nextUrl.origin)
    // Validate the redirect URL
    if (redirectUrl.origin === request.nextUrl.origin) {
      // Redirect to set-tenant page if tenantId is not present
      return NextResponse.redirect(redirectUrl)
    }
  }
}

/**
 * Configuration object for the middleware matcher.
 * Specifies which paths the middleware should run for.
 */
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
}