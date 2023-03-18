import {
  Awaitable,
  NextAuthOptions,
  TokenSet,
  User,
  unstable_getServerSession,
} from "next-auth";
import { GetServerSidePropsContext } from "next";
import { OpenAPI as ApiOptions } from "@abpreact/proxy";
import { getCookieFromRequest } from "./cookieUtils";
import jwtDecode from "jwt-decode";
export const getAuthOptions = (req: any) => {
  const issuer = getCookieFromRequest("next-auth.issuer", req);
  const clientId = "AbpReact_Next_App";
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
          params: { scope: "openid profile email offline_access AbpTemplate" },
        },
        profile: (profile: {sub: string, name: string, email: string, picture: string}, token: TokenSet): Awaitable<User> => ({
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }),
        clientId: clientId,
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
        session.user.accessToken = token.accessToken;
        session.user.userRole = token.userRole;
        return session;
      },
      async jwt({ token, account }: any) {
        console.log(account, 'account')
        if (account) {
          token.accessToken = account.access_token!;
          token.refreshToken = account.refresh_token!;
          token.expiresAt = account.expires_at * 1000;
          const decoded = jwtDecode(account.access_token!) as any;
          token.userRole = decoded.role;
          return token;
        } else if (Date.now() < token.expiresAt!) {
          // If the access token has not expired yet, return it
          return token;
        }
        // If the access token has expired, try to refresh it
        try {
          // https://issuer/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch(issuer + "/connect/token", {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: clientId,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken,
            } as Record<string, string>),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;
          const newToken = {
            ...token, // Keep the previous token properties
            accessToken: tokens.access_token,
            expiresAt: Date.now() + tokens.expires_in as number,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
          return newToken;
        } catch (err: unknown) {
          if(err instanceof Error)
            console.log(`Error Caught: ${err.message}`);
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      },

     
    },
    events: {},
    // Enable debug messages in the console if you are having problems
    debug: false,
  };

  return authOptions;
};

export const getServerSession = async (context: GetServerSidePropsContext) => {
  const authOptions = getAuthOptions(context.req);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return session;
};

export const prepareApiRequest = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context);
  const issuer = getCookieFromRequest("next-auth.issuer", context.req);
  ApiOptions.BASE = issuer ?? "";
  const tenant = getCookieFromRequest("__tenant", context.req);
  ApiOptions.HEADERS = {
    __tenant: tenant,
  } as Record<string, string>;
  ApiOptions.TOKEN = session?.user?.accessToken as string;
};
