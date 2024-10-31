import { redirect } from 'next/navigation'
import {refreshToken} from "@/lib/auth";

export async function GET() {
  await refreshToken()
  redirect('/')
}
