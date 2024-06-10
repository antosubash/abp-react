import { jwtDecode } from "jwt-decode";
import { RedisSession } from "./redis";
import { SessionData } from "@/lib";
import { BaseClient } from "openid-client";
import Redis from "ioredis";
import { IronSession } from "iron-session";

export const isTokenExpired = (token: string) => {
    var decoded = jwtDecode(token!);
    var expirationTime = decoded?.exp! * 1000;
    var currentTime = new Date().getTime();
    return expirationTime < currentTime;
}


export const refreshToken = async (session: IronSession<SessionData>, client: BaseClient, redis: Redis) => {
    try {
        console.log('Token expired. Refreshing token...');
        var redisSessionData = await redis.get(session?.userInfo?.sub!);
        var parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
        var tokenSet = await client.refresh(parsedSessionData.refresh_token!);
        session.access_token = tokenSet.access_token;
        await session.save();
        var newRedisSessionData = {
            access_token: tokenSet.access_token,
            refresh_token: tokenSet.refresh_token,
        } as RedisSession;
        const sessionKey = `session:${session.userInfo?.sub}`;
        await redis.set(sessionKey, JSON.stringify(newRedisSessionData));
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