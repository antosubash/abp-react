import { ProfileDto, profileGet } from '@/client'
import { QueryNames } from '@/shared/hooks/QueryConstants'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

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
export const useProfile = (): UseQueryResult<ProfileDto | undefined, unknown> => {
  return useQuery({
    queryKey: [QueryNames.GetProfile],
    queryFn: async () => {
      const { data } = await profileGet()

      // Ensure we return a valid value
      if (!data) {
        throw new Error('Profile not found')
      }

      return data
    },
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 (profile not found)
      if (error instanceof Error && error.message === 'Profile not found') {
        return false
      }
      // Retry up to 2 times for other errors
      return failureCount < 2
    },
  })
}
