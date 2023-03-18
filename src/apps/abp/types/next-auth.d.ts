import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    idToken: string;
    userRole: string | string[];
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    error?: "RefreshAccessTokenError";
    userRole: string | string[];
    expireAt: number;
  }
}
