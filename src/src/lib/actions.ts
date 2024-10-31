'use server'
import { sessionOptions } from '@/sessionOptions'
import {getIronSession, IronSession} from 'iron-session'
import { cookies } from 'next/headers'
import { isTokenExpired } from './auth'
import { RedisSession, createRedisInstance } from './redis'
import {SessionData, defaultSession, getClientConfig} from './session-utils'
import * as client from 'openid-client'

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
  let session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  try {
    // Check if the access token is expired
    if (session.access_token && isTokenExpired(session.access_token!)) {
      const redisKey = `session:${session?.userInfo?.sub!}`
      const redis = createRedisInstance()
      const clientConfig = await getClientConfig()

      // Retrieve session data from Redis
      let redisSessionData = await redis.get(redisKey)
      const parsedSessionData = JSON.parse(redisSessionData!) as RedisSession

      // Refresh the access token using the refresh token
      const tokenSet = await client.refreshTokenGrant(clientConfig, parsedSessionData.refresh_token!)
      session.access_token = tokenSet.access_token
      await session.save()

      // Update Redis with the new session data
      const newRedisSessionData = {
        access_token: tokenSet.access_token,
        refresh_token: tokenSet.refresh_token,
      } as RedisSession
      await redis.set(redisKey, JSON.stringify(newRedisSessionData))
      await redis.quit()
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
