import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { OpenAPI } from "@abpreact/proxy";
import { hostData } from "./data/HostData";

export default withAuth(
  function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const host = request.headers.get("host");
    const currentIssuer = request.cookies.get("next-auth.issuer")?.value;
    let issuer = "";
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
      response.cookies.set("next-auth.issuer", tenant.apiUrl);
      response.cookies.set("__tenant", tenant.tenantId || "");
    }
    return response;
  },
  {
    callbacks:{
      authorized: ({ req, token }) => {
        const adminPaths = ["/admin", "/users", "/tenants", "/settings"];
        const publicPaths = ["/"];
        const assets = ["/img", "/favicon.ico", "/robots.txt"];

        if (
            (token?.userRole === "admin" && adminPaths.includes(req.nextUrl.pathname))
            || publicPaths.includes(req.nextUrl.pathname)
        ) return true;

        if (assets.filter((x) => req.nextUrl.pathname.startsWith(x)).length > 0) return true;
        
        console.log("Not authorized path", req.nextUrl.pathname);
        return false;
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
