import { userGetAssignableRoles } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch assignable roles using a query.
 *
 * This hook uses the `useQuery` hook from the `react-query` library to fetch
 * the assignable roles. The query key used is `QueryNames.GetAssignableRoles`.
 *
 * @returns {object} The result of the `useQuery` hook, which includes the data,
 * status, and other properties related to the query.
 */
export const useAssignableRoles = () => {
  return useQuery({
    queryKey: [QueryNames.GetAssignableRoles],
    queryFn: async () => {
      const data = await userGetAssignableRoles()
      return data
    },
  })
}
