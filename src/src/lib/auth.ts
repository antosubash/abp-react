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

export const refreshToken = async () => {
    try {
        console.log('Token expired. Refreshing token...');
        var response = await fetch('/auth/refresh-token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        var newToken = await response.json();
        return {
            access_token: newToken.access_token,
            refresh_token: newToken.refresh_token
        };
    }
    catch (e) {
        console.error('Error refreshing token:', e);
    }
}