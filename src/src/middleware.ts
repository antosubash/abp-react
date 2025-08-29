import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import type { SessionData } from './lib/session-utils'
import { sessionOptions } from './sessionOptions'

/**
 * Middleware function to check for tenant ID in the session and authentication for admin routes.
 * If the tenant ID is not present, the user is redirected to the set-tenant page.
 * If the user tries to access admin routes without being authenticated, they are redirected to login.
 * This middleware runs for every request.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse | undefined>} - The response object or undefined.
 */
export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

    // Ensure tenantId is always a string
    if (session.tenantId && typeof session.tenantId !== 'string') {
      session.tenantId = String(session.tenantId)
      await session.save()
    }

    // Check if user is trying to access admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Check if user is not logged in
      if (!session.isLoggedIn || !session.access_token) {
        // Redirect to login page
        const redirectUrl = new URL('/auth/login', request.nextUrl.origin)
        // Validate the redirect URL
        if (redirectUrl.origin === request.nextUrl.origin) {
          return NextResponse.redirect(redirectUrl)
        }
      }
    }

    // Check if tenantId is missing and redirect to set-tenant if needed
    // Exclude auth routes, public routes, and the set-tenant route itself to prevent loops
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/')
    const isPublicRoute =
      request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/pages/')
    const isSetTenantRoute = request.nextUrl.pathname === '/auth/set-tenant'

    // Only redirect if tenantId is missing AND we're not already on an excluded route
    if (
      (session.tenantId === undefined || session.tenantId === null || session.tenantId === '') &&
      !isAuthRoute &&
      !isPublicRoute &&
      !isSetTenantRoute
    ) {
      // Redirect to set-tenant page if tenantId is not present
      const redirectUrl = new URL('/auth/set-tenant', request.nextUrl.origin)
      // Validate the redirect URL
      if (redirectUrl.origin === request.nextUrl.origin) {
        return NextResponse.redirect(redirectUrl)
      }
    }
  } catch (error) {
    // If there's an error getting the session, log it but don't redirect
    // This prevents middleware errors from causing redirect loops
    console.error('Middleware error:', error)

    // For auth routes, allow the request to continue
    if (request.nextUrl.pathname.startsWith('/auth/')) {
      return
    }

    // For other routes, redirect to set-tenant as a fallback
    const isPublicRoute =
      request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/pages/')
    if (!isPublicRoute) {
      const redirectUrl = new URL('/auth/set-tenant', request.nextUrl.origin)
      if (redirectUrl.origin === request.nextUrl.origin) {
        return NextResponse.redirect(redirectUrl)
      }
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
