import { commentPublicGetList } from '@/client'
import { useQuery } from '@tanstack/react-query'
import { QueryNames } from '@/shared/hooks/QueryConstants'

/**
 * Custom hook to fetch public comments for a specific entity.
 *
 * This hook uses the `useQuery` hook from `react-query` to fetch comment data
 * for a specific entity type and entity ID using the public API.
 *
 * @param {string} entityType - The type of entity (e.g., "Page", "BlogPost")
 * @param {string} entityId - The ID of the entity
 * @returns {UseQueryResult} The result of the query, which includes the comment data and query status.
 */
export const usePublicComments = (entityType: string, entityId: string) => {
  return useQuery({
    queryKey: [QueryNames.GetPublicComments, entityType, entityId],
    queryFn: async () => {
      const response = await commentPublicGetList({
        path: { entityType, entityId },
      })
      return response.data
    },
    enabled: !!entityType && !!entityId,
  })
}
