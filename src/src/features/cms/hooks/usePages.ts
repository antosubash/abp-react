import {
  pageAdminGet,
  pageAdminGetList,
  PagedResultDtoOfVoloCmsKitAdminPagesPageDto,
  pagesPublicFindBySlug,
} from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from '@/shared/hooks/QueryConstants'

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
        const data = (response.data as PagedResultDtoOfVoloCmsKitAdminPagesPageDto) || {
          items: [],
          totalCount: 0,
        }
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

      // Ensure we return a valid value
      if (!response.data) {
        throw new Error('Page not found')
      }

      return response.data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 (page not found)
      if (error instanceof Error && error.message === 'Page not found') {
        return false
      }
      // Retry up to 2 times for other errors
      return failureCount < 2
    },
  })
}

/**
 * Hook to fetch a single page by slug using the public API.
 *
 * @param {string} slug - The page slug.
 * @returns {Object} - Query result with page data.
 */
export const usePageBySlug = (slug: string) => {
  return useQuery({
    queryKey: [QueryNames.GetPages, 'by-slug', slug],
    queryFn: async () => {
      const response = await pagesPublicFindBySlug({
        query: { slug },
      })

      // Ensure we return a valid value
      if (!response.data) {
        throw new Error('Page not found')
      }

      return response.data
    },
    enabled: !!slug,
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 (page not found)
      if (error instanceof Error && error.message === 'Page not found') {
        return false
      }
      // Retry up to 2 times for other errors
      return failureCount < 2
    },
  })
}
