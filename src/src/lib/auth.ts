import { sessionOptions } from '@/sessionOptions'
import { getIronSession } from 'iron-session'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { RedisSession, createRedisInstance } from './redis'
import {SessionData, getClientConfig} from './session-utils'
import * as client from 'openid-client'
import {OpenAPI} from "@/client";
import {getSession} from "@/lib/actions";
export const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token!);
  const expirationTime = decoded?.exp! * 1000;
  const currentTime = new Date().getTime();
  return expirationTime < currentTime
}

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
