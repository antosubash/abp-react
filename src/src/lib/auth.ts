import { jwtDecode } from "jwt-decode";
import { RedisSession } from "./redis";
import { BaseClient } from "openid-client";
import Redis from "ioredis";
import { IronSession } from "iron-session";
import { SessionData } from "./session-utils";

export const isTokenExpired = (token: string) => {
    var decoded = jwtDecode(token!);
    var expirationTime = decoded?.exp! * 1000;
    var currentTime = new Date().getTime();
    return expirationTime < currentTime;
}

export const refreshToken = async (session: IronSession<SessionData>, client: BaseClient, redis: Redis) => {
    try {
        console.log('Token expired. Refreshing token...');
        const redisKey = `session:${session?.userInfo?.sub!}`;
        var redisSessionData = await redis.get(redisKey);
        var parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
        var tokenSet = await client.refresh(parsedSessionData.refresh_token!);
        session.access_token = tokenSet.access_token;
        await session.save();
        var newRedisSessionData = {
            access_token: tokenSet.access_token,
            refresh_token: tokenSet.refresh_token,
        } as RedisSession;
        await redis.set(redisKey, JSON.stringify(newRedisSessionData));
        await redis.quit();
        return tokenSet.access_token;
    }
    catch (e) {
        console.error('Error refreshing token:', e);
        session.isLoggedIn = false;
        session.access_token = undefined;
        session.userInfo = undefined;
        await session.save();
    }
}