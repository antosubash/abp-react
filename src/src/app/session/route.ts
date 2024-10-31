import { getSession } from '@/lib/actions'
import { defaultSession } from '@/lib/session-utils'

/**
 * GET handler for the session route.
 * This function retrieves the current session and returns it as a JSON response.
 * If no session is found, it returns the default session.
 * In case of an error, it returns a JSON response with the error and a 500 status code.
 *
 * @returns {Promise<Response>} - The response object containing the session data or an error.
 */
export async function GET(): Promise<Response> {
  try {
    const session = await getSession()
    if (!session) {
      // Return the default session if no session is found
      return Response.json({ defaultSession })
    }
    // Return the session data if a session is found
    return Response.json({
      isLoggedIn: session.isLoggedIn,
      userInfo: session.userInfo,
    })
  } catch (e) {
    // Return an error response with a 500 status code in case of an exception
    return Response.json({ error: e }, { status: 500 })
  }
}
