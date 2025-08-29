import { useQuery } from '@tanstack/react-query'
import { commentAdminGetList } from '@/client'
import { QueryNames } from './QueryConstants'

/**
 * Custom hook to fetch a list of comments.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch the comment data
 * asynchronously. The query key used is `QueryNames.GetComments` along with pagination,
 * filter, and sorting parameters.
 *
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} [filter] - Optional filter string.
 * @param {string} [sorting] - Optional sorting string.
 * @returns {UseQueryResult} The result of the query, which includes the comment data and query status.
 */
export const useComments = (
  pageIndex: number,
  pageSize: number,
  filter?: string | undefined,
  sorting?: string | undefined
) => {
  return useQuery({
    queryKey: [QueryNames.GetComments, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      let skip = 0
      if (pageIndex > 0) {
        skip = pageIndex * pageSize
      }
      const response = await commentAdminGetList({
        query: {
          MaxResultCount: pageSize,
          SkipCount: skip,
          Text: filter,
          Sorting: sorting,
        },
      })
      return response.data
    },
  })
}
