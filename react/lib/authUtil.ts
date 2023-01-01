import IdentityServer4Provider from "next-auth/providers/identity-server4";
import { NextAuthOptions, unstable_getServerSession } from "next-auth";
import {
  GetServerSidePropsContext,
} from "next";
import { OpenAPI as ApiOptions } from "../generated/api";
import { getCookieFromRequest } from "./cookieUtils";
export const getAuthOptions = (req: any, res: any) => {
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
          params: { scope: "openid profile email NextAuthApp" },
        },
        profile: (profile: any) => {
          console.log("🚀 ~ file: authUtil.ts ~ line 25 ~ getAuthOptions ~ profile", profile)
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
        clientId: process.env.IdentityServer4_CLIENT_ID,
      }
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.SECRET,
    },
    callbacks: {
      async signIn() {
        return true;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token!;
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
  var authOptions = getAuthOptions(context.req, context.res);
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
