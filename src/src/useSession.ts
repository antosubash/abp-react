import {useQuery, UseQueryResult} from '@tanstack/react-query'
import { QueryNames } from './lib/hooks/QueryConstants'
import { SessionData } from './lib/session-utils'

/**
 * Custom hook to get the session from the `/session` endpoint.
 * The session can only be modified on the server, so this hook is used in all client components to get the session.
 *
 * This hook uses `useQuery` with `refetchOnWindowFocus` to ensure the client session is updated with the server session.
 *
 * @returns {UseQueryResult<SessionData, Error>} - The result of the query containing the session data.
 */

export default function useSession(): UseQueryResult<SessionData, Error> {
  return useQuery({
    queryKey: [QueryNames.GetSession],
    queryFn: async () => {
      const response = await fetch('/session')
      return (await response.json()) as SessionData
    },
    refetchOnWindowFocus: true
  })
}
