import { userGetRoles } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

type UseUserRolesProps = {
  userId: string
}

/**
 * Custom hook to fetch the roles of a specific user.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the user roles
 * asynchronously. The query key used is `QueryNames.GetUserRoles` along with the user ID.
 *
 * @param {UseUserRolesProps} props - The properties object containing the user ID.
 * @returns {UseQueryResult} The result of the query, which includes the user roles data and query status.
 */
export const useUserRoles = ({ userId }: UseUserRolesProps) => {
  return useQuery({
    queryKey: [QueryNames.GetUserRoles, userId],
    queryFn: async () => {
      const { data } = await userGetRoles({
        path: {
          id: userId,
        },
      })

      // Ensure we return a valid value
      if (!data) {
        throw new Error('User roles not found')
      }

      return data
    },
    enabled: !!userId,
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 (user roles not found)
      if (error instanceof Error && error.message === 'User roles not found') {
        return false
      }
      // Retry up to 2 times for other errors
      return failureCount < 2
    },
  })
}
