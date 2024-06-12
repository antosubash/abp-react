import { SessionOptions } from "iron-session";


export const sessionOptions: SessionOptions = {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "next_js_session",
    cookieOptions: {
        // secure only works in `https` environments
        // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: process.env.NODE_ENV === "production",
    },
    ttl: 60 * 60 * 24 * 7 // 1 week
};
