import { useQuery } from '@tanstack/react-query'
import { userGetList } from '@/client'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch a list of users.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the user data
 * asynchronously. The query key used is `QueryNames.GetUsers` along with pagination,
 * filter, and sorting parameters.
 *
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [filter] - Optional filter string.
 * @param {string} [sorting] - Optional sorting string.
 * @returns {UseQueryResult} The result of the query, which includes the user data and query status.
 */
export const useUsers = (
  pageIndex: number,
  pageSize: number,
  filter?: string | undefined,
  sorting?: string | undefined
) => {
  return useQuery({
    queryKey: [QueryNames.GetUsers, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      let skip = 0
      if (pageIndex > 0) {
        skip = pageIndex * pageSize
      }
      const response = await userGetList({
        query: {
          MaxResultCount: pageSize,
          SkipCount: skip,
          Filter: filter,
          Sorting: sorting,
        },
      })
      return response.data
    },
  })
}
