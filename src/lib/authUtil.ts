import { NextAuthOptions, unstable_getServerSession } from "next-auth";
import {
  GetServerSidePropsContext,
} from "next";
import { OpenAPI as ApiOptions } from "../generated/api";
import { getCookieFromRequest } from "./cookieUtils";
import jwtDecode from "jwt-decode";
export const getAuthOptions = (req: any) => {
  var issuer = getCookieFromRequest("next-auth.issuer", req);
  if (!issuer) {
    throw new Error("issuer not found");
  }
  const authOptions: NextAuthOptions = {
    providers: [
      {
        id: "openiddict",
        name: "openiddict",
        type: "oauth",
        issuer: issuer,
        client: {
          token_endpoint_auth_method: "none",
        },
        wellKnown: `${issuer}/.well-known/openid-configuration`,
        authorization: {
          params: { scope: "openid profile email AbpTemplate" },
        },
        profile: (profile: any) => {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
        clientId: "AbpReact_Next_App",
      },
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
      async signIn() {
        return true;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.userRole = token.userRole;
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token!;
          const decoded = jwtDecode(token.accessToken) as any;
          token.userRole = decoded.role;
        }
        return token;
      },
    },
    events: {},
    // Enable debug messages in the console if you are having problems
    debug: true,
  };

  return authOptions;
};

export const getServerSession = async (context: GetServerSidePropsContext) => {
  var authOptions = getAuthOptions(context.req);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return session;
};

export const prepareApiRequest = async (context: GetServerSidePropsContext) => {
  var session = await getServerSession(context);
  var issuer = getCookieFromRequest("next-auth.issuer", context.req);
  ApiOptions.BASE = issuer ?? "";
  var tenant = getCookieFromRequest("__tenant", context.req);
  ApiOptions.HEADERS = {
    __tenant: tenant,
  } as Record<string, string>;
  ApiOptions.TOKEN = session?.accessToken as string;
};
