'use server'
import { sessionOptions } from '@/sessionOptions'
import { cookies } from 'next/headers'
import { SessionData, defaultSession, getClient } from './session-utils'
import { getIronSession } from 'iron-session'
import { isTokenExpired } from './auth'
import { RedisSession, createRedisInstance } from './redis'

export async function getSession() {
  let session = await getIronSession<SessionData>(cookies(), sessionOptions)
  try {
    if (session.access_token && isTokenExpired(session.access_token!)) {
      const redisKey = `session:${session?.userInfo?.sub!}`
      const redis = createRedisInstance()
      const client = await getClient()
      var redisSessionData = await redis.get(redisKey)
      var parsedSessionData = JSON.parse(redisSessionData!) as RedisSession
      var tokenSet = await client.refresh(parsedSessionData.refresh_token!)
      console.log('Token refreshed. New token:', tokenSet.access_token)
      session.access_token = tokenSet.access_token
      await session.save()
      var newRedisSessionData = {
        access_token: tokenSet.access_token,
        refresh_token: tokenSet.refresh_token,
      } as RedisSession
      await redis.set(redisKey, JSON.stringify(newRedisSessionData))
      await redis.quit()
    }
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    session.isLoggedIn = defaultSession.isLoggedIn
    session.access_token = defaultSession.access_token
    session.userInfo = defaultSession.userInfo
    await session.save()
    return session
  }
}
