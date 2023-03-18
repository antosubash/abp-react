import {  DefaultUser, DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    userRole?: string | string[]; 
  }
  interface Session extends DefaultSession {
    user?: User;
    idToken?: string;
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
