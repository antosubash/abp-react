import { ListResultDtoOfMenuItemDto, menuItemAdminGet, menuItemAdminGetList } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from './QueryConstants'

/**
 * Hook to fetch menu items with pagination and filtering.
 *
 * @param {number} pageIndex - The current page index.
 * @param {number} pageSize - The number of items per page.
 * @param {string} filter - Optional filter string for searching menu items.
 * @param {string} sorting - Optional sorting string.
 * @returns {Object} - Query result with menu items data.
 */
export const useMenuItems = (
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
    queryKey: [QueryNames.GetMenuItems, pageIndex, pageSize, filter, sorting],
    queryFn: async () => {
      try {
        const response = await menuItemAdminGetList()

        // Ensure we return a valid structure even if the API returns undefined
        const data = (response.data as ListResultDtoOfMenuItemDto) || { items: [], totalCount: 0 }
        return {
          items: data.items || [],
          totalCount: data.items?.length || 0,
        }
      } catch (error) {
        console.error('Error fetching menu items:', error)
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
 * Hook to fetch a single menu item by ID.
 *
 * @param {string} id - The menu item ID.
 * @returns {Object} - Query result with menu item data.
 */
export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: [QueryNames.GetMenuItem, id],
    queryFn: async () => {
      const response = await menuItemAdminGet({
        path: { id },
      })

      // Ensure we return a valid value
      if (!response.data) {
        throw new Error('Menu item not found')
      }

      return response.data
    },
    enabled: !!id,
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 (menu item not found)
      if (error instanceof Error && error.message === 'Menu item not found') {
        return false
      }
      // Retry up to 2 times for other errors
      return failureCount < 2
    },
  })
}
