import { userFindByUsername } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

type UseUserExistsProps = {
  username: string
}

/**
 * Custom hook to check if a user exists by username.
 *
 * This hook uses the `useQuery` hook from `react-query` to check if a user exists
 * by making a call to the userFindByUsername API endpoint.
 *
 * @param {UseUserExistsProps} props - The properties object containing the username.
 * @returns {UseQueryResult} The result of the query, which includes whether the user exists and user data.
 */
export const useUserExists = ({ username }: UseUserExistsProps) => {
  return useQuery({
    queryKey: [QueryNames.GetUserByUsername, username],
    queryFn: async () => {
      if (!username) {
        return null
      }

      try {
        const { data } = await userFindByUsername({
          path: {
            userName: username,
          },
        })
        return data
      } catch (error) {
        console.error('Error checking if user exists:', error)
        return null
      }
    },
    enabled: !!username,
    retry: false, // Don't retry if user doesn't exist
  })
} 