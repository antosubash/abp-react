import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'
import { pageAdminGetList, pageAdminGet, PagedResultDtoOfVoloCmsKitAdminPagesPageDto } from '@/client'

/**
 * Hook to fetch pages with pagination and filtering.
 * 
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} filter - Optional filter string for searching pages.
 * @param {string} sorting - Optional sorting string.
 * @returns {Object} - Query result with pages data.
 */
export const usePages = (
  pageIndex: number,
  pageSize: number,
  filter?: string,
  sorting?: string
) => {
  let skip = 0
  if (pageIndex > 0) {
    skip = pageIndex * pageSize
  }

  return useQuery({
    queryKey: [QueryNames.GetPages, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      try {
        const response = await pageAdminGetList({
          query: {
            SkipCount: skip,
            MaxResultCount: pageSize,
            Filter: filter,
            Sorting: sorting,
          },
        })
        
        // Ensure we return a valid structure even if the API returns undefined
        const data = response.data as PagedResultDtoOfVoloCmsKitAdminPagesPageDto || { items: [], totalCount: 0 }
        return {
          items: data.items || [],
          totalCount: data.totalCount || 0,
        }
      } catch (error) {
        console.error('Error fetching pages:', error)
        // Return empty result on error
        return {
          items: [],
          totalCount: 0,
        }
      }
    },
  })
}

/**
 * Hook to fetch a single page by ID.
 * 
 * @param {string} id - The page ID.
 * @returns {Object} - Query result with page data.
 */
export const usePage = (id: string) => {
  return useQuery({
    queryKey: [QueryNames.GetPage, id],
    queryFn: async () => {
      const response = await pageAdminGet({
        path: { id },
      })
      return response.data
    },
    enabled: !!id,
  })
} 