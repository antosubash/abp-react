import { SessionOptions } from 'iron-session'

/**
 * Configuration options for the session.
 *
 * @type {SessionOptions}
 */
export const sessionOptions: SessionOptions = {
  // TODO: make sure to update the session password to something secure.
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',

  // TODO: make sure to rename this based on your project name
  cookieName: 'abp-react-session-id',

  cookieOptions: {
    // `secure` only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
  },

  // TODO: update the duration of the cookie based on your needs.
  ttl: 60 * 60 * 24 * 7, // 1 week
}