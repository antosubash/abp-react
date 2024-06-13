import { jwtDecode } from "jwt-decode";
import { RedisSession, createRedisInstance } from "./redis";
import { SessionData, getClient } from "./session-utils";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/sessionOptions";

export const isTokenExpired = (token: string) => {
    var decoded = jwtDecode(token!);
    var expirationTime = decoded?.exp! * 1000;
    var currentTime = new Date().getTime();
    return expirationTime < currentTime;
}

export const refreshToken = async () => {
    "use server"
    try {
        console.log('Token expired. Refreshing token...');
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);;
        const redisKey = `session:${session?.userInfo?.sub!}`;
        const redis = createRedisInstance();
        const client = await getClient();
        var redisSessionData = await redis.get(redisKey);
        var parsedSessionData = JSON.parse(redisSessionData!) as RedisSession;
        var tokenSet = await client.refresh(parsedSessionData.refresh_token!);
        console.log('Token refreshed. New token:', tokenSet.access_token);
        session.access_token = tokenSet.access_token;
        await session.save();
        var newRedisSessionData = {
            access_token: tokenSet.access_token,
            refresh_token: tokenSet.refresh_token,
        } as RedisSession;
        await redis.set(redisKey, JSON.stringify(newRedisSessionData));
        await redis.quit();
        console.log('Token refreshed successfully.');
    }
    catch (e) {
        console.error('Error refreshing token:', e);
    }
}