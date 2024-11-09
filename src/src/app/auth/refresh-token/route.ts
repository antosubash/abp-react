import { redirect } from 'next/navigation'
import {refreshToken} from "@/lib/auth";

/**
 * Handles the GET request to refresh the authentication token.
 * 
 * This function calls the `refreshToken` function to refresh the user's authentication token
 * and then redirects the user to the home page ('/').
 * 
 * @returns {Promise<void>} A promise that resolves when the token is refreshed and the user is redirected.
 */
export async function GET() {
  await refreshToken()
  redirect('/')
}
