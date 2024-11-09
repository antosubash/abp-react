import { ProfileDto, profileGet } from '@/client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch the user's profile data.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the profile data
 * asynchronously. The query key used is `QueryNames.GetProfile` and the query function
 * is `profileGet`.
 *
 * @returns {UseQueryResult<ProfileDto, unknown>} The result of the query, which includes
 * the profile data and query status.
 */
export const useProfile = (): UseQueryResult<ProfileDto, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetProfile],
    queryFn: async () => {
      const data = await profileGet()
      return data
    },
  })
}
