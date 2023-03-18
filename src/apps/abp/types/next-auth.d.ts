import {  DefaultUser, DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    userRole?: string; 
  }
  interface Session extends DefaultSession {
    user?: User;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    refreshToken: string
    error?: "RefreshAccessTokenError"
    userRole: string,
    expireAt: number
  }
}