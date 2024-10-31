import { clientConfig } from '@/config'
import { getSession } from '@/lib/actions'
import { RedisSession, createRedisInstance } from '@/lib/redis'
import {defaultSession, getClientConfig} from '@/lib/session-utils'
import * as client from 'openid-client'
export async function GET() {
  const session = await getSession()
  const redis = createRedisInstance()
  const redisKey = `session:${session.userInfo?.sub}`
  const redisSessionData = await redis.get(redisKey);
  const parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
  const openIdClientConfig = await getClientConfig()
  const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
    post_logout_redirect_uri: clientConfig.post_logout_redirect_uri,
    id_token_hint: parsedSessionData.access_token,
  })
  session.isLoggedIn = defaultSession.isLoggedIn
  session.access_token = defaultSession.access_token
  session.userInfo = defaultSession.userInfo
  await redis.del(session?.userInfo?.sub!)
  await session.save()
  return Response.redirect(endSessionUrl.href)
}
