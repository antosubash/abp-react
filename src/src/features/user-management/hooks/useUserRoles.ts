import { userGetRoles, userFindByUsername } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from '@/shared/hooks/QueryConstants'

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
      // Don't make the API call if userId is empty
      if (!userId) {
        return { items: [] }
      }

      // Check if userId looks like a GUID (user ID) or username
      const isGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)
      
      let actualUserId = userId

      // If it's not a GUID, assume it's a username and get the user ID first
      if (!isGuid) {
        try {
          const userResponse = await userFindByUsername({
            path: {
              userName: userId,
            },
          })
          
          if (userResponse.data?.id) {
            actualUserId = userResponse.data.id
          } else {
            throw new Error('User not found')
          }
        } catch (error) {
          console.error('Error finding user by username:', error)
          throw new Error('User not found')
        }
      }

      const { data } = await userGetRoles({
        path: {
          id: actualUserId,
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
