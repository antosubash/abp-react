import { roleGetList } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch a list of roles.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the role data
 * asynchronously. The query key used is `QueryNames.GetRoles` along with pagination,
 * filter, and sorting parameters.
 *
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [filter] - Optional filter string.
 * @param {string} [sorting] - Optional sorting string.
 * @returns {UseQueryResult} The result of the query, which includes the role data and query status.
 */
export const useRoles = (
  pageIndex: number,
  pageSize: number,
  filter?: string | undefined,
  sorting?: string | undefined
) => {
  return useQuery({
    queryKey: [QueryNames.GetRoles, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      let skip = 0
      if (pageIndex > 0) {
        skip = pageIndex * pageSize
      }
      const data = await roleGetList({
        maxResultCount: pageSize,
        skipCount: skip,
        filter: filter,
        sorting: sorting,
      })
      return data
    },
  })
}
