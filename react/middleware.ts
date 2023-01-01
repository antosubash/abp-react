import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { hostData } from "./data/HostData";
import { OpenAPI } from "./generated/api";

export default withAuth(
  function middleware(request: NextRequest) {
    const response = NextResponse.next();
    var host = request.headers.get("host");
    var currentIssuer = request.cookies.get("next-auth.issuer")?.value;
    var issuer = "";
    var tenant = hostData.find((x) => x.host == host);
    var shouldSetCookie = false;
    if (!currentIssuer) {
      issuer = tenant?.apiUrl!;
      shouldSetCookie = true;
    }

    if (tenant && currentIssuer != tenant?.apiUrl) {
      shouldSetCookie = true;
    }
    OpenAPI.BASE = issuer;
    if (shouldSetCookie && tenant) {
      console.log("middleware.ts: setting issuer to " + tenant.apiUrl);
      response.cookies.set("next-auth.issuer", tenant.apiUrl);
      response.cookies.set("__tenant", tenant.tenantId || "");
      
    }
    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log("middleware.ts: url: line: 32 ", req.url);
        // console.log("middleware.ts: token: ", token);
        // /admin requires admin role, but /me only requires the user to be logged in.
        return req.nextUrl.pathname !== "/admin" || token?.userRole === "admin";
      },
    },
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
    "/((?!api|_next/static|favicon.ico).*)",
  ],
};
