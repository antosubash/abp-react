import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken: string,
    userRole: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string,
    userRole: string
  }
}