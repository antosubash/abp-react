import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { sessionOptions } from '@/sessionOptions'
import { SessionData, getClient } from '@/lib/session-utils'
import { getIronSession } from 'iron-session'
import { RedisSession, createRedisInstance } from '@/lib/redis'
import { NextApiRequest } from 'next'
export async function GET(request: NextApiRequest) {
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
  const returnUrl = request.query.returnUrl as string
  redirect(returnUrl)
}
