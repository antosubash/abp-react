'use server'
import { getIronSession, type IronSession } from 'iron-session'
import { cookies } from 'next/headers'
import * as client from 'openid-client'
import { sessionOptions } from '@/sessionOptions'
import { isTokenExpired } from './auth'
import { createRedisInstance, type RedisSession } from './redis'
import { defaultSession, getClientConfig, type SessionData } from './session-utils'

/**
 * Retrieves the current session, refreshing the access token if it has expired.
 * If an error occurs, it returns the default session.
 *
 * @returns {Promise<IronSession<SessionData>>} - The session data.
 *
 * @description
 * This function uses Redis to store and retrieve session data. The `createRedisInstance` function initializes a Redis client, and session data is managed using Redis keys.
 * This helps in maintaining session state across different instances of the application.
 *
 * The OpenID client is used to handle authentication and token management. The `refreshTokenGrant` method is used to refresh the access token when it has expired, ensuring that the session remains valid without requiring the user to re-authenticate.
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  try {
    // Check if the access token is expired
    if (session.access_token && isTokenExpired(session.access_token!)) {
      try {
        const redisKey = `session:${session?.userInfo?.sub!}`
        const redis = createRedisInstance()
        const clientConfig = await getClientConfig()

        // Retrieve session data from Redis
        const redisSessionData = await redis.get(redisKey)

        if (!redisSessionData) {
          console.warn('No session data found in Redis, user may need to re-authenticate')
          throw new Error('No session data in Redis')
        }

        const parsedSessionData = JSON.parse(redisSessionData!) as RedisSession

        // Check if we have a refresh token
        if (!parsedSessionData.refresh_token) {
          console.warn('No refresh token available, user needs to re-authenticate')
          throw new Error('No refresh token available')
        }

        // Refresh the access token using the refresh token
        const tokenSet = await client.refreshTokenGrant(
          clientConfig,
          parsedSessionData.refresh_token!
        )

        session.access_token = tokenSet.access_token
        await session.save()

        // Update Redis with the new session data
        const newRedisSessionData = {
          access_token: tokenSet.access_token,
          refresh_token: tokenSet.refresh_token,
        } as RedisSession
        await redis.set(redisKey, JSON.stringify(newRedisSessionData))
        await redis.quit()

        console.log('Token refreshed successfully')
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError)
        // Don't throw here, just log the error and continue with the current session
        // The user will be redirected to login if the token is invalid
      }
    }
    return session
  } catch (error) {
    console.error('Error getting session:', error)

    // Return the default session in case of an error
    session.isLoggedIn = defaultSession.isLoggedIn
    session.access_token = defaultSession.access_token
    session.userInfo = defaultSession.userInfo
    await session.save()
    return session
  }
}
