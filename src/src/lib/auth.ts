import { sessionOptions } from '@/sessionOptions'
import { getIronSession } from 'iron-session'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { RedisSession, createRedisInstance } from './redis'
import {SessionData, getClientConfig} from './session-utils'
import * as client from 'openid-client'
import {OpenAPI} from "@/client";
import {getSession} from "@/lib/actions";
/**
 * Checks if the given JWT token is expired.
 *
 * @param token - The JWT token to check.
 * @returns `true` if the token is expired, `false` otherwise.
 */
export const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token!);
  const expirationTime = decoded?.exp! * 1000;
  const currentTime = new Date().getTime();
  return expirationTime < currentTime
}

/**
 * Refreshes the authentication token.
 * 
 * This function is intended to be used on the server side. It attempts to refresh the 
 * authentication token when the current token has expired. The function performs the 
 * following steps:
 * 
 * 1. Logs a message indicating that the token is being refreshed.
 * 2. Retrieves the current session using `getIronSession`.
 * 3. Constructs a Redis key based on the user's subject identifier (`sub`).
 * 4. Creates a Redis instance and retrieves the session data from Redis.
 * 5. Parses the session data and uses the refresh token to obtain a new token set.
 * 6. Logs the new access token.
 * 7. Updates the session with the new access token and saves the session.
 * 8. Updates the Redis session data with the new access and refresh tokens.
 * 9. Closes the Redis connection.
 * 10. Logs a success message.
 * 
 * If an error occurs during any of these steps, it logs an error message.
 * 
 * @async
 * @function
 * @throws Will log an error message if the token refresh process fails.
 */
export const refreshToken = async () => {
  'use server'
  try {
    console.log('Token expired. Refreshing token...')
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    const redisKey = `session:${session?.userInfo?.sub!}`
    const redis = createRedisInstance()
    const clientConfig = await getClientConfig()
    const redisSessionData = await redis.get(redisKey);
    const parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
    const tokenSet = await client.refreshTokenGrant(clientConfig, parsedSessionData.refresh_token!)
    console.log('Token refreshed. New token:', tokenSet.access_token)
    session.access_token = tokenSet.access_token
    await session.save()
    const newRedisSessionData = {
      access_token: tokenSet.access_token,
      refresh_token: tokenSet.refresh_token,
    } as RedisSession;
    await redis.set(redisKey, JSON.stringify(newRedisSessionData))
    await redis.quit()
    console.log('Token refreshed successfully.')
  } catch (e) {
    console.error('Error refreshing token:', e)
  }
}

/**
 * Configures the layout settings for the application.
 * 
 * This function sets the base URL for the OpenAPI client using the environment variable `NEXT_PUBLIC_API_URL`.
 * It also sets up an interceptor for requests to include the authorization token and tenant ID in the headers.
 * 
 * @returns {void}
 */
export const setUpLayoutConfig = () => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL!

  OpenAPI.interceptors.request.use(async (options) => {
    const session = await getSession()
    options.headers = {
      Authorization: `Bearer ${session.access_token}`,
      __tenant: session.tenantId ?? '',
    }
    return options
  })
}
