import { tenantGetList } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch a list of tenants.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the tenant data
 * asynchronously. The query key used is `QueryNames.GetTenants` along with pagination,
 * filter, and sorting parameters.
 *
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [filter] - Optional filter string.
 * @param {string} [sorting] - Optional sorting string.
 * @returns {UseQueryResult} The result of the query, which includes the tenant data and query status.
 */
export const useTenants = (
  pageIndex: number,
  pageSize: number,
  filter?: string | undefined,
  sorting?: string | undefined
) => {
  return useQuery({
    queryKey: [QueryNames.GetTenants, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      let skip = 0
      if (pageIndex > 0) {
        skip = pageIndex * pageSize
      }
      const data = await tenantGetList({
        maxResultCount: pageSize,
        skipCount: skip,
        filter: filter,
        sorting: sorting,
      })
      return data
    },
  })
}
