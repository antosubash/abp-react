import { RedisSession, createRedisInstance } from '@/lib/redis'
import { SessionData, getClient } from '@/lib/session-utils'
import { sessionOptions } from '@/sessionOptions'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
export async function GET(request: NextRequest) {
  let session = await getIronSession<SessionData>(cookies(), sessionOptions)
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
  redirect('/')
}
