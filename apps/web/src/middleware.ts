import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "localhost:3000";
  url.pathname = `/_sites/${hostname}${url.pathname}`;
  return NextResponse.rewrite(url);
}
